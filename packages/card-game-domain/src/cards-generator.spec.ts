import { CardDeckType } from './models';
import { CardsGenerator } from './cards-generator';

describe('CardDecksService', () => {
  let service: CardsGenerator;

  beforeEach(() => {
    service = new CardsGenerator();
  });

  describe('generateCardCodes', () => {
    const twoToSixCardCodes = ['2D', '3C', '4H', '5S', '6D'];
    const sevenToAceCardCodes = ['7D', '8C', '9C', '10H', 'JD', 'QS', 'KH', 'AS'];

    const testCases: Array<{
      type: CardDeckType;
      expectedCardCodesLength: number;
      expectedCardCodes: string[];
      mustNotHaveCardCodes?: string[];
    }> = [
      {
        type: CardDeckType.Full,
        expectedCardCodesLength: 52,
        expectedCardCodes: [...twoToSixCardCodes, ...sevenToAceCardCodes],
      },
      {
        type: CardDeckType.Short,
        expectedCardCodesLength: 32,
        expectedCardCodes: sevenToAceCardCodes,
        mustNotHaveCardCodes: twoToSixCardCodes,
      },
    ];

    for (const {
      type,
      expectedCardCodesLength,
      expectedCardCodes,
      mustNotHaveCardCodes,
    } of testCases) {
      it(`CardCodes for ${JSON.stringify({
        type,
      })} has successfully generated`, () => {
        const cardCodes = service.generateCardCodes(type, false);

        expect(cardCodes.length).toBe(expectedCardCodesLength);
        expect(cardCodes).toEqual(expect.arrayContaining(expectedCardCodes));

        if (mustNotHaveCardCodes) {
          expect(cardCodes).not.toEqual(expect.arrayContaining(mustNotHaveCardCodes));
        }
      });
    }
  });

  describe('shuffled or not - same result', () => {
    const types: CardDeckType[] = [CardDeckType.Full, CardDeckType.Short];

    for (const type of types) {
      it(`CardCodes for ${JSON.stringify({
        type,
      })}`, () => {
        const cardCodes = service.generateCardCodes(type, false);
        const cardCodesShuffled = service.generateCardCodes(type, true);

        expect(cardCodes.length).toEqual(cardCodesShuffled.length);
        expect(cardCodes).not.toEqual(cardCodesShuffled);
        expect(cardCodes.sort()).toEqual(cardCodesShuffled.sort());
      });
    }
  });
});
