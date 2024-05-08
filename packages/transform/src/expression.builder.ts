import * as ts from 'typescript';

export class ExpressionBuilder {
  public static build(value: any): ts.Expression {
    if (typeof value === 'string') {
      return ts.factory.createStringLiteral(value);
    } else if (typeof value === 'number') {
      return value < 0
        ? ts.factory.createPrefixUnaryExpression(
          ts.SyntaxKind.MinusToken,
          ts.factory.createNumericLiteral(-value),
        )
        : ts.factory.createNumericLiteral(value);
    } else if (typeof value === 'boolean') {
      return value ? ts.factory.createTrue() : ts.factory.createFalse();
    } else if (Array.isArray(value)) {
      return ts.factory.createArrayLiteralExpression(value.map(v => this.build(v)));
    } else if (typeof value === 'object') {
      const properties = Object.keys(value)
        .filter((key) => value[key] !== undefined)
        .map((key) => {
          return ts.factory.createPropertyAssignment(
            ts.factory.createStringLiteral(key),
            this.build(value[key]),
          );
        });

      return ts.factory.createObjectLiteralExpression(properties);
    }

    return ts.factory.createNull();
  }
}
