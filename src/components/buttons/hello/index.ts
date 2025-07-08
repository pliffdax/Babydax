import { ButtonBuilder, ButtonStyle, ButtonInteraction, MessageFlags } from 'discord.js';
import { Component } from '@/types';

/**
 * Will be deleted later.
 * This is a simple button component that replies with a greeting message.
 */
export default {
  id: 'hello',
  data: new ButtonBuilder().setCustomId('hello').setLabel('Say Hi').setStyle(ButtonStyle.Primary),

  async run(i: ButtonInteraction) {
    await i.reply({ content: '👋 Hi there!', flags: MessageFlags.Ephemeral });
  },
} as Component<ButtonInteraction, ButtonBuilder>;
