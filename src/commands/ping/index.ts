import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ActionRowBuilder,
  ButtonBuilder,
} from 'discord.js';
import { Command } from '@/types';
import { componentsPromise } from '@/components';
import { embeds } from '@/constants/embeds';

export default {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
  devOnly: true,
  async run(i: ChatInputCommandInteraction) {
    const { exactMap } = await componentsPromise;

    const helloBtnProto = exactMap.get('createOrderChannel')!.data as ButtonBuilder;

    await i.reply({
      embeds: [embeds.success(i.user, '🏓 Pong! Press buttons ↓')],
      components: [new ActionRowBuilder<ButtonBuilder>().addComponents(helloBtnProto)],
    });

    const sent = await i.fetchReply();
    await i.followUp(`Latency: **${sent.createdTimestamp - i.createdTimestamp} ms**`);
  },
} as Command<ChatInputCommandInteraction>;
