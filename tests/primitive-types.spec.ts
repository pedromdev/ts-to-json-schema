import { getTestCasesFromSourceFile } from "./utils/getTestCasesFromSourceFile";

describe('Primitive types', () => {
  it('should primitive types be transformed to JSON schema', () => {
    const testCases = getTestCasesFromSourceFile('primitive-types.sample.ts');

    for (const [actual, expected] of testCases) {
      expect(actual).toEqual(expected);
    }
  });
});
