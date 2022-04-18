import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppConfigService } from './app-config.service';
import { CreateDeckController } from './create-deck/create-deck.controller';
import { DomainModule } from './domain.module';

@Module({
  imports: [
    DomainModule,
    ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true }),
  ],
  controllers: [AppController, CreateDeckController],
  providers: [AppConfigService],
})
export class AppModule {}
