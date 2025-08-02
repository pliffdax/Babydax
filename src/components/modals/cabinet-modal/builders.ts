import { colorsDecimal } from '@/constants';
import { makeDefaultEmbed } from '@/utils/makeEmbed';
import {
  ActionRowBuilder,
  ModalBuilder,
  ModalSubmitInteraction,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

export type CabinetMode = 'create' | 'edit';

export interface CabinetDefaults {
  pib?: string;
  nzk?: string;
}

export const buildCustomId = (mode: CabinetMode, userId: string) =>
  `cabinetModal:${mode}:${userId}:${Date.now()}`;

export const parseCustomId = (customId: string) => {
  const [, mode, userId, tsRaw] = customId.split(':');
  return {
    mode: mode as CabinetMode,
    userId,
    ts: Number(tsRaw),
  };
};

export const isExpired = (ts: number, window: number) => Date.now() - ts > window;

export const buildCabinetModal = (
  mode: CabinetMode,
  customId: string,
  defaults: CabinetDefaults = {},
) => {
  const fullNameInput = new TextInputBuilder()
    .setCustomId('fullName')
    .setLabel('ПІБ')
    .setRequired(true)
    .setPlaceholder('Мамут Рахал Мефодійович')
    .setStyle(TextInputStyle.Short);

  if (defaults.pib) fullNameInput.setValue(defaults.pib);

  const recordBookInput = new TextInputBuilder()
    .setCustomId('recordBook')
    .setLabel('НЗК (4 цифри)')
    .setRequired(true)
    .setPlaceholder('1234')
    .setMinLength(4)
    .setMaxLength(4)
    .setStyle(TextInputStyle.Short);

  if (defaults.nzk) recordBookInput.setValue(defaults.nzk);

  return new ModalBuilder()
    .setCustomId(customId)
    .setTitle(mode === 'create' ? 'Дані персонального кабінету' : 'Оновити дані кабінету')
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(fullNameInput),
      new ActionRowBuilder<TextInputBuilder>().addComponents(recordBookInput),
    );
};

export const createCabinetMsg = (i: ModalSubmitInteraction, pib: string, nzk: string) =>
  makeDefaultEmbed(colorsDecimal.Info, {
    title: `👤 Кабінет ${i.user.username}`,
    description:
      'Ласкаво просимо до особистого кабінету! Тут ви можете створювати нові замовлення, ' +
      'стежити за їхнім статусом і оновлювати свої контактні дані.',
    fields: [
      {
        name: '📍 ПІБ',
        value: '> ' + pib,
        inline: true,
      },
      {
        name: '📍 НЗК',
        value: '> ' + nzk,
        inline: true,
      },
      {
        name: 'Що далі?',
        value:
          '1. Натисніть **«📥 Створити замовлення»**, щоб відкрити форму.\n' +
          '2. У разі персональних даних — оберіть **«✏️ Редагувати дані»**.\n' +
          '3. Після створення замовлення бот відкриє приватний Thread-канал для подальшого обговорення та трекінгу статусу.',
        inline: false,
      },
    ],
  });
