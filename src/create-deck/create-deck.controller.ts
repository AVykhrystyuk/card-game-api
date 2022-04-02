import { Body, Controller, Post, Version } from '@nestjs/common';

@Controller()
export class CreateDeckController {
  @Version('1')
  @Post('decks')
  createDeck(@Body() req: CreateDeckRequestDto): CreateDeckResponseDto {
    return {
      deckId: 'sd',
      type: req.type,
      shuffled: req.shuffled ?? false,
      remaining: 52,
    };
  }
}

export const enum DeckTypeDto {
  Full = 'FULL',
  Short = 'SHORT',
}

export type CreateDeckRequestDto = {
  type: DeckTypeDto;
  shuffled?: boolean;
};

export type CreateDeckResponseDto = {
  deckId: string; // '521b0293-01f7-44c2-9990-27079eb2352d';
  type: DeckTypeDto;
  shuffled: boolean;
  remaining: number;
};
