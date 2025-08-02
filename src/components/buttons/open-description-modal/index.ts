import { componentsPromise } from '@/components';
import { embeds } from '@/constants';
import { draftService } from '@/services';
import { DraftStage } from '@/types';
import {
  ButtonInteraction,
  ModalBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags,
} from 'discord.js';

export default {
  id: 'openDescriptionModal',
  data: new ButtonBuilder()
    .setCustomId('openDescriptionModal')
    .setLabel('Додати опис')
    .setEmoji('✏️')
    .setStyle(ButtonStyle.Primary),
  async run(i: ButtonInteraction) {
    const draft = draftService.getByUser(i.user.id);
    if (!draft || draft.stage < DraftStage.Description)
      return i.reply({
        embeds: [embeds.error(i.user, '⛔ Спочатку оберіть роботи.')],
        flags: MessageFlags.Ephemeral,
      });

    const { exactMap } = await componentsPromise;
    const modal = exactMap.get('orderDescriptionModal')!.data as ModalBuilder;
    await i.showModal(modal);
  },
};
