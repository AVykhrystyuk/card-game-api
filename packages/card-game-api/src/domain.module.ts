import { Module, Provider } from '@nestjs/common';
import {
  CardDecksService,
  CardDecksStore,
  InMemoryCardDecksStore,
} from '@card-game/domain';

const providers: Provider<any>[] = [
  {
    provide: CardDecksService,
    useFactory: (store: CardDecksStore) => new CardDecksService(store),
    inject: [CardDecksStore],
  },
  { provide: CardDecksStore, useClass: InMemoryCardDecksStore },
];

@Module({
  imports: [],
  providers: providers,
  exports: providers,
})
export class DomainModule {}
