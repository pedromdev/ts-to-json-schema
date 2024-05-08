import { getTestCasesFromSourceFile } from "./utils/getTestCasesFromSourceFile";

describe('Class or Object type', () => {
  it('should \'OBJECT\' be transformed to JSON schema', () => {
    const testCases = getTestCasesFromSourceFile('object.sample.ts');

    for (const [actual, expected] of testCases) {
      expect(actual).toEqual(expected);
    }
  });
});
