import { Test } from '@nestjs/testing';

import { CreateDeckController, DeckTypeDto } from './create-deck.controller';

describe('CreateDeckController', () => {
  let controller: CreateDeckController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CreateDeckController],
    }).compile();

    controller = module.get(CreateDeckController);
  });

  describe('v1', () => {
    it('should return "Hello World!"', () => {
      const response = controller.createDeck({ type: DeckTypeDto.Full });

      expect(response.deckId).toBeDefined();

      expect(response).toMatchObject({
        type: DeckTypeDto.Full,
      });
    });
  });
});
