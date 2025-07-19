import { hexToDecimal } from "@/utils/hexToDecimal";

export const colorsHex = {
  Success: "#5ED963",
  Error: "#F44336",
  Warning: "#FFCF30",
} as const;

export const colorsDecimal = {
  Success: hexToDecimal(colorsHex.Success),
  Error: hexToDecimal(colorsHex.Error),
  Warning: hexToDecimal(colorsHex.Warning),
}
