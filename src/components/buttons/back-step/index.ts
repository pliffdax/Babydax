import { ButtonInteraction, MessageFlags } from 'discord.js';
import { draftService } from '@/services';
import { rebuildCurrentStepUI } from '@/ui/orderForm';
import { DraftStage } from '@/types';
import { embeds } from '@/constants';

export default {
  id: 'backStep',
  async run(i: ButtonInteraction) {
    const draft = draftService.getByUser(i.user.id);
    if (!draft)
      return i.reply({
        embeds: [embeds.error(i.user, '⛔ Замовлення не знайдено.')],
        flags: MessageFlags.Ephemeral,
      });

    if (draft.stage === DraftStage.Semester) return;
    draftService.update(draft.id, d => d.stage--);

    await rebuildCurrentStepUI(i, draft);
  },
};
