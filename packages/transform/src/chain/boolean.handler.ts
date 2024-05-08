import { JsonSchema } from "@ts-to-json-schema/types";
import * as ts from 'typescript';
import { AbstractTransformHandler } from "./abstract-transform.handler";

export class BooleanHandler extends AbstractTransformHandler {
  shouldTransform(type: ts.Type): boolean {
    return !!(type.flags & ts.TypeFlags.Boolean);
  }

  transform(type: ts.Type): JsonSchema {
    return {type: 'boolean'};
  }
}
