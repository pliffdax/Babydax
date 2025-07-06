import type { ClientEvents } from 'discord.js';

export interface Event<K extends keyof ClientEvents = keyof ClientEvents> {
  name: K;
  run: (...args: ClientEvents[K]) => Promise<unknown> | unknown;
  once?: boolean;
}
