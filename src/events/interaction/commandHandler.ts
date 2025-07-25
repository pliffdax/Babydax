import { Events, Interaction, MessageFlags } from 'discord.js';
import { loadCommands } from '@/loaders/commandLoader';
import { logger } from '@/utils/logger';
import { Event } from '@/types';
import { isDev } from '@/utils/isDev';
import { embeds } from '@/constants';

const commands = await loadCommands();

export default {
  name: Events.InteractionCreate,
  async run(i: Interaction) {
    if (!i.isChatInputCommand() && !i.isContextMenuCommand()) return;

    const cmd = commands.get(i.commandName);
    if (!cmd?.run) return;

    if (cmd.devOnly && !isDev(i.user.id)) {
      return i.reply({ embeds: [embeds.devOnly(i.user)], flags: MessageFlags.Ephemeral });
    }

    try {
      await cmd.run(i);
    } catch (err) {
      logger.error(`Command ${i.commandName} failed: ${(err as Error).message}`);
    }
  },
} as Event<Events.InteractionCreate>;
