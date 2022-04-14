import { CardDeckType, CardDeck, Card, CardDeckWithCards } from './models';

export class CardDecksService {
  constructor(
    // private readonly cardsGenerator: CardsGenerator,
    private readonly decksStore: CardDecksStore, // private readonly cardsStore: CardsStore,
  ) {}

  async createDeck(type: CardDeckType, shuffled: boolean): Promise<CardDeck> {
    // const deckId = 'TODO: id';
    // // transaction?
    // await this.decksStore.addDeck({
    //   deckId,
    //   type,
    //   shuffled,
    // });
    // const cardCodes = this.cardsGenerator.generateCardCodes(type, shuffled);
    // await this.cardsStore.assignCardCodes(deckId, cardCodes);
    return {
      deckId: 'TODO: id',
      type,
      shuffled: shuffled,
      remaining:
        type === CardDeckType.Full ? 52 : type === CardDeckType.Short ? 36 : 0,
    };
  }

  async getDeck(deckId: string): Promise<CardDeckWithCards> {
    const deckDAL = await this.decksStore.getDeck({
      deckId,
    });

    // TODO:
    return { ...deckDAL, remaining: 0, cards: [] };
  }

  async drawCards(deckId: string, numberOfCards: number): Promise<Card[]> {
    return [];
  }
}
/*
{
    "deckId": "521b0293-01f7-44c2-9990-27079eb2352d",
    "type": "FULL",
    "shuffled": true,
    "cardCodes": ["AS", "KH", "8C"],
*/
// instead of [user1, user2]
// user-1 {}
// user-2 {}

// deck-1-cardCode-1 - {}
// deck-1-cardCode-2 - {}
// deck-2-cardCode-1 - {}

export class CardsGenerator {
  generateCardCodes(type: CardDeckType, shuffled: boolean): string[] {
    return [];
  }
  // generateCards(type: CardDeckType, shuffled: boolean): Card[] {
  //   return [];
  // }
}

export abstract class CardDecksStore {
  abstract addDeck(deck: CardDeckDAL): Promise<void>;
  abstract getDeck(filter: { deckId: string }): Promise<CardDeckDAL>;
}

export class InMemoryCardDecksStore extends CardDecksStore {
  async addDeck(deck: CardDeckDAL): Promise<void> {
    return null;
  }
  async getDeck(filter: { deckId: string }): Promise<CardDeckDAL> {
    return null;
  }
}

export type CardDeckDAL = {
  deckId: string; // "521b0293-01f7-44c2-9990-27079eb2352d",
  type: CardDeckType;
  shuffled: boolean;
  // cardCodes: string[]; // ["AS", "KH", "8C"],
};

// via deckId
export abstract class CardsStore {
  // createDeck(type: CardDeckType, shuffled?: boolean): CardDeck {
  //   return null;
  // }
}
