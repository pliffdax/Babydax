export const hexToDecimal = (hex: string): number => {
  return parseInt(hex.replace(/^#/, ''), 16);
};
