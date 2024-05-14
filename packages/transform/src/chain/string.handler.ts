import { JsonSchema } from "@ts-to-json-schema/types";
import * as ts from 'typescript';
import { AbstractTransformHandler } from "./abstract-transform.handler";
import { CycleResolver } from "../cycle.resolver";

export class StringHandler extends AbstractTransformHandler {
  shouldTransform(type: ts.Type): boolean {
    return !!(type.flags & ts.TypeFlags.String);
  }

  transform(type: ts.Type): JsonSchema {
    return CycleResolver.ignore({type: 'string'});
  }
}
