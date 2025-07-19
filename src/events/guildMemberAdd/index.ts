import { embeds } from '@/constants';
import type { Event } from '@/types';
import { Events, GuildMember } from 'discord.js';

export default {
  name: Events.GuildMemberAdd,
  async run(member: GuildMember) {
    const embed = embeds.joined(member);

    // Fetch the channel where the message should be sent
    const channel = await member.guild.channels.fetch("1317935346280955906");
    if (channel && channel.isTextBased()) {
      await channel.send({ embeds: [embed] });
    }
  },
} as Event<Events.GuildMemberAdd>;
