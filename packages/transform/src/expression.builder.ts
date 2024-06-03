import * as ts from 'typescript';
import { TypescriptAdapter } from './typescript.adapter';

export class ExpressionBuilder {
  private static readonly typescriptFactory = new TypescriptAdapter();

  public static build(value: any): ts.Expression {
    if (typeof value === 'string') {
      return this.typescriptFactory.stringLiteral(value);
    } else if (typeof value === 'number') {
      return this.typescriptFactory.numericLiteral(value);
    } else if (typeof value === 'boolean') {
      return this.typescriptFactory.booleanLiteral(value);
    } else if (Array.isArray(value)) {
      return this.typescriptFactory.arrayLiteral(value.map(v => this.build(v)));
    } else if (typeof value === 'object' && value !== null) {
      const properties = Object.keys(value)
        .filter((key) => value[key] !== undefined)
        .map((key) => {
          return this.typescriptFactory.propertyAssignment(
            key,
            this.build(value[key]),
          );
        });

      return this.typescriptFactory.objectLiteral(properties);
    }

    return this.typescriptFactory.null();
  }
}
