import { JsonSchema } from "@ts-to-json-schema/types";
import * as ts from "typescript";
import { AbstractTransformHandler } from "./abstract-transform.handler";
import { CycleResolver } from "../cycle.resolver";


export class AnyHandler extends AbstractTransformHandler {
  shouldTransform(type: ts.Type): boolean {
    return !!(type.flags & ts.TypeFlags.Any);
  }

  transform(type: ts.Type, originSymbol?: ts.Symbol): JsonSchema {
    const schema: JsonSchema = {};
    return CycleResolver.ignore(this.addMetadata(schema, originSymbol));
  }

}
