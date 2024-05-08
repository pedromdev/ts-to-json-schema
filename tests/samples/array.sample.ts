import { toJsonSchema } from '@ts-to-json-schema/core';

enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue'
}

[
  [toJsonSchema<string[]>(), { type: 'array', items: { type: 'string' } }],
  [toJsonSchema<Array<string>>(), { type: 'array', items: { type: 'string' } }],
  [toJsonSchema<number[]>(), { type: 'array', items: { type: 'number' } }],
  [toJsonSchema<Array<number>>(), { type: 'array', items: { type: 'number' } }],
  [toJsonSchema<boolean[]>(), { type: 'array', items: { type: 'boolean' } }],
  [toJsonSchema<Array<boolean>>(), { type: 'array', items: { type: 'boolean' } }],
  [toJsonSchema<null[]>(), { type: 'array', items: { type: 'null' } }],
  [toJsonSchema<Array<null>>(), { type: 'array', items: { type: 'null' } }],
  [toJsonSchema<any[]>(), { type: 'array', items: {} }],
  [toJsonSchema<Array<any>>(), { type: 'array', items: {} }],
  [toJsonSchema<Date[]>(), { type: 'array', items: { type: 'string', format: 'date-time' } }],
  [toJsonSchema<Array<Date>>(), { type: 'array', items: { type: 'string', format: 'date-time' } }],
  [toJsonSchema<Color[]>(), { type: 'array', items: { type: 'string', enum: ['red', 'green', 'blue'] }}],
  [toJsonSchema<Array<Color>>(), { type: 'array', items: { type: 'string', enum: ['red', 'green', 'blue'] }}],
];
