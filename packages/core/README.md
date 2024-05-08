# `@ts-to-json-schema/core`

> Core functions for TypeScript to JSON Schema

## Installation

```bash
npm install @ts-to-json-schema/core
npm install --save-dev typescript @ts-to-json-schema/transform ts-patch
```

## Configuration

```json
{
  "compilerOptions": {
    // ...
    "plugins": [
      { "transform": "@ts-to-json-schema/compiler", "type": "program" }
    ]
  }
}
```

**Obs:** Follow the instructions in the [@ts-to-json-schema/transform](../transform/README.md) to configure in your bundler.

## Usage

```typescript
import { toJsonSchema } from "@ts-to-json-schema/core";

interface MyType {
  foo: string;
  bar?: number;
}

const schema = toJsonSchema<MyType>();

console.log(schema);

/*
* Output:
* {
*   type: 'object',
*   properties: {
*     foo: { type: 'string' },
*     bar: { type: 'number' }
*   },
*   required: ['foo']
* }
 */
```
