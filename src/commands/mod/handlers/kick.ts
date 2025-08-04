import { ChatInputCommandInteraction, GuildTextBasedChannel, MessageFlags } from 'discord.js';
import { makeDefaultEmbed } from '@/utils/makeEmbed';
import { colorsDecimal } from '@/constants';
import { emptyReasonSymbol, isNotEmptyReasonSymbol } from '@/commands/mod/handlers';

export async function kickHandler(i: ChatInputCommandInteraction) {
  await i.deferReply({ flags: MessageFlags.Ephemeral });

  const user = i.options.getUser('user', true);
  const reason = i.options.getString('reason') ?? emptyReasonSymbol;
  const channel = i.channel as GuildTextBasedChannel;

  const dm = makeDefaultEmbed(colorsDecimal.Info, {
    title: `👟 Вас вигнали з сервера **${i.guild!.name}**`,
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

  const member = await i.guild!.members.fetch(user.id);
  await member.kick(reason);

  const embed = makeDefaultEmbed(colorsDecimal.Info, {
    title: `👟 Кік застосовано.`,
    description: `Користувача ${user} було вигнано з серверу.`,
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
