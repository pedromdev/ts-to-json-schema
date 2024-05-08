import { getTestCasesFromSourceFile } from "./utils/getTestCasesFromSourceFile";

describe('Array type', () => {
  it('should \'ARRAY\' be transformed to JSON schema', () => {
    const testCases = getTestCasesFromSourceFile('array.sample.ts');

    for (const [actual, expected] of testCases) {
      expect(actual).toEqual(expected);
    }
  });
});
