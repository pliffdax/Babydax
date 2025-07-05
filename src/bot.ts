import { Client, GatewayIntentBits } from 'discord.js';
import { configDotenv } from 'dotenv';
import { logger } from '@/utils/logger';

configDotenv();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  logger.success(`Logged in as ${client.user?.tag}`);
});

client.login(process.env.TOKEN)