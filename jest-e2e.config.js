module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'packages/card-game-api/src',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
