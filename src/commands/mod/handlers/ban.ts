import { ChatInputCommandInteraction, GuildTextBasedChannel, MessageFlags } from 'discord.js';
import { makeDefaultEmbed } from '@/utils/makeEmbed';
import { colorsDecimal } from '@/constants';
import { emptyReasonSymbol, isNotEmptyReasonSymbol } from '@/commands/mod/handlers';

export async function banHandler(i: ChatInputCommandInteraction) {
  await i.deferReply({ flags: MessageFlags.Ephemeral });

  const user = i.options.getUser('user', true);
  const reason = i.options.getString('reason') ?? emptyReasonSymbol;
  const channel = i.channel as GuildTextBasedChannel;

  const dm = makeDefaultEmbed(colorsDecimal.Info, {
    title: `🔨 Вас забанено на сервері **${i.guild!.name}**`,
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

  await i.guild!.members.ban(user.id, { reason });

  const embed = makeDefaultEmbed(colorsDecimal.Info, {
    title: '🔨 Бан застосовано.',
    description: `Користувача ${user} було заблоковано на сервері.`,
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
