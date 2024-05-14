import { getTestCasesFromSourceFile } from "./utils/getTestCasesFromSourceFile";

describe('Cycle types', () => {
  it('should \'CYCLE TYPE\' be transformed to JSON schema', () => {
    const testCases = getTestCasesFromSourceFile('cycle.sample.ts');

    for (const [actual, expected] of testCases) {
      expect(actual).toEqual(expected);
    }
  });
});
