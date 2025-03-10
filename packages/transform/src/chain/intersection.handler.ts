import { JsonSchema } from "@ts-to-json-schema/types";
import * as ts from 'typescript';
import { AbstractTransformHandler } from "./abstract-transform.handler";

export class IntersectionHandler extends AbstractTransformHandler<ts.IntersectionType> {
  shouldTransform(type: ts.Type): boolean {
    return !!(type.flags & ts.TypeFlags.Intersection);
  }

  transform(type: ts.IntersectionType, originSymbol?: ts.Symbol): JsonSchema {
    const types: JsonSchema[] = type.types
      .filter(subtype => !(subtype.flags & ts.TypeFlags.Undefined))
      .map(subtype => this.transformer.transform(subtype));
    
    const schema: JsonSchema = {
      allOf: types,
    };

    return this.addMetadata(schema, originSymbol);
  }
}
