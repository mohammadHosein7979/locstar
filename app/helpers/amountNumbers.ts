import { paymentUnit } from "../constants/strings";
import { numberWithSeparator } from "./numberWithSeparator";

export const amountNumbers = (amount: number): string => {
  return numberWithSeparator(amount) + " " + paymentUnit;
};
