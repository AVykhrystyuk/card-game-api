export function swap<T>(arr: T[], x: number, y: number) {
  [arr[x], arr[y]] = [arr[y], arr[x]];
}
