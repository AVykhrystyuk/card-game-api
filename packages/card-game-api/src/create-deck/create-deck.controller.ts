import { Body, Controller, Post, Version } from '@nestjs/common';
import { IsEnum, IsBoolean, IsOptional, IsDefined } from 'class-validator';

import { CardDecksService, CardDeckType } from '@card-game/domain';

export enum DeckTypeDto {
  Full = 'FULL',
  Short = 'SHORT',
}

const toCardDeckType = (type: DeckTypeDto) =>
  type === DeckTypeDto.Full ? CardDeckType.Full : CardDeckType.Short;

const toCardDeckTypeDto = (type: CardDeckType) =>
  type === CardDeckType.Full ? DeckTypeDto.Full : DeckTypeDto.Short;

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
  async createDeck(
    @Body() createDeckDto: CreateDeckRequestDto,
  ): Promise<CreateDeckResponseDto> {
    const deckCreated = await this.cardDecksService.createDeck(
      toCardDeckType(createDeckDto.type),
      createDeckDto.shuffled ?? false,
    );

    return {
      deckId: deckCreated.deckId,
      type: toCardDeckTypeDto(deckCreated.type),
      shuffled: deckCreated.shuffled,
      remaining: deckCreated.remaining,
    };
  }
}
