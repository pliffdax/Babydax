import { colorsDecimal } from '@/constants';
import {
  ButtonBuilder,
  ButtonStyle,
  ButtonInteraction,
  EmbedBuilder,
  MessageFlags,
} from 'discord.js';

export default {
  id: 'infoOrder',
  data: new ButtonBuilder()
    .setCustomId('infoOrder')
    .setLabel('Процес замовлення')
    .setEmoji('📝')
    .setStyle(ButtonStyle.Secondary),

  async run(i: ButtonInteraction) {
    return await i.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('📝 Як працює система замовлень на сервері?')
          .setDescription('Опис буде додано пізніше')
          .setColor(colorsDecimal.Info),
      ],
      flags: MessageFlags.Ephemeral,
    });
  },
};
