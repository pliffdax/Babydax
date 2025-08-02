import {
  ModalSubmitInteraction,
  ChannelType,
  PermissionFlagsBits,
  MessageFlags,
  ActionRowBuilder,
  ButtonBuilder,
} from 'discord.js';
import { Component } from '@/types';
import { embeds } from '@/constants';
import { parseCustomId, isExpired, createCabinetMsg } from './builders';
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

    const embed = createCabinetMsg(i, pib, nzk);

    const { exactMap } = await componentsPromise;

    const components = [
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        exactMap.get('createOrder')!.data as ButtonBuilder,
        exactMap.get('changeCredentials')!.data as ButtonBuilder,
        exactMap.get('infoPrice')!.data as ButtonBuilder,
      ),
    ];

    if (mode === 'create') {
      const channel = await i.guild!.channels.create({
        name: `${i.user.username}-${nzk}`,
        type: ChannelType.GuildText,
        parent: '1397898938836586526',
        permissionOverwrites: [
          { id: i.guild!.id, deny: [PermissionFlagsBits.ViewChannel] },
          { id: i.user.id, allow: [PermissionFlagsBits.ViewChannel] },
          {
            id: '1342408785741746206',
            allow: [PermissionFlagsBits.ViewChannel],
          },
        ],
      });

      const msg = await channel.send({
        embeds: [embed],
        components,
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
        embeds: [embed],
        components,
      });

    await i.reply({
      embeds: [embeds.success(i.user, '✅ Дані оновлено.')],
      flags: MessageFlags.Ephemeral,
    });
  },
} as Component<ModalSubmitInteraction>;
