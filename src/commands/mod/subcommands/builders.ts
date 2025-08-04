import { SlashCommandSubcommandBuilder } from 'discord.js';
import {
  modPurgeChannelOption,
  modPurgeNumberOption,
  modPurgeUserOption,
  modReasonOption,
  modTargetUserOption,
  modDurationOption,
  modLockChannelOption,
} from '@/commands/mod/subcommands/options';

/* ---------- /mod purge ---------- */
export const modPurgeSubcommand = (s: SlashCommandSubcommandBuilder) =>
  s
    .setName('purge')
    .setDescription('Delete messages in bulk')
    .addNumberOption(modPurgeNumberOption)
    .addChannelOption(modPurgeChannelOption)
    .addUserOption(modPurgeUserOption);

/* ---------- /mod lock ---------- */
export const modLockSubcommand = (s: SlashCommandSubcommandBuilder) =>
  s
    .setName('lock')
    .setDescription('Deny @everyone SendMessages permission')
    .addChannelOption(modLockChannelOption)
    .addStringOption(modReasonOption);

/* ---------- /mod unlock ---------- */
export const modUnlockSubcommand = (s: SlashCommandSubcommandBuilder) =>
  s
    .setName('unlock')
    .setDescription('Restore SendMessages permission')
    .addChannelOption(modLockChannelOption)
    .addStringOption(modReasonOption);

/* ---------- /mod kick ---------- */
export const modKickSubcommand = (s: SlashCommandSubcommandBuilder) =>
  s
    .setName('kick')
    .setDescription('Kick a user')
    .addUserOption(modTargetUserOption)
    .addStringOption(modReasonOption);

/* ---------- /mod ban ---------- */
export const modBanSubcommand = (s: SlashCommandSubcommandBuilder) =>
  s
    .setName('ban')
    .setDescription('Ban a user')
    .addUserOption(modTargetUserOption)
    .addStringOption(modReasonOption);

/* ---------- /mod timeout ---------- */
export const modTimeoutSubcommand = (s: SlashCommandSubcommandBuilder) =>
  s
    .setName('timeout')
    .setDescription('Temporarily mute a user')
    .addUserOption(modTargetUserOption)
    .addStringOption(modDurationOption)
    .addStringOption(modReasonOption);

/* ---------- /mod pardon ---------- */
export const modPardonSubcommand = (s: SlashCommandSubcommandBuilder) =>
  s
    .setName('pardon')
    .setDescription('Remove an active timeout from user')
    .addUserOption(modTargetUserOption)
    .addStringOption(modReasonOption);
