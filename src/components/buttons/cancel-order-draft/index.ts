import { ButtonInteraction } from 'discord.js';
import { draftService } from '@/services';

export default {
  id: 'cancelOrderDraft',
  async run(i: ButtonInteraction) {
    const draft = draftService.getByUser(i.user.id);
    if (draft) draftService.expire(draft.id, true);
  },
};
