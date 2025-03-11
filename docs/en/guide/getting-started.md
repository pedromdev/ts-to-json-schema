# Getting Started with TS to JSON Schema

TS to JSON Schema is a library that allows you to convert TypeScript types to JSON Schema dynamically, without the need for code generators or CLI tools.

## Prerequisites

- TypeScript 4.1 or higher
- Node.js 12 or higher

## Quick Installation

```bash
# Using npm
npm install @ts-to-json-schema/core
npm install --save-dev typescript @ts-to-json-schema/transform ts-patch

# Using yarn
yarn add @ts-to-json-schema/core
yarn add -D typescript @ts-to-json-schema/transform ts-patch
```

## Basic Example

```typescript
import { toJsonSchema } from '@ts-to-json-schema/core';

interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

const schema = toJsonSchema<User>();
console.log(schema);
```

The code above will generate the following JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "id": { "type": "number" },
    "name": { "type": "string" },
    "email": { "type": "string" },
    "age": { "type": "number" }
  },
  "required": ["id", "name", "email"]
}
```

## Next Steps

- Read the [installation guide](/en/guide/installation) for detailed setup
- Understand [how it works](/en/guide/how-it-works)
- Explore the [API documentation](/en/api/core) for advanced features 