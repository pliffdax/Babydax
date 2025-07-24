import {
  ActionRowBuilder,
  ModalBuilder,
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

export const isExpired = (ts: number, window: number) =>
  Date.now() - ts > window;

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
    .setTitle(
      mode === 'create'
        ? 'Дані персонального кабінету'
        : 'Оновити дані кабінету',
    )
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(fullNameInput),
      new ActionRowBuilder<TextInputBuilder>().addComponents(recordBookInput),
    );
};

