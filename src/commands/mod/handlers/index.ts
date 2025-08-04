export { purgeHandler } from './purge';
export { lockHandler } from './lock';
export { unlockHandler } from './unlock';
export { kickHandler } from './kick';
export { banHandler } from './ban';
export { timeoutHandler } from './timeout';
export { pardonHandler } from './pardon';

export const emptyReasonSymbol = '—';

export function isEmptyReasonSymbol(str: string) {
  return str === emptyReasonSymbol;
}

export function isNotEmptyReasonSymbol(str: string) {
  return str !== emptyReasonSymbol;
}
