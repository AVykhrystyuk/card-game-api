import {
  CardDecksStore,
  CardDecksStoreCardsRemoved,
  CardDecksStoreFilter,
  CardDeckStored,
} from './card-decks-store';

export class InMemoryCardDecksStore extends CardDecksStore {
  private readonly decks: CardDeckStored[] = [];

  async addDeck(deck: CardDeckStored): Promise<CardDeckStored> {
    this.decks.push(deck);
    return deck;
  }
  async getDeck({ deckId }: CardDecksStoreFilter): Promise<CardDeckStored> {
    return null as any as CardDeckStored;
  }
  async removeCards(
    { deckId }: CardDecksStoreFilter,
    numberOfCards: number,
  ): Promise<CardDecksStoreCardsRemoved> {
    return null as any as CardDecksStoreCardsRemoved;
  }
}
