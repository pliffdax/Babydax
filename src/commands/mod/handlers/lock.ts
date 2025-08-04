import { ChatInputCommandInteraction, ChannelType, TextChannel, MessageFlags } from 'discord.js';
import { makeDefaultEmbed } from '@/utils/makeEmbed';
import { colorsDecimal } from '@/constants';
import { emptyReasonSymbol, isNotEmptyReasonSymbol } from '@/commands/mod/handlers';

export async function lockHandler(i: ChatInputCommandInteraction) {
  await i.deferReply({ flags: MessageFlags.Ephemeral });

  const ch = (i.options.getChannel('channel', false) ?? i.channel)!;
  const reason = i.options.getString('reason') ?? emptyReasonSymbol;

  if (ch.type !== ChannelType.GuildText) throw new Error('You can lock only text channels');

  const channel = ch as TextChannel;

  await channel.permissionOverwrites.edit(
    i.guild!.roles.everyone,
    { SendMessages: false },
    { reason },
  );

  const embed = makeDefaultEmbed(colorsDecimal.Info, {
    title: '🔒 Канал заблоковано',
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
