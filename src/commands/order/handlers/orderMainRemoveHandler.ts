import { embeds } from "@/constants";
import { Nullable } from "@/types";
import { ChatInputCommandInteraction, CategoryChannel, TextChannel } from "discord.js";

export const orderMainRemoveHandler = async (
  i: ChatInputCommandInteraction,
  category: Nullable<CategoryChannel>,
  channel: Nullable<TextChannel>,
  message: Nullable<boolean>,
) => {
  const { user, guildId } = i;

  if ([category, channel, message].every(v => v === null)) {
    return i.editReply({
      embeds: [embeds.error(user, 'Не вказано жодного параметра для налаштування!')],
    });
  }

  // TODO:
  // Implement the logic to remove the order system settings
  // This could involve deleting the settings from the database
};