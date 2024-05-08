import { getTestCasesFromSourceFile } from "./utils/getTestCasesFromSourceFile";

describe('Union type', () => {
  it('should \'UNION\' of String be transformed to JSON schema', () => {
    const testCases = getTestCasesFromSourceFile('union.sample.ts');

    for (const [actual, expected] of testCases) {
      expect(actual).toEqual(expected);
    }
  });
});
