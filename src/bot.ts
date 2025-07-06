import { Client, GatewayIntentBits } from 'discord.js';
import { logger } from '@/utils/logger';
import { registerCommands } from '@/registry/registerCommands';
import { loadEvents } from '@/loaders/eventLoader';
import { TOKEN } from '@/config';

async function main() {
  await registerCommands();

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  await loadEvents(client);
  await client.login(TOKEN);
}

main().catch(e => {
  logger.error(e instanceof Error ? e.message : String(e));
  process.exit(1);
});
