import { ChatInputCommandInteraction } from "discord.js";

export const orderMainInfoHandler = async (i: ChatInputCommandInteraction) => {
  const { user, guildId } = i;
  
  // TODO:
  // Fetch the order system settings from the database
  // If settings exist, display them in an embed
  // If not, inform the user that no settings are found for this guild
};