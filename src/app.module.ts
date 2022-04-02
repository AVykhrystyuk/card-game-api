import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateDeckController } from './create-deck/create-deck.controller';

@Module({
  imports: [],
  controllers: [AppController, CreateDeckController],
  providers: [AppService],
})
export class AppModule {}
