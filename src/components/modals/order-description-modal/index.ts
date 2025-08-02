import {
  ModalSubmitInteraction,
  MessageFlags,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { draftService } from '@/services';
import { DraftStage } from '@/types';
import { renderStep } from '@/ui/orderForm';
import { embeds } from '@/constants';

export default {
  id: 'orderDescriptionModal',
  data: new ModalBuilder()
    .setCustomId('orderDescriptionModal')
    .setTitle('Деталі замовлення')
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId('orderDescription')
          .setLabel('Опишіть побажання, дедлайн…')
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(false),
      ),
    ),
  async run(i: ModalSubmitInteraction) {
    const draft = draftService.getByUser(i.user.id);
    if (!draft)
      return i.reply({
        embeds: [embeds.error(i.user, '⛔ Замовлення не знайдено.')],
        flags: MessageFlags.Ephemeral,
      });

    draftService.update(draft.id, d => {
      d.description = i.fields.getTextInputValue('orderDescription') || undefined;
      d.stage = DraftStage.Confirm;
    });

    const payload = await renderStep(draft);
    await draft.message?.edit(payload);

    await i.deferUpdate();
  },
};
