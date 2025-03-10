import { JsonSchema, PrimitiveType } from "@ts-to-json-schema/types";
import * as ts from 'typescript';
import { AbstractTransformHandler } from "./abstract-transform.handler";
import { CycleResolver } from "../cycle.resolver";

export class BooleanHandler extends AbstractTransformHandler {
  shouldTransform(type: ts.Type): boolean {
    return !!(type.flags & ts.TypeFlags.Boolean);
  }

  transform(type: ts.Type, originSymbol?: ts.Symbol): JsonSchema {
    return CycleResolver.ignore(this.addMetadata({type: 'boolean' as PrimitiveType}, originSymbol));
  }
}
