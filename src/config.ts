import { configDotenv } from 'dotenv';
configDotenv();

export const { TOKEN, CLIENT_ID, TEST_GUILD_ID, DEVELOPERS_ID = '' } = process.env;

export const DEVELOPERS = DEVELOPERS_ID.split(',')
  .map(s => s.trim())
  .filter(Boolean);
