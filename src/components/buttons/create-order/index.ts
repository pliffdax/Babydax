import { ButtonBuilder, ButtonInteraction, ButtonStyle } from 'discord.js';

export default {
  id: 'createOrder',
  data: new ButtonBuilder()
    .setCustomId('createOrder')
    .setLabel('Створити замовлення')
    .setEmoji('📦')
    .setStyle(ButtonStyle.Primary),

  async run(i: ButtonInteraction) {},
};
