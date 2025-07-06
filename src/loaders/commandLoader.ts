import fg from 'fast-glob';
import path from 'node:path';
import { Command } from '@/types';

export async function loadCommands() {
  const files = await fg('src/commands/**/*.{ts,js}', { absolute: true });
  const map = new Map<string, Command>();

  for (const f of files) {
    const mod = await import(path.toNamespacedPath(f));
    const cmd: Command | undefined = mod.default ?? mod.command;
    if (cmd?.data) {
      const name = 'toJSON' in cmd.data ? cmd.data.toJSON().name : (cmd.data as any).name;
      map.set(name, cmd);
    }
  }
  return map;
}
