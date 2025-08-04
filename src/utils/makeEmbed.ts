import { ColorResolvable, EmbedBuilder, User, GuildMember, APIEmbedField } from 'discord.js';

const addAuthorToEmbed = (embed: EmbedBuilder, user: User): void => {
  if (embed.data.author) {
    return;
  }

  embed.setAuthor({
    name: user.username,
    iconURL: user.displayAvatarURL(),
    url: `https://discord.com/users/${user.id}`,
  });
};

export const makeUserDynamicEmbed =
  (color: ColorResolvable) => (user: User, description: string, timestamp?: boolean) => {
    const embed = new EmbedBuilder().setDescription(description).setColor(color);

    addAuthorToEmbed(embed, user);

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
  const embed = new EmbedBuilder().setColor(color).setFooter({
    text: `Кількість учасників: ${member.guild.memberCount}`,
  });

  addAuthorToEmbed(embed, member.user);

  if (title) embed.setTitle(title);
  if (description) embed.setDescription(description);

  return embed;
};

interface DefaultEmbedOptions {
  title?: string;
  description?: string;
  timestamp?: boolean;
  fields?: APIEmbedField[];
  author?: User;
}

export const makeDefaultEmbed = (color: ColorResolvable, options: DefaultEmbedOptions = {}) => {
  const { title, description, timestamp, fields, author } = options;

  const embed = new EmbedBuilder().setColor(color);

  if (title) embed.setTitle(title);
  if (description) embed.setDescription(description);
  if (timestamp) embed.setTimestamp();
  if (fields?.length) embed.addFields(fields);
  if (author) addAuthorToEmbed(embed, author);

  return embed;
};
