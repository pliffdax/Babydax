import { configDotenv } from 'dotenv';
configDotenv();

export const { TOKEN, CLIENT_ID, TEST_GUILD_ID, DEVELOPERS_ID = '' } = process.env;

export const COMMAND_GLOB = 'src/commands/*/index.{ts,js}';
export const COMPONENT_GLOB = 'src/components/{buttons,modals,selectmenus}/*/index.{ts,js}';

export const DEVELOPERS = DEVELOPERS_ID.split(',')
  .map(s => s.trim())
  .filter(Boolean);
