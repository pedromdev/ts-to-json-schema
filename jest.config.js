/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cache: false,
  moduleDirectories: ['node_modules', 'packages'],
  collectCoverageFrom: ['packages/transform/**/*.ts', 'packages/esbuild-plugin/**/*.ts'],
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
