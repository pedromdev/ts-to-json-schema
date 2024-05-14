import { JsonSchema } from "@ts-to-json-schema/types";

export class CycleResolver {
  static ignore(value: any) {
    return new SkipCycle(value);
  }

  static parse(object: JsonSchema): JsonSchema {
    "use strict";
    const objects = new WeakMap();

    return (function derez(value: JsonSchema, path: string): any {
      if (value instanceof SkipCycle) {
        return value.value;
      }

      if (
        typeof value === "object"
        && value !== null
        && !(value instanceof Boolean)
        && !(value instanceof Date)
        && !(value instanceof Number)
        && !(value instanceof RegExp)
        && !(value instanceof String)
      ) {
        const oldPath = objects.get(value);

        if (oldPath !== undefined) {
          return {$ref: oldPath};
        }

        objects.set(value, path);

        if (Array.isArray(value)) {
          return value.map((element, i) => derez(element, path + "[" + i + "]"));
        } else {
          return Object.keys(value).reduce((acc, name) => ({
            ...acc,
            [name]: derez(
              value[name],
              path + "/" + name
            ),
          }), {} as Record<string, any>);
        }
      }
      return value;
    }(object, "#"));
  }
}

class SkipCycle {
  constructor(public readonly value: any) {}
}
