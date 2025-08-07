import { Events, Interaction, MessageFlags } from 'discord.js';
import { loadComponents } from '@/loaders/componentLoader';
import { Event, Component } from '@/types';
import { isDev } from '@/utils/isDev';
import { embeds } from '@/constants';
import { logger } from '@/utils/logger';
import { safeReply } from '@/utils/safeReply';
import { isTestGuild } from '@/utils/isTestGuild';

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

    if (comp.test && !isTestGuild(i.guildId)) {
      return i.reply({ embeds: [embeds.test(i.user)], flags: MessageFlags.Ephemeral });
    }

    if (comp.devOnly && !isDev(i.user.id)) {
      return i.reply({ embeds: [embeds.devOnly(i.user)], flags: MessageFlags.Ephemeral });
    }

    try {
      await comp.run(i as never);
    } catch (err) {
      const message = (err as Error).message ?? 'Unknown Error';
      logger.error(`Component ${i.customId} failed: ${message}`);
      await safeReply(i, embeds.error(i.user, `⚠️ ${message}`));
    }
  },
} as Event<Events.InteractionCreate>;
