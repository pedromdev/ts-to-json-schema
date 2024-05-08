import { toJsonSchema } from '@ts-to-json-schema/core';

[
  [toJsonSchema<Date>(), { type: 'string', format: 'date-time' }],
];
