import { ChatInputCommandInteraction, GuildTextBasedChannel, MessageFlags } from 'discord.js';
import { parseDuration } from '@/utils/parseDuration';
import { makeDefaultEmbed } from '@/utils/makeEmbed';
import { colorsDecimal } from '@/constants';
import { discordTimestampIn } from '@/utils/discordTimestamp';
import { emptyReasonSymbol, isNotEmptyReasonSymbol } from '@/commands/mod/handlers';

export async function timeoutHandler(i: ChatInputCommandInteraction) {
  await i.deferReply({ flags: MessageFlags.Ephemeral });

  const user = i.options.getUser('user', true);
  const durStr = i.options.getString('duration', true);
  const reason = i.options.getString('reason') ?? emptyReasonSymbol;
  const channel = i.channel as GuildTextBasedChannel;

  const ms = parseDuration(durStr);
  const until = discordTimestampIn(ms, 'f');
  const member = await i.guild!.members.fetch(user.id);

  if (member.voice?.channel) {
    await member.voice.setChannel(null).catch(() => null);
  }

  const dm = makeDefaultEmbed(colorsDecimal.Info, {
    title: `⏳ Таймаут на сервері **${i.guild!.name}**`,
    description: `Вам видано таймаут **до ${until}**.`,
    fields: [
      {
        name: 'Причина:',
        value: reason,
        inline: true,
      },
      {
        name: 'Модератор:',
        value: `${i.user}`,
        inline: true,
      },
    ],
  });
  await user.send({ embeds: [dm] }).catch(() => null);

  await member.timeout(ms, reason);

  const embed = makeDefaultEmbed(colorsDecimal.Info, {
    title: '⏳ Таймаут застосовано',
    description: `${user} отримав таймаут **до ${until}**.`,
    author: i.user,
  });

  if (isNotEmptyReasonSymbol(reason))
    embed.addFields({
      name: 'Причина:',
      value: reason,
      inline: false,
    });

  await channel.send({ embeds: [embed] });
  await i.deleteReply().catch(() => null);
}
