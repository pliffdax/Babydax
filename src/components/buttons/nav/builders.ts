import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export const buildNavRow = (disableBack = false, disableConfirm = true) =>
  new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('backStep')
      .setEmoji('⏪')
      .setStyle(ButtonStyle.Primary)
      .setDisabled(disableBack),
    new ButtonBuilder()
      .setCustomId('confirmOrderDraft')
      .setEmoji('✅')
      .setStyle(ButtonStyle.Success)
      .setDisabled(disableConfirm),
    new ButtonBuilder()
      .setCustomId('cancelOrderDraft')
      .setEmoji('🚫')
      .setStyle(ButtonStyle.Danger),
  );
