import type { Event } from '@/types';
import { logger } from '@/utils/logger';

export default {
  name: 'ready',
  once: true,
  run(client) {
    logger.success(`Logged in as ${client.user?.tag}`);
  },
} as Event<'ready'>;
