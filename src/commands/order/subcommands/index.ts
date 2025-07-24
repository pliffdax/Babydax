import {
  orderMainCategoryOption,
  orderMainChannelOption,
  orderMainMessageOption,
} from '@/commands/order/subcommands/options';
import { SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder } from 'discord.js';

export const orderMain = (g: SlashCommandSubcommandGroupBuilder) =>
  g
    .setName('main')
    .setDescription('Main order commands')
    .addSubcommand(orderMainSetSubcommand)
    .addSubcommand(orderMainRemoveSubcommand)
    .addSubcommand(orderMainInfoSubcommand);

const orderMainSetSubcommand = (s: SlashCommandSubcommandBuilder) =>
  s
    .setName('set')
    .setDescription('Set up the order system components')
    .addChannelOption(orderMainCategoryOption)
    .addChannelOption(orderMainChannelOption)
    .addBooleanOption(orderMainMessageOption);

const orderMainRemoveSubcommand = (s: SlashCommandSubcommandBuilder) =>
  s
    .setName('remove')
    .setDescription('Remove the order system components from the channel')
    .addChannelOption(orderMainCategoryOption)
    .addChannelOption(orderMainChannelOption)
    .addBooleanOption(orderMainMessageOption);

const orderMainInfoSubcommand = (s: SlashCommandSubcommandBuilder) =>
  s.setName('info').setDescription('Get information about the order system settings');
