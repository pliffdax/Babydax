import {
  ModalSubmitInteraction,
  ChannelType,
  PermissionFlagsBits,
  MessageFlags,
  ActionRowBuilder,
  ButtonBuilder,
} from 'discord.js';
import { Component } from '@/types';
import { colorsDecimal, embeds } from '@/constants';
import { parseCustomId, isExpired } from './builders';
import { makeDefaultEmbed } from '@/utils/makeEmbed';
import { componentsPromise } from '@/components';

export const TIMEOUT = 60_000;

export default {
  id: /^cabinetModal:(create|edit):\d{17,20}:\d+$/,
  async run(i: ModalSubmitInteraction) {
    const { mode, userId, ts } = parseCustomId(i.customId);

    if (userId !== i.user.id)
      return i.reply({
        embeds: [embeds.error(i.user, '🚫 Ця форма не для вас.')],
        flags: MessageFlags.Ephemeral,
      });

    if (isExpired(ts, TIMEOUT))
      return i.reply({
        embeds: [embeds.error(i.user, '⌛️ Час вийшов. Відкрийте нову форму.')],
        flags: MessageFlags.Ephemeral,
      });

    const pib = i.fields.getTextInputValue('fullName').trim();
    const nzk = i.fields.getTextInputValue('recordBook').trim();

    if (!/^\d{4}$/.test(nzk))
      return i.reply({
        embeds: [embeds.error(i.user, '🚫 НЗК має містити рівно 4 цифри.')],
        flags: MessageFlags.Ephemeral,
      });

    if (mode === 'create') {
      const channel = await i.guild!.channels.create({
        name: `${i.user.username}-${nzk}`,
        type: ChannelType.GuildText,
        parent: '1397898938836586526', // TODO: fetch from DB
        permissionOverwrites: [
          { id: i.guild!.id, deny: [PermissionFlagsBits.ViewChannel] },
          { id: i.user.id, allow: [PermissionFlagsBits.ViewChannel] },
          {
            id: '1342408785741746206', // TODO: role from DB
            allow: [PermissionFlagsBits.ViewChannel],
          },
        ],
      });

      const { exactMap } = await componentsPromise;

      const msg = await channel.send({
        embeds: [
          makeDefaultEmbed(colorsDecimal.Info, {
            title: `👤 Персональний кабінет ${i.user.username}`,
            description:
              'Вітаємо! Ваш кабінет успішно створено. Ви можете використовувати цей канал для створення замовлень.',
            fields: [
              { name: '📍 ПІБ', value: pib, inline: true },
              { name: '📍 НЗК', value: nzk, inline: true },
            ],
          }),
        ],
        components: [
          new ActionRowBuilder<ButtonBuilder>().addComponents(
            exactMap.get('createOrder')!.data as ButtonBuilder,
            exactMap.get('changeCredentials')!.data as ButtonBuilder,
          ),
        ],
      });
      await msg.pin();

      return i.reply({
        embeds: [embeds.success(i.user, `✅ Ваш кабінет успішно створено: ${channel}`)],
        flags: MessageFlags.Ephemeral,
      });
    }

    const channel = await i.guild!.channels.fetch(i.channel!.id);
    if (!channel || channel.type !== ChannelType.GuildText)
      return i.reply({
        embeds: [embeds.error(i.user, '🚫 Кабінет не знайдено.')],
        flags: MessageFlags.Ephemeral,
      });

    await channel.setName(`${i.user.username}-${nzk}`);

    const cabinetMsg = await channel.messages.fetch(i.message!.id);
    if (cabinetMsg)
      await cabinetMsg.edit({
        embeds: [
          makeDefaultEmbed(colorsDecimal.Info, {
            title: `👤 Персональний кабінет ${i.user.username}`,
            description:
              'Вітаємо! Ваш кабінет успішно створено. Ви можете використовувати цей канал для створення замовлень.',
            fields: [
              { name: '📍 ПІБ', value: `> ${pib}`, inline: true },
              { name: '📍 НЗК', value: `> ${nzk}`, inline: true },
            ],
          }),
        ],
      });

    await i.reply({
      embeds: [embeds.success(i.user, '✅ Дані оновлено.')],
      flags: MessageFlags.Ephemeral,
    });
  },
} as Component<ModalSubmitInteraction>;
