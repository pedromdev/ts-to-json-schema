import { toJsonSchema } from '@ts-to-json-schema/core';

enum SampleEnum {
  A = 1,
  B = 2,
  C = 3
}

enum SampleStringEnum {
  A = 'A',
  B = 'B',
  C = 'C'
}

enum SampleMixedEnum {
  A = 1,
  B = 'B',
  C = 3
}

interface Sample {
  name: string;
  age?: number;
  isDeveloper: boolean;
  createdAt: Date;
  enum: SampleEnum;
  stringEnum: SampleStringEnum;
  mixedEnum: SampleMixedEnum;
  question: 'yes' | 'no';
  order: -1 | 0 | 1;
  array: string[];
  union: string | number | boolean | null;
  intersection: { a: number } & { b: string };
  anyValue: any;
}

console.log = function () {};
console.log('Transforming Sample to JSON Schema...');

toJsonSchema<Sample>();
