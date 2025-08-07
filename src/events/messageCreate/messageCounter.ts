import type { Event } from '@/types';
import { logger } from '@/utils/logger';
import { Events, Message } from 'discord.js';
import { xpService } from '@/services';
import { isChannelXpEnabled } from '@/utils/xpFilters';

export default {
  name: Events.MessageCreate,
  inactive: true,
  async run(message: Message) {
    try {
      if (!message.guild || message.author.bot) return;

      if (!(await isChannelXpEnabled(message.channelId, message.guild.id))) return;

      await xpService.addMessageXp({
        guildId: message.guild.id,
        userId: message.author.id,
        channelId: message.channelId,
      });
    } catch (err) {
      logger.error(`messageCounter: ${(err as Error).message}`);
    }
  },
} as Event<Events.MessageCreate>;
