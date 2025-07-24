import { ColorResolvable, EmbedBuilder, User, GuildMember, APIEmbedField } from 'discord.js';

export const makeUserDynamicEmbed =
  (color: ColorResolvable) => (user: User, description: string, timestamp?: boolean) => {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: user.username,
        iconURL: user.displayAvatarURL(),
        url: `https://discord.com/users/${user.id}`,
      })
      .setDescription(description)
      .setColor(color);

    if (timestamp) {
      embed.setTimestamp();
    }

    return embed;
  };

export const makeUserStaticEmbed = (color: ColorResolvable, description: string) => (user: User) =>
  makeUserDynamicEmbed(color)(user, description);

export const makeUserGuildEmbed = (
  member: GuildMember,
  color: ColorResolvable,
  title?: string,
  description?: string,
) => {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: member.user.username,
      iconURL: member.user.displayAvatarURL(),
      url: `https://discord.com/users/${member.user.id}`,
    })
    .setColor(color)
    .setFooter({
      text: `Кількість учасників: ${member.guild.memberCount}`,
    });

  if (title) embed.setTitle(title);
  if (description) embed.setDescription(description);

  return embed;
};

interface DefaultEmbedOptions {
  title?: string;
  description?: string;
  timestamp?: boolean;
  fields?: APIEmbedField[];
}

export const makeDefaultEmbed = (color: ColorResolvable, options: DefaultEmbedOptions = {}) => {
  const { title, description, timestamp, fields } = options;

  const embed = new EmbedBuilder().setColor(color);

  if (title) embed.setTitle(title);
  if (description) embed.setDescription(description);
  if (timestamp) embed.setTimestamp();
  if (fields?.length) embed.addFields(fields);

  return embed;
};
