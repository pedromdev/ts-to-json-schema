import { toJsonSchema } from '@ts-to-json-schema/core';

[
  [toJsonSchema<string>(), { type: 'string' }],
  [toJsonSchema<number>(), { type: 'number' }],
  [toJsonSchema<boolean>(), { type: 'boolean' }],
  [toJsonSchema<null>(), { type: 'null' }],
  [toJsonSchema<any>(), {}],
];
