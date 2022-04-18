import { getRandomInt as random } from './random';
import { swap } from './swap';

export function shuffle<T>(itemsToShuffle: T[], randomInt = random): void {
  for (let i = itemsToShuffle.length - 1; i >= 0; i--) {
    const randomIndex = randomInt(0, i + 1);
    swap(itemsToShuffle, randomIndex, i);
  }
}
