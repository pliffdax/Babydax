import { StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from 'discord.js';
import { WorkTypeEntry } from '@/data/mock/Subject';
import { buildTaskId } from '@/utils/taskId';
import { draftService } from '@/services';

const OPTION_EMOJI = '📝';
const NA_ICON = '🚫';

function fmtPrice(min: number | null, max?: number | null) {
  if (min == null) return NA_ICON;
  if (max && max !== min) return `${min}–${max} грн`;
  return `${min} грн`;
}

export async function buildSelectTasksMenu(userId: string) {
  const draft = draftService.getByUser(userId);
  if (!draft?.subjectId) throw new Error('draft.subjectId is empty');

  const subject = (await import('@/data/subjects')).subjects.find(
    s => s.subjectId === draft.subjectId,
  )!;

  const options: StringSelectMenuOptionBuilder[] = [];

  subject.works
    .filter((w: WorkTypeEntry) => w.priceMin !== null)
    .forEach((w: WorkTypeEntry) => {
      const priceTag = fmtPrice(w.priceMin, w.priceMax);

      if (w.numbers?.length) {
        w.numbers.forEach(num => {
          options.push(
            new StringSelectMenuOptionBuilder()
              .setLabel(`${w.type} №${num}${w.variant ? ` — ${w.variant}` : ''} • ${priceTag}`)
              .setValue(buildTaskId(subject.subjectId, w.type, num, w.variant))
              .setEmoji(OPTION_EMOJI),
          );
        });
      } else {
        options.push(
          new StringSelectMenuOptionBuilder()
            .setLabel(`${w.type}${w.variant ? ` — ${w.variant}` : ''} • ${priceTag}`)
            .setValue(buildTaskId(subject.subjectId, w.type, undefined, w.variant))
            .setEmoji(OPTION_EMOJI),
        );
      }
    });

  return new StringSelectMenuBuilder()
    .setCustomId('selectTasks')
    .setPlaceholder('Оберіть роботи')
    .setMinValues(1)
    .setMaxValues(options.length)
    .setOptions(options);
}
