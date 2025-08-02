import { ButtonInteraction, MessageFlags } from 'discord.js';
import { draftService } from '@/services/';
import { embeds } from '@/constants';
// import { OrderService } from '@/services/orderService'; // реалізуєш пізніше

export default {
  id: 'confirmOrder',
  async run(i: ButtonInteraction) {
    const draft = draftService.getByUser(i.user.id);
    if (!draft || !draft.taskIds?.length)
      return i.reply({
        embeds: [embeds.error(i.user, '⛔ Не вибрано роботи')],
        flags: MessageFlags.Ephemeral,
      });

    // TODO:
    // await OrderService.createFromDraft(draft);
    draftService.expire(draft.id);

    await i.update({ content: '✅ Замовлення створено!', components: [] });
  },
};
