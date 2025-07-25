import fg from 'fast-glob';
import path from 'node:path';
import { Client } from 'discord.js';
import { Event } from '@/types';
import { EVENT_GLOB as GLOB } from '@/config';

export async function loadEvents(client: Client) {
  const files = await fg(GLOB, { absolute: true });

  for (const file of files) {
    const mod = (await import(path.toNamespacedPath(file))).default as Event;
    if (!mod?.name || !mod?.run) continue;

    const handler = (...args: any[]): void => {
      void mod.run(...args as Parameters<typeof mod.run>);
    };

    (mod.once ? client.once : client.on).call(
      client,
      mod.name as string,
      handler,
    );
  }
}
