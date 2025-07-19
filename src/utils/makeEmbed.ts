import { ColorResolvable, EmbedBuilder, User } from 'discord.js';

export const makeEmbed = (color: ColorResolvable) => (user: User, description: string) =>
  new EmbedBuilder()
    .setAuthor({
      name: user.username,
      iconURL: user.displayAvatarURL(),
      url: `https://discord.com/users/${user.id}`,
    })
    .setDescription(description)
    .setColor(color);
