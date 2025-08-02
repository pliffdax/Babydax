import { StringSelectMenuBuilder } from 'discord.js';
import { subjects } from '@/data/subjects';
import { WorkTypeEntry } from '@/data/mock/Subject';

export const buildSelectSubjectMenu = (semester: number) => {
  const options = subjects
    .filter(
      s => s.semester === semester && !s.works.every((w: WorkTypeEntry) => w.priceMin === null),
    )
    .map(s => ({
      label: s.name,
      value: s.subjectId,
      emoji: '📚',
    }));

  return new StringSelectMenuBuilder()
    .setPlaceholder('Оберіть предмет')
    .setCustomId(`selectSubject`)
    .addOptions(options)
    .setMinValues(1)
    .setMaxValues(1);
};
