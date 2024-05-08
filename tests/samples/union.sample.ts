import { toJsonSchema } from '@ts-to-json-schema/core';

[
  [toJsonSchema<string | number>(), { anyOf : [{ type: 'string' }, { type: 'number' }] }],
  [toJsonSchema<string | number | boolean>(), { anyOf : [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }] }],
  [toJsonSchema<string | number | boolean | null>(), { anyOf : [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }, { type: 'null' }] }],
  [toJsonSchema<string | number | boolean | any>(), {}],
  [toJsonSchema<string | number | boolean | Date | null>(), { anyOf : [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }, { type: 'string', format: 'date-time' }, { type: 'null' }] }],
];
