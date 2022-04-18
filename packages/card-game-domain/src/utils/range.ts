export function range(size: number, startAt = 0): number[] {
  const arrayFromZero = Array.from(Array(size).keys());
  return arrayFromZero.map((num) => num + startAt);
}
