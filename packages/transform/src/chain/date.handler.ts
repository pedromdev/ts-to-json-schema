import { JsonSchema, PrimitiveType } from "@ts-to-json-schema/types";
import * as ts from "typescript";
import { AbstractTransformHandler } from "./abstract-transform.handler";
import { CycleResolver } from "../cycle.resolver";

export class DateHandler extends AbstractTransformHandler {
  shouldTransform(type: ts.Type): boolean {
    return type.symbol?.getName() === "Date";
  }

  transform(type: ts.Type, originSymbol?: ts.Symbol): JsonSchema {
    const schema: JsonSchema = {
      type: "string" as PrimitiveType,
      format: "date-time",
    };
    
    return CycleResolver.ignore(this.addMetadata(schema, originSymbol));
  }
}
