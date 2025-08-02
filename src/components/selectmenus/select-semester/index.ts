import { StringSelectMenuInteraction, StringSelectMenuBuilder, MessageFlags } from 'discord.js';
import { Component } from '@/types';
import { draftService } from '@/services';
import { rebuildCurrentStepUI } from '@/ui/orderForm';
import { embeds } from '@/constants';

const semesters = [
  { label: '1 семестр', value: '1', emoji: '1️⃣' },
  { label: '2 семестр', value: '2', emoji: '2️⃣' },
  { label: '3 семестр', value: '3', emoji: '3️⃣' },
  { label: '4 семестр', value: '4', emoji: '4️⃣' },
  { label: '5 семестр', value: '5', emoji: '5️⃣' },
];

export default {
  id: 'selectSemester',
  data: new StringSelectMenuBuilder()
    .setPlaceholder('Оберіть семестр')
    .setCustomId('selectSemester')
    .addOptions(semesters)
    .setMinValues(1)
    .setMaxValues(1),
  async run(i: StringSelectMenuInteraction) {
    const draft = draftService.getByUser(i.user.id);
    if (!draft)
      return i.reply({
        embeds: [embeds.error(i.user, '⛔ Замовлення не знайдено.')],
        flags: MessageFlags.Ephemeral,
      });

    const semesterId = Number(i.values[0]);
    draftService.update(draft.id, d => {
      d.semesterId = semesterId;
      d.stage++;
    });

    await rebuildCurrentStepUI(i, draft);
  },
} as Component<StringSelectMenuInteraction, StringSelectMenuBuilder>;
