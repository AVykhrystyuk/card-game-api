// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function assertUnreachable(_: never): never {
  throw new Error('This unreachable error should never happen');
}
