import { ColorResolvable, EmbedBuilder, GuildMember } from 'discord.js';

export const makeGuildEmbed = (
  member: GuildMember,
  color: ColorResolvable,
  title?: string,
  description?: string,
) =>
  new EmbedBuilder()
    .setTitle(title ?? null)
    .setAuthor({
      name: member.user.username,
      iconURL: member.user.displayAvatarURL(),
      url: `https://discord.com/users/${member.user.id}`,
    })
    .setDescription(description ?? null)
    .setColor(color)
    .setFooter({
      text: `Кількість учасників: ${member.guild.memberCount}`,
    });
