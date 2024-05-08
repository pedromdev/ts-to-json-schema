import { toJsonSchema } from '@ts-to-json-schema/core';

interface iPokemon {
  name: string;
  type: string;
  trainer?: {
    name: string;
    age: number;
  };
}

class Pokemon {
  name!: string;
  type!: string;
  trainer?: {
    name: string;
    age: number;
  };
}

type PokemonObj = {
  name: string;
  type: string;
  trainer?: {
    name: string;
    age: number;
  };
};

type Empty = {};

[
  [toJsonSchema<Empty>(), { type: 'object' }],
  [toJsonSchema<iPokemon>(), {
    type: 'object',
    properties: {
      name: { type: 'string' },
      type: { type: 'string' },
      trainer: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          age: { type: 'number' }
        },
        required: ['name', 'age']
      }
    },
    required: ['name', 'type']
  }],
  [toJsonSchema<Pokemon>(), {
    type: 'object',
    properties: {
      name: { type: 'string' },
      type: { type: 'string' },
      trainer: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          age: { type: 'number' }
        },
        required: ['name', 'age']
      }
    },
    required: ['name', 'type']
  }],
  [toJsonSchema<PokemonObj>(), {
    type: 'object',
    properties: {
      name: { type: 'string' },
      type: { type: 'string' },
      trainer: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          age: { type: 'number' }
        },
        required: ['name', 'age']
      }
    },
    required: ['name', 'type']
  }],
];
