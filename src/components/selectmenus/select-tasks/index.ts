import { MessageFlags, StringSelectMenuInteraction } from 'discord.js';
import { draftService } from '@/services';
import { rebuildCurrentStepUI } from '@/ui/orderForm';
import { embeds } from '@/constants';

export default {
  id: 'selectTasks',

  async run(i: StringSelectMenuInteraction) {
    const draft = draftService.getByUser(i.user.id);
    if (!draft)
      return i.reply({
        embeds: [embeds.error(i.user, '⛔ Замовлення не знайдено.')],
        flags: MessageFlags.Ephemeral,
      });

    draftService.update(draft.id, d => {
      d.taskIds = i.values;
      d.stage++;
    });

    await rebuildCurrentStepUI(i, draft);
  },
};
