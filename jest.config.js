/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cache: false,
  moduleDirectories: ['node_modules', 'packages'],
  collectCoverageFrom: ['packages/compiler/**/*.ts'],
  coveragePathIgnorePatterns: ['packages/.*/dist/'],
  transform: {
    '^.+\\.spec\\.tsx?$': [
      'ts-jest',
      {
        compiler: 'ts-patch/compiler',
        tsconfig: 'tsconfig.spec.json',
      },
    ],
  },
};
