import type { Event } from '@/types';
import { logger } from '@/utils/logger';
import { Events, VoiceState } from 'discord.js';
import { xpService } from '@/services';

export default {
  name: Events.VoiceStateUpdate,
  inactive: true,
  async run(oldState: VoiceState, newState: VoiceState) {
    try {
      const member = newState.member ?? oldState.member;
      if (!member || member.user.bot) return;

      if (!oldState.channelId && newState.channelId) {
        await xpService.markVoiceJoin({
          guildId: newState.guild.id,
          userId: member.id,
        });
        return;
      }

      if (oldState.channelId && !newState.channelId) {
        await xpService.addVoiceXp({
          guildId: oldState.guild.id,
          userId: member.id,
        });
        return;
      }

      if (oldState.channelId && newState.channelId && oldState.channelId !== newState.channelId) {
        await xpService.addVoiceXp({
          guildId: oldState.guild.id,
          userId: member.id,
        });

        await xpService.markVoiceJoin({
          guildId: newState.guild.id,
          userId: member.id,
        });
      }
    } catch (err) {
      logger.error(`voiceHoursCounter: ${(err as Error).message}`);
    }
  },
} as Event<Events.VoiceStateUpdate>;
