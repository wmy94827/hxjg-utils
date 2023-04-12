// jest.config.ts

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
//   testMatch: ['<rootDir>/test/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{ts,js}'],
  coverageReporters: ['text-summary', 'lcov'],
};
