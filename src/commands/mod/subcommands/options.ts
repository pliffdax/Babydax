import {
  ChannelType,
  SlashCommandChannelOption,
  SlashCommandNumberOption,
  SlashCommandStringOption,
  SlashCommandUserOption,
} from 'discord.js';

/* ---------- PURGE ---------- */
export const modPurgeNumberOption = (o: SlashCommandNumberOption) =>
  o.setName('n').setDescription('Amount of messages to delete').setRequired(true);

export const modPurgeChannelOption = (o: SlashCommandChannelOption) =>
  o
    .setName('channel')
    .setDescription('Channel to purge (defaults to current)')
    .addChannelTypes(
      ChannelType.GuildText,
      ChannelType.PublicThread,
      ChannelType.PrivateThread,
      ChannelType.GuildForum,
    )
    .setRequired(false);

export const modPurgeUserOption = (o: SlashCommandUserOption) =>
  o
    .setName('user')
    .setDescription('Delete only messages from this user')
    .setRequired(false);

/* ---------- KICK / BAN / TIMEOUT ---------- */
export const modTargetUserOption = (o: SlashCommandUserOption) =>
  o.setName('user').setDescription('Target user').setRequired(true);

export const modReasonOption = (o: SlashCommandStringOption) =>
  o
    .setName('reason')
    .setDescription('Reason (will be visible in audit log)')
    .setRequired(false)
    .setMaxLength(512);

export const modDurationOption = (o: SlashCommandStringOption) =>
  o
    .setName('duration')
    .setDescription('Duration  e.g. 1w2d3h4m5s')
    .setRequired(true)
    .setMaxLength(20);

/* ---------- LOCK / UNLOCK ---------- */
export const modLockChannelOption = (o: SlashCommandChannelOption) =>
  o
    .setName('channel')
    .setDescription('Channel to lock/unlock (defaults to current)')
    .addChannelTypes(ChannelType.GuildText)
    .setRequired(false);
