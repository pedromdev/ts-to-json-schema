import { JsonSchema } from "@ts-to-json-schema/types";
import * as ts from "typescript";
import { TransformChain } from "./chain/chain";

export class SchemaTransformer {
  private readonly handlers = this.transformChain.map(Handler => new Handler(this));

  constructor(
    public readonly typeChecker: ts.TypeChecker,
    public readonly node: ts.TypeNode,
    private readonly transformChain: TransformChain,
  ) {}

  transform(type: ts.Type): JsonSchema {
    const handler = this.handlers.find(handler => handler.shouldTransform(type));

    return handler ? handler.transform(type) : {};
  }
}
