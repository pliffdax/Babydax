import { draftService } from '@/services';
import { Component } from '@/types';
import { renderStep } from '@/ui/orderForm';
import { ButtonBuilder, ButtonInteraction, ButtonStyle, InteractionReplyOptions } from 'discord.js';

export default {
  id: 'createOrder',
  data: new ButtonBuilder()
    .setCustomId('createOrder')
    .setLabel('Створити замовлення')
    .setEmoji('📥')
    .setStyle(ButtonStyle.Primary),

  async run(i: ButtonInteraction) {
    const draft = draftService.create(i.user.id);

    const payload = await renderStep(draft);
    await i.reply({ ...payload } as InteractionReplyOptions);
    const reply = await i.fetchReply();
    draftService.attachMessage(draft.id, reply);
    // await i.reply({
    //   content: '1️⃣ Оберіть ваш семестр з меню нижче.',
    // });

    // const reply = await i.fetchReply();
    // const draft = draftService.create(i.user.id, reply);
    // await rebuildCurrentStepUI(reply, draft);
  },
} as Component<ButtonInteraction, ButtonBuilder>;
