export function isTestGuild(guildId: string | null | undefined): boolean {
  return !!process.env.TEST_GUILD_ID && guildId === process.env.TEST_GUILD_ID;
}
