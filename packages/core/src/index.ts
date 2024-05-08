import { JsonSchema } from "@ts-to-json-schema/types";

function createSchema<T>(fn: (schema: JsonSchema) => T) {
  return fn as any as T
}

export const toJsonSchema: <T>() => JsonSchema  = createSchema((schema) => <T>() => schema);
