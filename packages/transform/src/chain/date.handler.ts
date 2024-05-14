import { JsonSchema } from "@ts-to-json-schema/types";
import * as ts from "typescript";
import { AbstractTransformHandler } from "./abstract-transform.handler";
import { CycleResolver } from "../cycle.resolver";

export class DateHandler extends AbstractTransformHandler {
  shouldTransform(type: ts.Type): boolean {
    return type.symbol?.getName() === "Date";
  }

  transform(type: ts.Type): JsonSchema {
    return CycleResolver.ignore({
      type: "string",
      format: "date-time",
    });
  }
}
