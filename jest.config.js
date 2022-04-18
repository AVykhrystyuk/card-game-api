module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',

  // projects: [
  //   '<rootDir>/packages/card-game-api/*',
  //   '<rootDir>/packages/card-game-domain/*',
  // ],
  // https://stackoverflow.com/questions/70999527/where-to-configure-jest-in-a-monorepo
};
