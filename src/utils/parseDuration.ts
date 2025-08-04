export function parseDuration(str: string): number {
  const units: Record<string, number> = {
    w: 7 * 24 * 60 * 60,
    d: 24 * 60 * 60,
    h: 60 * 60,
    m: 60,
    s: 1,
  };
  const regex = /(\d+)\s*(w|d|h|m|s)/gi;
  let sec = 0;
  for (const [, num, u] of str.matchAll(regex)) sec += +num * units[u.toLowerCase()];
  if (!sec) throw new Error('Invalid duration, use e.g. 2h30m');
  return sec * 1_000;
}
