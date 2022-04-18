import {
  CardDeckType,
  CardSuit,
  allCardSuits,
  getCardCode,
  cardNumbers2ToAce,
  cardNumbers7ToAce,
} from './models';
import { assertUnreachable, shuffle } from './utils';

export class CardsGenerator {
  constructor(private readonly shuffleFn = shuffle) {}

  generateCardCodes(type: CardDeckType, shuffled: boolean): string[] {
    const cardCodes = this.createCardCodes(type);

    if (shuffled) {
      this.shuffleFn(cardCodes);
    }
    return cardCodes;
  }

  private createCardCodes(type: CardDeckType): string[] {
    switch (type) {
      case CardDeckType.Full:
        return this.createCardCodesForSymmetricDeck(allCardSuits, cardNumbers2ToAce); // Poker52
      case CardDeckType.Short:
        return this.createCardCodesForSymmetricDeck(allCardSuits, cardNumbers7ToAce); // Poker32
      default:
        assertUnreachable(type);
    }
  }

  private createCardCodesForSymmetricDeck(
    cardSuits: readonly CardSuit[],
    cardNumbers: readonly number[],
  ): string[] {
    const cardCodes = [];
    for (const cardSuit of cardSuits) {
      for (const cardNumber of cardNumbers) {
        const cardCode = getCardCode(cardSuit, cardNumber);
        cardCodes.push(cardCode);
      }
    }
    return cardCodes;
  }
}
