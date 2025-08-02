// components/buttons/info-price/index.ts
import { colorsDecimal } from '@/constants';
import {
  ButtonBuilder,
  ButtonStyle,
  ButtonInteraction,
  EmbedBuilder,
  MessageFlags,
} from 'discord.js';
import { subjects } from '@/data/subjects';
import { Nullable } from '@/types';

const PRICE_ICON = '💸';
const NA_ICON = '🚫';

function fmtPrice(min: Nullable<number>, max?: Nullable<number>) {
  if (min == null) return NA_ICON;
  if (max && max !== min) return `${PRICE_ICON} \`${min}–${max} грн.\``;
  return `${PRICE_ICON} \`${min} грн.\``;
}

function fmtNumbers(numbers?: number[]) {
  if (!numbers || !numbers.length) return '';
  return ` №${numbers.map(num => `**[${num}]**`).join(',')}`;
}

export default {
  id: 'infoPrice',
  data: new ButtonBuilder()
    .setCustomId('infoPrice')
    .setLabel('Цінова політика')
    .setEmoji(PRICE_ICON)
    .setStyle(ButtonStyle.Success),

  async run(i: ButtonInteraction) {
    const semesters = [...new Set(subjects.map(s => s.semester))].sort();

    const embeds = semesters.map(sem => {
      const fields = subjects
        .filter(s => s.semester === sem)
        .map(s => {
          const value = s.works
            .map(w => {
              const variant = w.variant ? ` — *${w.variant}*` : '';
              return `- ${w.type}${fmtNumbers(w.numbers)}${variant}: ${fmtPrice(w.priceMin, w.priceMax)}`;
            })
            .join('\n');

          return { name: s.name, value, inline: false };
        });

      return new EmbedBuilder()
        .setTitle(`💰 = = = = = = = = = = = = = = = ${sem} семестр = = = = = = = = = = = = = = = 💰`)
        .addFields(fields)
        .setColor(colorsDecimal.Success);
    });

    await i.reply({ embeds, flags: MessageFlags.Ephemeral });
  },
};
