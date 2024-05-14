import { toJsonSchema } from '@ts-to-json-schema/core';

interface Cycle {
  a: Cycle;
}

interface Cycle2 {
  b: Cycle;
}

[
  [toJsonSchema<Cycle>(), {
    type: 'object',
    properties: {
      a: {
        $ref: '#'
      }
    },
    required: ['a']
  }],
  [toJsonSchema<Cycle2>(), {
    type: 'object',
    properties: {
      b: {
        type: 'object',
        properties: {
          a: {
            $ref: '#/properties/b'
          }
        },
        required: ['a']
      }
    },
    required: ['b']
  }]
]
