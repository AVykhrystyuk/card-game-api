import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../app.module';
import { CreateDeckRequestDto, DeckTypeDto } from './create-deck.controller';
import { BuildTestApp } from '../utils/testing/build-test-app.e2e';

describe('CreateDeckController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await BuildTestApp({
      imports: [AppModule],
    });
  });

  describe('/v1', () => {
    const version = 'v1';

    it('/decks [POST]', async () => {
      const requestDto: CreateDeckRequestDto = { type: DeckTypeDto.Full };

      const response = await request(app.getHttpServer())
        .post(`/${version}/decks`)
        .send(requestDto)
        .expect(201);

      expect(response.body.deckId).toBeDefined();
      expect(response.body).toMatchObject({ type: requestDto.type });
    });
  });
});
