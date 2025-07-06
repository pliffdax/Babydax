import { Interaction } from 'discord.js';
import { loadCommands } from '@/loaders/commandLoader';
import { logger } from '@/utils/logger';
import { DEVELOPERS } from '@/config';
import { Event } from '@/types';

const commands = await loadCommands();

export default {
  name: 'interactionCreate',
  async run(i: Interaction) {
    if (!i.isChatInputCommand() && !i.isContextMenuCommand()) return;

    const cmd = commands.get(i.commandName);
    if (!cmd?.run) return;

    if (cmd.devOnly && !DEVELOPERS.includes(i.user.id)) {
      return i.reply({ content: 'Dev only 👷', ephemeral: true });
    }

    try {
      await cmd.run(i);
    } catch (err) {
      logger.error(
        `Command ${i.commandName} failed: ${(err as Error).message}`,
      );
    }
  },
} as Event<'interactionCreate'>;
