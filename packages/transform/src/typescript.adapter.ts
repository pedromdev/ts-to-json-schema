import * as ts from 'typescript';

export class TypescriptAdapter {
  private readonly useFactory = /^v?([45])/.test(ts.version);
  private readonly ts = ts as any;

  constructor(private readonly typeChecker?: ts.TypeChecker) {}

  public stringLiteral(text: string): ts.StringLiteral {
    return this.useFactory
      ? this.ts.factory.createStringLiteral(text)
      : this.ts.createStringLiteral(text);
  }

  public numericLiteral(value: number): ts.NumericLiteral {
    const absValue = Math.abs(value);
    const numeric = this.useFactory
      ? this.ts.factory.createNumericLiteral(absValue)
      : this.ts.createNumericLiteral(absValue.toString());

    if (value < 0) {
      return this.useFactory
        ? this.ts.factory.createPrefixUnaryExpression(ts.SyntaxKind.MinusToken, numeric)
        : this.ts.createPrefix(ts.SyntaxKind.MinusToken, numeric);
    }

    return numeric;
  }

  public booleanLiteral(value: boolean): ts.BooleanLiteral {
    return value
      ? this.useFactory
        ? this.ts.factory.createTrue()
        : this.ts.createTrue()
      : this.useFactory
        ? this.ts.factory.createFalse()
        : this.ts.createFalse();
  }

  public arrayLiteral(values: ts.Expression[]): ts.ArrayLiteralExpression {
    return this.useFactory
      ? this.ts.factory.createArrayLiteralExpression(values)
      : this.ts.createArrayLiteral(values);
  }

  public objectLiteral(properties: ts.ObjectLiteralElementLike[]): ts.ObjectLiteralExpression {
    return this.useFactory
      ? this.ts.factory.createObjectLiteralExpression(properties)
      : this.ts.createObjectLiteral(properties);
  }

  public propertyAssignment(name: string, value: ts.Expression): ts.PropertyAssignment {
    return this.useFactory
      ? this.ts.factory.createPropertyAssignment(this.stringLiteral(name), value)
      : this.ts.createPropertyAssignment(this.stringLiteral(name), value);
  }

  public null(): ts.NullLiteral {
    return this.useFactory
      ? this.ts.factory.createNull()
      : this.ts.createNull();
  }

  public createCallExpression(expression: ts.Expression, typeArguments: readonly ts.TypeNode[] | undefined, argumentsArray: readonly ts.Expression[] | undefined): ts.CallExpression {
    return this.useFactory
      ? this.ts.factory.createCallExpression(expression, typeArguments, argumentsArray)
      : this.ts.createCall(expression, typeArguments, argumentsArray);
  }

  public updateCallExpression(node: ts.CallExpression, expression: ts.Expression, typeArguments: readonly ts.TypeNode[] | undefined, argumentsArray: readonly ts.Expression[]): ts.CallExpression {
    return this.useFactory
      ? this.ts.factory.updateCallExpression(node, expression, typeArguments, argumentsArray)
      : this.ts.updateCall(node, expression, typeArguments, argumentsArray);
  }

  public getJSDocComment(symbol: ts.Symbol): string {
    return ts.displayPartsToString(symbol.getDocumentationComment(this.typeChecker));
  }

  public getJSDocTags(symbol: ts.Symbol): ts.JSDocTagInfo[] | undefined {
    return symbol.getJsDocTags();
  }
  
  public getJSDocTagText(tag: ts.JSDocTagInfo): string {
    if (!tag.text || tag.text.length === 0) {
      return '';
    }
    
    // Concatenar todas as partes do texto da tag
    return tag.text.map(part => part.text).join('');
  }
}
