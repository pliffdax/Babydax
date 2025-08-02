import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonInteraction,
  StringSelectMenuInteraction,
  InteractionUpdateOptions,
  Message,
  ButtonBuilder,
} from 'discord.js';
import { DraftStage, OrderDraft } from '@/types';
import { buildSelectSubjectMenu } from '@/components/selectmenus/select-subject/builders';
import { buildSelectTasksMenu } from '@/components/selectmenus/select-tasks/builders';
import { componentsPromise } from '@/components';
import { buildNavRow } from '@/components/buttons/nav/builders';
import { parseTaskId } from '@/utils/taskId';
import { subjects } from '@/data';
import { makeDefaultEmbed } from '@/utils/makeEmbed';
import { colorsDecimal } from '@/constants';

function formatTask(taskId: string) {
  const { subjectId, type, number, variantSlug } = parseTaskId(taskId);
  const subj = subjects.find(s => s.subjectId === subjectId)!;
  const work = subj.works.find(
    w =>
      w.type === type &&
      (w.variant ? variantSlug === w.variant.toLowerCase().replace(/\s+/g, '-') : true),
  )!;

  const numStr = number !== undefined ? ` №${number}` : '';
  const varStr = work.variant ? ` — *${work.variant}*` : '';
  return `${work.type}${numStr}${varStr}`;
}

export async function renderStep(draft: OrderDraft): Promise<InteractionUpdateOptions> {
  const { exactMap } = await componentsPromise;

  switch (draft.stage) {
    case DraftStage.Semester: {
      return {
        embeds: [
          makeDefaultEmbed(colorsDecimal.Info, {
            title: '1️⃣ Оберіть ваш семестр з меню нижче.',
          }),
        ],
        components: [
          new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            exactMap.get('selectSemester')!.data as StringSelectMenuBuilder,
          ),
          buildNavRow(draft.stage === DraftStage.Semester, true),
        ],
      };
    }

    case DraftStage.Subject:
      return {
        embeds: [
          makeDefaultEmbed(colorsDecimal.Info, {
            title: `2️⃣ Оберіть предмет з обраного (${draft.semesterId}) семестру:`,
          }),
        ],
        components: [
          new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            buildSelectSubjectMenu(draft.semesterId!),
          ),
          buildNavRow(false, true),
        ],
      };

    case DraftStage.Tasks:
      return {
        embeds: [
          makeDefaultEmbed(colorsDecimal.Info, {
            title: '3️⃣ Оберіть роботи (можна кілька):',
          }),
        ],
        components: [
          new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            await buildSelectTasksMenu(draft.userId),
          ),
          buildNavRow(false, true),
        ],
      };

    case DraftStage.Description:
      return {
        embeds: [
          makeDefaultEmbed(colorsDecimal.Info, {
            title: '4️⃣ Додайте опис (за бажанням), або пропустіть цей крок.',
          }),
        ],
        components: [
          new ActionRowBuilder<ButtonBuilder>().addComponents(
            exactMap.get('openDescriptionModal')!.data as ButtonBuilder,
            exactMap.get('skipOrderDescription')!.data as ButtonBuilder,
          ),
          buildNavRow(false, true),
        ],
      };

    case DraftStage.Confirm: {
      const taskLines = draft.taskIds!.map(formatTask).join('\n');

      const embed = makeDefaultEmbed(colorsDecimal.Info, {
        title: '5️⃣ Якщо все правильно, натисніть **«✅»**.',
        fields: [
          { name: 'Семестр', value: `${draft.semesterId}`, inline: false },
          {
            name: 'Предмет',
            value: subjects.find(s => s.subjectId === draft.subjectId)!.name,
            inline: false,
          },
          { name: 'Роботи', value: taskLines || '—', inline: false },
          { name: 'Опис', value: draft.description || '—', inline: false },
        ],
      });

      return {
        embeds: [embed],
        components: [buildNavRow(false, false)],
      };
    }

    default:
      return {
        embeds: [
          makeDefaultEmbed(colorsDecimal.Warning, {
            title: '🚧 Невідомий крок',
          }),
        ],
        components: [],
      };
  }
}

type UpdatableInteraction = ButtonInteraction | StringSelectMenuInteraction | Message;

export async function rebuildCurrentStepUI(i: UpdatableInteraction, draft: OrderDraft) {
  const payload = await renderStep(draft);

  if ('update' in i) {
    await i.update(payload);
  } else if (draft.message) {
    await draft.message.edit(payload);
  }
}
