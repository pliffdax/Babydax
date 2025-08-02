import { StringSelectMenuInteraction, StringSelectMenuBuilder, MessageFlags } from 'discord.js';
import { Component } from '@/types';
import { draftService } from '@/services';
import { rebuildCurrentStepUI } from '@/ui/orderForm';
import { embeds } from '@/constants';

export default {
  id: 'selectSubject',

  async run(i: StringSelectMenuInteraction) {
    const userId = i.user.id;
    const draft = draftService.getByUser(userId);
    if (!draft)
      return i.reply({
        embeds: [embeds.error(i.user, '⛔ Замовлення не знайдено.')],
        flags: MessageFlags.Ephemeral,
      });

    const subjectId = i.values[0];
    draftService.update(draft.id, d => {
      d.subjectId = subjectId;
      d.stage++;
    });

    await rebuildCurrentStepUI(i, draft);
  },
} as Component<StringSelectMenuInteraction, StringSelectMenuBuilder>;
