import { Body, Controller, Post, Version } from '@nestjs/common';
import { IsEnum, IsBoolean, IsOptional, IsDefined } from 'class-validator';
import { CardDecksService } from '@card-game/domain';

export enum DeckTypeDto {
  Full = 'FULL',
  Short = 'SHORT',
}

export class CreateDeckRequestDto {
  @IsDefined()
  @IsEnum(DeckTypeDto)
  type: DeckTypeDto;

  @IsBoolean()
  @IsOptional()
  shuffled?: boolean;
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
