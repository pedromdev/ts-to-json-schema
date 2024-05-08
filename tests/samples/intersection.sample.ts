import { toJsonSchema } from '@ts-to-json-schema/core';

type Obj1 = {
  name: string;
  age: number;
};

type Obj2 = {
  created: Date;
  updated: Date;
};

[
  [toJsonSchema<Obj1 & Obj2>(), {
    allOf: [
      {
        type: 'object',
        properties: {
          name: { type: 'string' },
          age: { type: 'number' }
        },
        required: ['name', 'age']
      },
      {
        type: 'object',
        properties: {
          created: { type: 'string', format: 'date-time' },
          updated: { type: 'string', format: 'date-time' }
        },
        required: ['created', 'updated']
      }
    ]
  }],
];
