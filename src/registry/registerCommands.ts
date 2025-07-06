import { REST, Routes } from 'discord.js';
import fg from 'fast-glob';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { logger } from '@/utils/logger';
import { Command } from '@/types';
import { TOKEN, CLIENT_ID, TEST_GUILD_ID } from '@/config';

const SNAP = '.commands-snapshot.json';

export async function registerCommands() {
  if (!TOKEN || !CLIENT_ID) {
    logger.error('TOKEN / CLIENT_ID are missing in .env');
    process.exit(1);
  }
  const rest = new REST({ version: '10' }).setToken(TOKEN);

  const files = await fg('src/commands/**/*.{ts,js}', { absolute: true });
  const all: Command[] = [];

  for (const f of files) {
    const mod = await import(path.toNamespacedPath(f));
    const cmd: Command | undefined = mod.default ?? mod.command;
    if (cmd?.data) all.push(cmd);
  }

  const guildOnly = all.filter(c => c.test);
  const globalOnly = all.filter(c => !c.test);

  const hash = (obj: object) => createHash('sha256').update(JSON.stringify(obj)).digest('hex');

  const bodyGuild = guildOnly.map(c => ('toJSON' in c.data ? c.data.toJSON() : c.data));
  const bodyGlobal = globalOnly.map(c => ('toJSON' in c.data ? c.data.toJSON() : c.data));

  let prev: { guild?: string; global?: string } = {};
  try {
    prev = JSON.parse(await fs.readFile(SNAP, 'utf8'));
  } catch {}

  const hashGuild = hash(bodyGuild);
  const hashGlobal = hash(bodyGlobal);

  if (hashGuild === prev.guild && hashGlobal === prev.global) {
    logger.success('Slash-command cache up-to-date – nothing to upload');
    return;
  }

  if (TEST_GUILD_ID) {
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, TEST_GUILD_ID), { body: bodyGuild });
    logger.success(`Guild commands updated for ${TEST_GUILD_ID}`);
  }

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: bodyGlobal });
  logger.success('Global slash-commands updated');

  await fs.writeFile(SNAP, JSON.stringify({ guild: hashGuild, global: hashGlobal }));
}
