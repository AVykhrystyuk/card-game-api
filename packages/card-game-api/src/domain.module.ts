import { Module, Provider } from '@nestjs/common';
import {
  CardDecksService,
  CardDecksStore,
  InMemoryCardDecksStore,
  CardsGenerator,
} from '@card-game/domain';

const providers: Provider<any>[] = [
  {
    provide: CardDecksService,
    useFactory: (cardsGenerator: CardsGenerator, decksStore: CardDecksStore) =>
      new CardDecksService(cardsGenerator, decksStore),
    inject: [CardsGenerator, CardDecksStore],
  },
  CardsGenerator,
  { provide: CardDecksStore, useClass: InMemoryCardDecksStore },
];

@Module({
  imports: [],
  providers: providers,
  exports: providers,
})
export class DomainModule {}
