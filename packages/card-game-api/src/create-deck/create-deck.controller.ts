import { Body, Controller, Post, Version } from '@nestjs/common';
import { CardDecksService } from '@card-game/domain';

export class CreateDeckRequestDto {
  type: DeckTypeDto;
  shuffled?: boolean;
}

export const enum DeckTypeDto {
  Full = 'FULL',
  Short = 'SHORT',
}

export type CreateDeckResponseDto = {
  deckId: string; // '521b0293-01f7-44c2-9990-27079eb2352d';
  type: DeckTypeDto;
  shuffled: boolean;
  remaining: number;
};

@Controller()
export class CreateDeckController {
  constructor(private readonly cardDecksService: CardDecksService) {}

  @Version('1')
  @Post('decks')
  // TODO: add validation?
  createDeck(
    @Body() createDeckDto: CreateDeckRequestDto,
  ): CreateDeckResponseDto {
    this.cardDecksService.drawCards('1', 1);

    return {
      deckId: 'TODO: id',
      type: createDeckDto.type,
      shuffled: createDeckDto.shuffled ?? false,
      remaining:
        createDeckDto.type === DeckTypeDto.Full
          ? 52
          : createDeckDto.type === DeckTypeDto.Short
          ? 36
          : 0,
    };
  }
}