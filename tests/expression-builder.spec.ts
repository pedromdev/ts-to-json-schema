import * as ts from 'typescript';
import { ExpressionBuilder } from "../packages/transform/src/expression.builder";

describe('ExpressionBuilder', () => {
  it('should build a simple expression', () => {
    const expression = ExpressionBuilder.build({
      a: true,
      b: false,
      c: null
    }) as ts.ObjectLiteralExpression;

    for (const property of expression.properties) {
      if (typeof property !== 'object' || property === null) continue;

      expect(property.kind).toBe(ts.SyntaxKind.PropertyAssignment);
      expect(['a', 'b', 'c']).toContain((property.name as any).text);
    }
  });
});
