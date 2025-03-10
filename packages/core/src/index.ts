import { JsonSchema, InferJsonSchema } from "@ts-to-json-schema/types";

function createSchema<T>(fn: (schema: InferJsonSchema<any>) => T) {
  return fn as any as T
}

export const toJsonSchema: <T>() => InferJsonSchema<T> = createSchema((schema) => <T>() => schema as unknown as InferJsonSchema<T>);
