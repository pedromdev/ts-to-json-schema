import { getTestCasesFromSourceFile } from "./utils/getTestCasesFromSourceFile";

describe('Date type', () => {
  it('should \'DATE\' be transformed to JSON schema', () => {
    const testCases = getTestCasesFromSourceFile('date.sample.ts');

    for (const [actual, expected] of testCases) {
      expect(actual).toEqual(expected);
    }
  });
});
