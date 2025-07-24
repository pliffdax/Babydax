import { ChannelType, SlashCommandBooleanOption, SlashCommandChannelOption } from 'discord.js';

export const orderMainChannelOption = (o: SlashCommandChannelOption) =>
  o
    .setName('channel')
    .setDescription('Channel to set up the order system in')
    .addChannelTypes(ChannelType.GuildText);

export const orderMainCategoryOption = (o: SlashCommandChannelOption) =>
  o
    .setName('category')
    .setDescription('Category to set up the order system in')
    .addChannelTypes(ChannelType.GuildCategory);

export const orderMainMessageOption = (o: SlashCommandBooleanOption) =>
  o.setName('message').setDescription('Send a message in the channel');
