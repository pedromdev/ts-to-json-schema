import { toJsonSchema } from '@ts-to-json-schema/core';

enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue'
}
type ColorType = 'red' | 'green' | 'blue';
enum Order {
  Asc = 1,
  Desc = -1
}
type OrderType = 1 | -1;
enum Mixed {
  string = 'string',
  number = 1,
}
type MixedType = 'string' | 1;

[
  [toJsonSchema<Color>(), { type: 'string', enum: ['red', 'green', 'blue'] }],
  [toJsonSchema<ColorType>(), { type: 'string', enum: ['red', 'green', 'blue'] }],
  [toJsonSchema<Order>(), { type: 'number', enum: [1, -1] }],
  [toJsonSchema<OrderType>(), { type: 'number', enum: [1, -1] }],
  [toJsonSchema<Mixed>(), { enum: ['string', 1] }],
  [toJsonSchema<MixedType>(), { enum: ['string', 1] }],
];
