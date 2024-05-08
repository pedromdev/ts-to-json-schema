import { getTestCasesFromSourceFile } from "./utils/getTestCasesFromSourceFile";

describe('Enum type', () => {
  it('should \'ENUM\' be transformed to JSON schema', () => {
    const testCases = getTestCasesFromSourceFile('enum.sample.ts');

    for (const [actual, expected] of testCases) {
      expect(actual).toEqual(expected);
    }
  });
});
