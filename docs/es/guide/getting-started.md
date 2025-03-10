# Empezando con TS to JSON Schema

TS to JSON Schema es una biblioteca que te permite convertir tipos TypeScript a JSON Schema de forma dinámica, sin necesidad de generadores de código o herramientas CLI.

## Requisitos Previos

- TypeScript 3.7 o superior
- Node.js 12 o superior

## Instalación Rápida

```bash
# Usando npm
npm install @ts-to-json-schema/core
npm install --save-dev typescript @ts-to-json-schema/transform ts-patch

# Usando yarn
yarn add @ts-to-json-schema/core
yarn add -D typescript @ts-to-json-schema/transform ts-patch
```

## Ejemplo Básico

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

El código anterior generará el siguiente JSON Schema:

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

## Próximos Pasos

- Lee la [guía de instalación](/es/guide/installation) para una configuración detallada
- Entiende [cómo funciona](/es/guide/how-it-works) la biblioteca
- Explora la [documentación de la API](/es/api/core) para características avanzadas 