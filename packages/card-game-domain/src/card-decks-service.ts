import { v4 as newUUID } from 'uuid';

import { CardDeckType, CardDeck, Card, CardDeckWithCards } from './models';
import { CardsGenerator } from './cards-generator';
import { CardDecksStore, CardDeckStored } from './storages';

export class CardDecksService {
  constructor(
    private readonly cardsGenerator: CardsGenerator,
    private readonly decksStore: CardDecksStore,
  ) {}

  async createDeck(type: CardDeckType, shuffled: boolean): Promise<CardDeck> {
    const deckId = newUUID();

    const cardDeckStored = await this.decksStore.addDeck({
      deckId,
      type,
      shuffled,
      cardCodes: this.cardsGenerator.generateCardCodes(type, shuffled),
    });

    return this.storedToCardDeck(cardDeckStored);
  }

  async getDeck(deckId: string): Promise<CardDeckWithCards> {
    const { type, shuffled, cardCodes } = await this.decksStore.getDeck({
      deckId,
    });

    return {
      deckId,
      type,
      shuffled,
      remaining: cardCodes.length,
      cards: this.cardCodesToCards(cardCodes),
    };
  }

  async drawCards(deckId: string, numberOfCards: number): Promise<Card[]> {
    const { removedCardCodes } = await this.decksStore.removeCards(
      { deckId },
      numberOfCards,
    );
    return this.cardCodesToCards(removedCardCodes);
  }

  private cardCodesToCards(cardCodes: string[]): Card[] {
    // TODO:
    return [];
  }

  private storedToCardDeck({
    deckId,
    shuffled,
    type,
    cardCodes,
  }: CardDeckStored): CardDeck {
    return {
      deckId,
      shuffled,
      type,
      remaining: cardCodes.length,
    };
  }
}
