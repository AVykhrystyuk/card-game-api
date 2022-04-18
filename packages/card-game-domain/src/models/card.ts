import { range } from '../utils';
import { CardSuit } from './card-suit';

export type Card = {
  value: string;
  suit: CardSuit;
  code: string;
};

export const cardValues = {
  jack: 'JACK',
  queen: 'QUEEN',
  king: 'KING',
  ace: 'ACE',
};

export const cardValueByNumber: Record<number, string | undefined> = {
  11: cardValues.jack,
  12: cardValues.queen,
  13: cardValues.king,
  14: cardValues.ace,
};

// TODO: used?
export function getCardValueByCardNumber(number: number): string {
  const cardValue = cardValueByNumber[number];
  if (cardValue !== undefined) {
    return cardValue;
  }

  return number.toString();
}

export function getCardCode(suit: CardSuit, number: number): string {
  const suitSign = suit.charAt(0);

  const cardValue = cardValueByNumber[number];
  if (cardValue !== undefined) {
    return cardValue.charAt(0) + suitSign;
  }
  return number.toString() + suitSign;
}

export const cardNumbers2ToAce: readonly number[] = range(13, 2);
export const cardNumbers7ToAce: readonly number[] = range(8, 7);
