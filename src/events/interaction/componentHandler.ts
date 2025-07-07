import { Interaction } from 'discord.js';
import { loadComponents } from '@/loaders/componentLoader';
import { DEVELOPERS } from '@/config';
import { Event, Component } from '@/types';

const { exactMap, regexArr } = await loadComponents();

function findComponent(customId: string): Component | null {
  const exact = exactMap.get(customId);
  if (exact) return exact;

  for (const c of regexArr) if ((c.id as RegExp).test(customId)) return c;
  return null;
}

export default {
  name: 'interactionCreate',
  async run(i: Interaction) {
    if (!i.isButton() && !i.isAnySelectMenu() && !i.isModalSubmit()) return;

    const comp = findComponent(i.customId);
    if (!comp) return;

    if (comp.devOnly && !DEVELOPERS.includes(i.user.id)) {
      return i.reply({ content: 'Dev only 👷', ephemeral: true });
    }
    await comp.run(i as never);
  },
} as Event<'interactionCreate'>;
