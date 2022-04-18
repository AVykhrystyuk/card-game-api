import { CardDeckType } from '../models';

export type CardDecksStoreFilter = { deckId: string };
export type CardDecksStoreCardsRemoved = { removedCardCodes: string[] };

export type CardDeckStored = {
  deckId: string; // "521b0293-01f7-44c2-9990-27079eb2352d",
  type: CardDeckType;
  shuffled: boolean;
  cardCodes: string[]; // ["AS", "KH", "8C"],
};

export abstract class CardDecksStore {
  abstract addDeck(deck: CardDeckStored): Promise<CardDeckStored>;
  abstract getDeck(filter: CardDecksStoreFilter): Promise<CardDeckStored>;
  abstract removeCards(
    filter: CardDecksStoreFilter,
    numberOfCards: number,
  ): Promise<CardDecksStoreCardsRemoved>;
}
