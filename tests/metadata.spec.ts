import { getTestCasesFromSourceFile } from "./utils/getTestCasesFromSourceFile";

describe('Metadata', () => {
  it('should metadata added to JSON schema', () => {
    const testCases = getTestCasesFromSourceFile('../metadata.sample.ts');

    for (const [actual, expected] of testCases) {
      expect(actual).toEqual(expected);
    }
  });
});
