import { CardDeckType, CardDeck } from './models';
import { CardDecksService } from './card-decks-service';

describe('CardDecksService', () => {
  let service: CardDecksService;

  beforeEach(async () => {
    service = new CardDecksService(null);
  });

  describe('v1', () => {
    const testCases: Array<{
      type: CardDeckType;
      shuffled: boolean;
      expectedRemaining: number;
    }> = [
      {
        type: CardDeckType.Full,
        shuffled: true,
        expectedRemaining: 52,
      },
      {
        type: CardDeckType.Short,
        shuffled: false,
        expectedRemaining: 36,
      },
    ];

    for (const { type, shuffled, expectedRemaining } of testCases) {
      it(`Deck for ${JSON.stringify({
        type,
        shuffled,
      })} has successfully created`, async () => {
        const cardDeck = await service.createDeck(type, shuffled);

        expect(cardDeck.deckId).toBeDefined();

        const expectedResponse: Partial<CardDeck> = {
          type,
          shuffled,
          remaining: expectedRemaining,
        };
        expect(cardDeck).toMatchObject(expectedResponse);
      });
    }
  });
});
