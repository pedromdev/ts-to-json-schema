# API Core

O pacote `@ts-to-json-schema/core` fornece a função principal para converter tipos TypeScript em JSON Schema.

## toJsonSchema

```typescript
function toJsonSchema<T>(): JsonSchema
```

A função principal que converte um tipo TypeScript em JSON Schema.

### Tipo Genérico

- `T`: O tipo TypeScript que você deseja converter em JSON Schema

### Retorno

Retorna um objeto `JsonSchema` que representa o tipo TypeScript fornecido.

### Exemplo Básico

```typescript
import { toJsonSchema } from '@ts-to-json-schema/core';

interface User {
  id: number;
  name: string;
  email: string;
}

const schema = toJsonSchema<User>();
```

### Exemplo com Tipos Complexos

```typescript
import { toJsonSchema } from '@ts-to-json-schema/core';

// Enum
enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

// Interface com tipos complexos
interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  metadata?: Record<string, unknown>;
  tags: string[];
  settings: {
    notifications: boolean;
    theme: 'light' | 'dark';
  };
}

const schema = toJsonSchema<User>();
```

O schema gerado incluirá:
```json
{
  "type": "object",
  "properties": {
    "id": { "type": "number" },
    "name": { "type": "string" },
    "email": { "type": "string" },
    "role": { 
      "type": "string",
      "enum": ["admin", "user"]
    },
    "metadata": {
      "type": "object",
      "additionalProperties": true
    },
    "tags": {
      "type": "array",
      "items": { "type": "string" }
    },
    "settings": {
      "type": "object",
      "properties": {
        "notifications": { "type": "boolean" },
        "theme": { 
          "type": "string",
          "enum": ["light", "dark"]
        }
      },
      "required": ["notifications", "theme"]
    }
  },
  "required": ["id", "name", "email", "role", "tags", "settings"]
}
```

### Tipos Suportados

- Tipos Primitivos
  - `string`
  - `number`
  - `boolean`
  - `null`
  - `undefined`
  
- Tipos Compostos
  - `interface`
  - `type`
  - `enum`
  - Arrays (`T[]`)
  - Tuplas (`[T, U]`)
  - Union Types (`T | U`)
  - Intersection Types (`T & U`)
  - Optional Properties (`?`)
  - Readonly Properties (`readonly`)
  - Generic Types
  - Utility Types (`Partial`, `Pick`, etc.)

### Considerações

- A função `toJsonSchema` deve ser usada com o transformador `@ts-to-json-schema/transform` configurado
- O schema é gerado em tempo de execução, mas os metadados são coletados em tempo de compilação
- Tipos genéricos devem ser totalmente resolvidos para gerar o schema corretamente 