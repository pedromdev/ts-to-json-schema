# Começando com TS to JSON Schema

O TS to JSON Schema é uma biblioteca que permite converter tipos TypeScript em JSON Schema de forma dinâmica, sem a necessidade de geradores de código ou ferramentas CLI.

## Pré-requisitos

- TypeScript 4.1 ou superior
- Node.js 12 ou superior

## Instalação Rápida

```bash
# Usando npm
npm install @ts-to-json-schema/core
npm install --save-dev typescript @ts-to-json-schema/transform ts-patch

# Usando yarn
yarn add @ts-to-json-schema/core
yarn add -D typescript @ts-to-json-schema/transform ts-patch
```

## Exemplo Básico

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

O código acima irá gerar o seguinte JSON Schema:

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

## Próximos Passos

- Leia o [guia de instalação](/pt-BR/guide/installation) para uma configuração detalhada
- Entenda [como funciona](/pt-BR/guide/how-it-works) a biblioteca
- Explore a [documentação da API](/pt-BR/api/core) para recursos avançados 