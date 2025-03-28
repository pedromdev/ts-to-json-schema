import { JsonSchema, PrimitiveType } from "@ts-to-json-schema/types";
import * as ts from 'typescript';
import { AbstractTransformHandler } from "./abstract-transform.handler";

export class ArrayHandler extends AbstractTransformHandler<ts.TypeReference> {
  shouldTransform(type: ts.Type): boolean {
    const typeChecker = this.transformer.typeChecker as any as { isArrayLikeType: (type: ts.Type) => boolean }; // workaround for missing method in type definition
    return typeChecker.isArrayLikeType(type);
  }

  transform(type: ts.TypeReference, originSymbol?: ts.Symbol): JsonSchema {
    const arrayType = this.transformer.typeChecker.getTypeArguments(type)[0];
    const schema: JsonSchema = {
      type: 'array' as PrimitiveType,
      items: this.transformer.transform(arrayType),
    };
    
    return this.addMetadata(schema, originSymbol);
  }
}
