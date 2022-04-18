import { validate } from 'uuid';

import { CardDeckType, CardDeck } from './models';
import { CardDecksService } from './card-decks-service';
import { CardsGenerator } from './cards-generator';
import { CardDecksStore } from './storages';

const cast = <T>(obj: Partial<T>) => obj as T;

describe('CardDecksService', () => {
  let service: CardDecksService;
  let cardsGeneratorMock: CardsGenerator;
  let cardDecksStoreMock: CardDecksStore;

  beforeEach(() => {
    cardsGeneratorMock = cast<CardsGenerator>({});

    cardDecksStoreMock = cast<CardDecksStore>({
      addDeck: async (deck) => deck,
    });

    service = new CardDecksService(cardsGeneratorMock, cardDecksStoreMock);
  });

  describe('createDeck', () => {
    const testCases: Array<{
      type: CardDeckType;
      expectedRemaining: number;
    }> = [
      {
        type: CardDeckType.Full,
        expectedRemaining: 2,
      },
      {
        type: CardDeckType.Short,
        expectedRemaining: 1,
      },
    ];

    for (const { type, expectedRemaining } of testCases) {
      it(`Deck for ${JSON.stringify({
        type,
      })} has successfully created`, async () => {
        // Arrange
        cardsGeneratorMock.generateCardCodes = jest
          .fn()
          .mockReturnValueOnce(Array(expectedRemaining));

        jest.spyOn(cardDecksStoreMock, 'addDeck');

        // Act
        const cardDeck = await service.createDeck(type, false);

        // Assert
        expect(cardDecksStoreMock.addDeck).toHaveBeenCalled();
        expect(validate(cardDeck.deckId)).toBeTruthy();
        expect(cardDeck).toMatchObject<Partial<CardDeck>>({
          type,
          remaining: expectedRemaining,
        });

        jest.restoreAllMocks();
      });
    }
  });
});
