import type { Event } from '@/types';
import { logger } from '@/utils/logger';
import { Events } from 'discord.js';

export default {
  name: Events.ClientReady,
  once: true,
  run(client) {
    logger.success(`Logged in as ${client.user?.tag}`);
  },
} as Event<Events.ClientReady>;
