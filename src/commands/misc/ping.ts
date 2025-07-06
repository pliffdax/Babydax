import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '@/types';

export default {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),

  async run(interaction: ChatInputCommandInteraction) {
    await interaction.reply('Pong!');

    const sent = await interaction.fetchReply();

    await interaction.followUp(
      `🏓 Latency: **${sent.createdTimestamp - interaction.createdTimestamp} ms**`,
    );
  },
} as Command<ChatInputCommandInteraction>;
