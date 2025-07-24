import { colorsDecimal } from '@/constants';
import { ButtonBuilder, ButtonStyle, ButtonInteraction, EmbedBuilder, MessageFlags } from 'discord.js';

export default {
  id: 'infoPrice',
  data: new ButtonBuilder()
    .setCustomId('infoPrice')
    .setLabel('Цінова політика')
    .setEmoji('💸')
    .setStyle(ButtonStyle.Success),

  async run(i: ButtonInteraction) {
    return await i.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('💸 Цінова політика на сервері. Що потрібно знати 👇')
          .setDescription('Опис буде додано пізніше')
          .setColor(colorsDecimal.Success),
      ],
      flags: MessageFlags.Ephemeral,
    });
  },
};
