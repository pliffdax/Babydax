import { colorsDecimal } from '@/constants/colors';
import { messages } from '@/constants/messages/messages';
import { makeUserDynamicEmbed, makeUserGuildEmbed, makeUserStaticEmbed } from '@/utils/makeEmbed';
import { GuildMember } from 'discord.js';

export const embeds = {
  success: makeUserDynamicEmbed(colorsDecimal.Success),
  warning: makeUserDynamicEmbed(colorsDecimal.Warning),
  error: makeUserDynamicEmbed(colorsDecimal.Error),
  info: makeUserDynamicEmbed(colorsDecimal.Info),
  joined: (member: GuildMember) =>
    makeUserGuildEmbed(
      member,
      colorsDecimal.Success,
      '🍻 Учасник приєднався до серверу!',
    ),
  left: (member: GuildMember) =>
    makeUserGuildEmbed(
      member,
      colorsDecimal.Error,
      '🌧️ Учасник вирішив залишити сервер...',
    ),
    devOnly: makeUserStaticEmbed(colorsDecimal.Warning, messages.DevOnly),
} as const;
