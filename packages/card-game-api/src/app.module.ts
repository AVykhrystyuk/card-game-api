import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateDeckController } from './create-deck/create-deck.controller';
import { DomainModule } from './domain.module';

@Module({
  imports: [DomainModule],
  controllers: [AppController, CreateDeckController],
  providers: [AppService],
})
export class AppModule {}
