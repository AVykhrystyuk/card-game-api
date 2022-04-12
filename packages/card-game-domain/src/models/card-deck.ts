import { Card } from './card';
import { CardDeckType } from './card-deck-type';

export type CardDeck = {
  deckId: string;
  type: CardDeckType;
  shuffled: boolean;
  remaining: number;
};

export type CardDeckWithCards = CardDeck & {
  cards: Card[];
};
