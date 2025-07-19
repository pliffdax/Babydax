import { colorsDecimal } from '@/constants/colors';
import { makeEmbed } from '@/utils/makeEmbed';
import { makeGuildEmbed } from '@/utils/makeGuildEmbed';
import { GuildMember } from 'discord.js';

export const embeds = {
  success: makeEmbed(colorsDecimal.Success),
  warning: makeEmbed(colorsDecimal.Warning),
  error: makeEmbed(colorsDecimal.Error),
  joined: (member: GuildMember) =>
    makeGuildEmbed(
      member,
      colorsDecimal.Success,
      '☀️ Учасник приєднався до серверу!',
    ),
  left: (member: GuildMember) =>
    makeGuildEmbed(
      member,
      colorsDecimal.Error,
      '🌧️ Учасник залишив сервер...',
    ),
} as const;
