import { JsonSchema } from "@ts-to-json-schema/types";
import * as ts from 'typescript';
import { AbstractTransformHandler } from "./abstract-transform.handler";

export class UnionHandler extends AbstractTransformHandler<ts.UnionType> {
  shouldTransform(type: ts.Type): boolean {
    return !!(type.flags & ts.TypeFlags.Union);
  }

  transform(type: ts.UnionType, originSymbol?: ts.Symbol): JsonSchema {
    const subtypes = type.types.filter(subtype => !(subtype.flags & ts.TypeFlags.Undefined));

    this.replaceBooleanLiterals(subtypes);
    this.reorderNullType(subtypes, type);

    const types: JsonSchema[] = subtypes.map(subtype => this.transformer.transform(subtype));

    const schema: JsonSchema = {
      anyOf: types,
    };

    return this.addMetadata(schema, originSymbol);
  }

  private replaceBooleanLiterals(subtypes: ts.Type[]) {
    const firstBooleanIndex = subtypes.findIndex(subtype => subtype.flags & ts.TypeFlags.BooleanLiteral);
    const typeChecker = this.transformer.typeChecker as any as { getBooleanType: () => ts.Type }; // workaround for missing method in type definition
    const booleanType = typeChecker.getBooleanType();

    if (firstBooleanIndex > -1) {
      subtypes.splice(firstBooleanIndex, 1, booleanType);

      while (subtypes.some(subtype => subtype.flags & ts.TypeFlags.BooleanLiteral)) {
        const booleanIndex = subtypes.findIndex(subtype => subtype.flags & ts.TypeFlags.BooleanLiteral);
        subtypes.splice(booleanIndex, 1);
      }
    }
  }

  private reorderNullType(subtypes: ts.Type[], type: ts.UnionType) {
    const typeString = this.transformer.typeChecker.typeToString(type, undefined, ts.TypeFormatFlags.InFirstTypeArgument);
    const nullIndex = typeString.split('|').map(t => t.trim()).indexOf('null');

    if (nullIndex > -1) {
      const originalNullIndex = subtypes.findIndex(subtype => subtype.flags & ts.TypeFlags.Null);
      const nullType = subtypes[originalNullIndex];

      subtypes.splice(originalNullIndex, 1);
      subtypes.splice(nullIndex, 0, nullType);
    }
  }
}
