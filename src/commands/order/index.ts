import { orderMain } from '@/commands/order/subcommands';
import { orderMainInfoHandler, orderMainRemoveHandler, orderMainSetHandler } from '@/commands/order/subcommands/handlers';
import {
  CategoryChannel,
  ChatInputCommandInteraction,
  MessageFlags,
  PermissionFlagsBits,
  SlashCommandBuilder,
  TextChannel,
} from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('order')
    .setDescription('Order system command group')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommandGroup(orderMain),
  async run(i: ChatInputCommandInteraction) {
    const { options } = i;
    const subcommand = i.options.getSubcommand();
    await i.deferReply({ flags: MessageFlags.Ephemeral });

    if (subcommand === 'info') {
      // TODO:
      // Implement the logic to get the order system settings information
      return await orderMainInfoHandler(i);
    }

    const category = options.getChannel('category') as CategoryChannel;
    const channel = options.getChannel('channel') as TextChannel;
    const message = options.getBoolean('message');

    if (subcommand === 'set') {
      await orderMainSetHandler(i, category, channel, message);
    } else if (subcommand === 'remove') {
      await orderMainRemoveHandler(i, category, channel, message);
    }
  },
};
