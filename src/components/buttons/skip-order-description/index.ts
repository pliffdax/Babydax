import { ButtonBuilder, ButtonInteraction, ButtonStyle } from 'discord.js';
import { draftService } from '@/services';
import { rebuildCurrentStepUI } from '@/ui/orderForm';
import { DraftStage } from '@/types';

export default {
  id: 'skipOrderDescription',
  data: new ButtonBuilder()
    .setCustomId('skipOrderDescription')
    .setLabel('Пропустити опис')
    .setEmoji('⏭')
    .setStyle(ButtonStyle.Secondary),
  async run(i: ButtonInteraction) {
    const draft = draftService.getByUser(i.user.id);
    if (!draft) return;

    draftService.update(draft.id, d => {
      d.stage = DraftStage.Confirm;
    });

    await rebuildCurrentStepUI(i, draft);
  },
};
