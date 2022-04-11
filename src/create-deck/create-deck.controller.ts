import { Body, Controller, Post, Version } from '@nestjs/common';

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
  @Version('1')
  @Post('decks')
  // TODO: add validation?
  createDeck(
    @Body() createDeckDto: CreateDeckRequestDto,
  ): CreateDeckResponseDto {
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
