import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../app.module';
import {
  CreateDeckRequestDto,
  CreateDeckResponseDto,
  DeckTypeDto,
} from './create-deck.controller';
import { BuildTestApp } from '../utils/testing/build-test-app.e2e';

describe('CreateDeckController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await BuildTestApp({
      imports: [AppModule],
    });
  });

  describe('/v1/decks [POST]', () => {
    const endpoint = `/v1/decks`;
    const createDeck = (data?: object) =>
      request(app.getHttpServer()).post(endpoint).send(data);

    it(`Deck cannot be created without providing a type`, async () => {
      const requests = [createDeck(), createDeck({ x: 1, y: 2 })];

      const expectBadRequest = (request: request.Test) =>
        request.expect({
          statusCode: 400,
          message: [
            'type should not be null or undefined',
            'type must be a valid enum value',
          ],
          error: 'Bad Request',
        });

      await Promise.all(requests.map(expectBadRequest));
    });

    it(`Deck with 'Invalid' type cannot be created`, async () => {
      await createDeck({ type: 'Invalid' }).expect({
        statusCode: 400,
        message: ['type must be a valid enum value'],
        error: 'Bad Request',
      });
    });

    const successfulTestCases: Array<{
      request: CreateDeckRequestDto;
      expectedResponse: Partial<CreateDeckResponseDto>;
    }> = [
      {
        request: { type: DeckTypeDto.Full },
        expectedResponse: { remaining: 52 },
      },
      {
        request: { type: DeckTypeDto.Full, shuffled: true },
        expectedResponse: { remaining: 52 },
      },
      {
        request: { type: DeckTypeDto.Short },
        expectedResponse: { remaining: 32 },
      },
      {
        request: { type: DeckTypeDto.Short, shuffled: true },
        expectedResponse: { remaining: 32 },
      },
    ];

    for (const testCase of successfulTestCases) {
      it(`Deck for ${JSON.stringify(
        testCase.request,
      )} has successfully created`, async () => {
        const httpResponse = await createDeck(testCase.request).expect(201);
        const response: CreateDeckResponseDto = httpResponse.body;

        expect(response.deckId).toBeDefined();
        expect(response.type).toBe(testCase.request.type);
        expect(response.shuffled).toBe(testCase.request.shuffled ?? false);
        expect(response).toMatchObject(testCase.expectedResponse);
      });
    }
  });
});
