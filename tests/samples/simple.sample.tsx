import { toJsonSchema } from '@ts-to-json-schema/core';

[
  [toJsonSchema<string>(), { type: 'string' }],
]
