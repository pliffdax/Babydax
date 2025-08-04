export function discordTimestampAt(
  date: Date | number | string,
  style: 'f' | 'F' | 'd' | 't' | 'T' | 'R' = 'f',
): string {
  const ms = typeof date === 'number' ? date : new Date(date).getTime();
  return `<t:${Math.floor(ms / 1000)}:${style}>`;
}

export function discordTimestampIn(
  durationMs: number,
  style: 'f' | 'F' | 'd' | 't' | 'T' | 'R' = 'f',
): string {
  return discordTimestampAt(Date.now() + durationMs, style);
}
