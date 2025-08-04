import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import {
  modPurgeSubcommand,
  modLockSubcommand,
  modUnlockSubcommand,
  modKickSubcommand,
  modBanSubcommand,
  modTimeoutSubcommand,
  modPardonSubcommand,
} from '@/commands/mod/subcommands';
import * as H from '@/commands/mod/handlers';

export default {
  data: new SlashCommandBuilder()
    .setName('mod')
    .setDescription('Адміністративні команди')
    .setDefaultMemberPermissions(
      PermissionFlagsBits.ModerateMembers |
        PermissionFlagsBits.KickMembers |
        PermissionFlagsBits.BanMembers |
        PermissionFlagsBits.ManageChannels,
    )
    .addSubcommand(modPurgeSubcommand)
    .addSubcommand(modLockSubcommand)
    .addSubcommand(modUnlockSubcommand)
    .addSubcommand(modKickSubcommand)
    .addSubcommand(modBanSubcommand)
    .addSubcommand(modTimeoutSubcommand)
    .addSubcommand(modPardonSubcommand),

  async run(i: ChatInputCommandInteraction) {
    try {
      switch (i.options.getSubcommand(true)) {
        case 'purge':
          return H.purgeHandler(i);
        case 'lock':
          return H.lockHandler(i);
        case 'unlock':
          return H.unlockHandler(i);
        case 'kick':
          return H.kickHandler(i);
        case 'ban':
          return H.banHandler(i);
        case 'timeout':
          return H.timeoutHandler(i);
        case 'pardon':
          return H.pardonHandler(i);
      }
    } catch (err) {
      throw err;
    }
  },
};
