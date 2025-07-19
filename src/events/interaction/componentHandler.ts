import { Events, Interaction } from 'discord.js';
import { loadComponents } from '@/loaders/componentLoader';
import { Event, Component } from '@/types';
import { isDev } from '@/utils/isDev';
import { messages } from '@/constants';

const { exactMap, regexArr } = await loadComponents();

function findComponent(customId: string): Component | null {
  const exact = exactMap.get(customId);
  if (exact) return exact;

  for (const c of regexArr) if ((c.id as RegExp).test(customId)) return c;
  return null;
}

export default {
  name: Events.InteractionCreate,
  async run(i: Interaction) {
    if (!i.isButton() && !i.isAnySelectMenu() && !i.isModalSubmit()) return;

    const comp = findComponent(i.customId);
    if (!comp) return;

    if (comp.devOnly && !isDev(i.user.id)) {
      return i.reply({ content: messages.DevOnly, ephemeral: true });
    }
    await comp.run(i as never);
  },
} as Event<Events.InteractionCreate>;
