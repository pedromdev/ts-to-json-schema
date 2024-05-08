import { JsonSchema } from "@ts-to-json-schema/types";
import * as ts from "typescript";
import { AbstractTransformHandler } from "./abstract-transform.handler";


export class AnyHandler extends AbstractTransformHandler {
  shouldTransform(type: ts.Type): boolean {
    return !!(type.flags & ts.TypeFlags.Any);
  }

  transform(type: ts.Type): JsonSchema {
    return {};
  }

}
