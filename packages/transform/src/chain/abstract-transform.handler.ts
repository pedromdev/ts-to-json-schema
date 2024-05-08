import { JsonSchema } from "@ts-to-json-schema/types";
import * as ts from 'typescript';
import { SchemaTransformer } from "../schema.transformer";

export abstract class AbstractTransformHandler<T extends ts.Type = ts.Type> {
  constructor(protected readonly transformer: SchemaTransformer) {}

  abstract shouldTransform(type: ts.Type): boolean;
  abstract transform(type: T): JsonSchema;

}
