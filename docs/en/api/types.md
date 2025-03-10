# Tipos

O pacote `@ts-to-json-schema/types` fornece as definições de tipos utilizadas por todos os outros pacotes da biblioteca.

## Tipos do JSON Schema

### JsonSchema

O tipo principal que representa um schema JSON:

```typescript
interface JsonSchema {
  type?: JsonSchemaType | JsonSchemaType[];
  properties?: Record<string, JsonSchema>;
  items?: JsonSchema | JsonSchema[];
  required?: string[];
  enum?: any[];
  const?: any;
  oneOf?: JsonSchema[];
  anyOf?: JsonSchema[];
  allOf?: JsonSchema[];
  not?: JsonSchema;
  definitions?: Record<string, JsonSchema>;
  additionalProperties?: boolean | JsonSchema;
  description?: string;
  default?: any;
  format?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  multipleOf?: number;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  minProperties?: number;
  maxProperties?: number;
  title?: string;
  $ref?: string;
  $id?: string;
  $schema?: string;
}
```

### JsonSchemaType

Os tipos básicos suportados pelo JSON Schema:

```typescript
type JsonSchemaType =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'null'
  | 'array'
  | 'object';
```

## Tipos de Inferência

### InferJsonSchema

Tipo utilitário que infere o schema JSON a partir de um tipo TypeScript:

```typescript
type InferJsonSchema<T> = JsonSchema & {
  __tsType: T;
};
```

Exemplo de uso:

```typescript
interface User {
  id: number;
  name: string;
}

type UserSchema = InferJsonSchema<User>;
```

## Tipos de Configuração

### TransformOptions

Opções para configurar o transformador:

```typescript
interface TransformOptions {
  /**
   * Define se deve resolver referências circulares
   */
  resolveCycles?: boolean;

  /**
   * Define se deve incluir propriedades readonly
   */
  includeReadonly?: boolean;

  /**
   * Define se deve incluir propriedades privadas
   */
  includePrivate?: boolean;
}
```

## Tipos Utilitários

### SchemaDefinition

Tipo que representa uma definição de schema:

```typescript
interface SchemaDefinition {
  /**
   * Nome do schema
   */
  name: string;

  /**
   * Schema JSON
   */
  schema: JsonSchema;

  /**
   * Referências a outros schemas
   */
  refs?: string[];
}
```

### TypeMetadata

Metadados sobre um tipo TypeScript:

```typescript
interface TypeMetadata {
  /**
   * Nome do tipo
   */
  name: string;

  /**
   * Categoria do tipo
   */
  category: 'primitive' | 'object' | 'array' | 'enum' | 'union' | 'intersection';

  /**
   * Informações adicionais específicas da categoria
   */
  details?: any;
}
```

## Uso dos Tipos

Os tipos deste pacote são usados principalmente internamente pelos outros pacotes, mas você pode usá-los para:

1. Tipar corretamente suas funções que trabalham com schemas
2. Criar tipos personalizados baseados nos tipos da biblioteca
3. Estender a funcionalidade da biblioteca

Exemplo:

```typescript
import { JsonSchema, InferJsonSchema } from '@ts-to-json-schema/types';

// Função que valida um objeto contra um schema
function validate<T>(data: T, schema: InferJsonSchema<T>): boolean {
  // Implementação da validação
  return true;
}

// Função que mescla schemas
function mergeSchemas(schemas: JsonSchema[]): JsonSchema {
  return schemas.reduce((acc, schema) => ({
    ...acc,
    ...schema,
    properties: {
      ...acc.properties,
      ...schema.properties
    }
  }));
}
``` 