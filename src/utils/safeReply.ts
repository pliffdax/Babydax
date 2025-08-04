import {
  Interaction,
  EmbedBuilder,
  InteractionReplyOptions,
  InteractionEditReplyOptions,
  MessageFlags,
} from 'discord.js';

export async function safeReply(i: Interaction, embed: EmbedBuilder, ephemeral = true) {
  if (!i.isRepliable()) return;

  if (i.deferred) {
    const editPayload: InteractionEditReplyOptions = { embeds: [embed] };
    return i.editReply(editPayload).catch(() => null);
  }

  const replyPayload: InteractionReplyOptions = { embeds: [embed] };

  if (ephemeral) replyPayload.flags = MessageFlags.Ephemeral;

  if (i.replied) return i.followUp(replyPayload).catch(() => null);
  return i.reply(replyPayload).catch(() => null);
}
