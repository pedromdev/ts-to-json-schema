import { getTestCasesFromSourceFile } from "./utils/getTestCasesFromSourceFile";

describe('Intersection type', () => {
  it('should \'INTERSECTION\' be transformed to JSON schema', () => {
    const testCases = getTestCasesFromSourceFile('intersection.sample.ts');

    for (const [actual, expected] of testCases) {
      expect(actual).toEqual(expected);
    }
  });
});
