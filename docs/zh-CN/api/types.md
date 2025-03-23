# 类型

`@ts-to-json-schema/types` 包提供了库中所有其他包使用的类型定义。

## JSON Schema 类型

### JsonSchema

表示 JSON schema 的主要类型：

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

JSON Schema 支持的基本类型：

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

## 推断类型

### InferJsonSchema

从 TypeScript 类型推断 JSON schema 的实用类型：

```typescript
type InferJsonSchema<T> = JsonSchema & {
  __tsType: T;
};
```

使用示例：

```typescript
interface User {
  id: number;
  name: string;
}

type UserSchema = InferJsonSchema<User>;
```

## 配置类型

### TransformOptions

配置转换器的选项：

```typescript
interface TransformOptions {
  /**
   * 是否解析循环引用
   */
  resolveCycles?: boolean;

  /**
   * 是否包含只读属性
   */
  includeReadonly?: boolean;

  /**
   * 是否包含私有属性
   */
  includePrivate?: boolean;
}
```

## 实用类型

### SchemaDefinition

表示 schema 定义的类型：

```typescript
interface SchemaDefinition {
  /**
   * schema 名称
   */
  name: string;

  /**
   * JSON schema
   */
  schema: JsonSchema;

  /**
   * 对其他 schema 的引用
   */
  refs?: string[];
}
```

### TypeMetadata

关于 TypeScript 类型的元数据：

```typescript
interface TypeMetadata {
  /**
   * 类型名称
   */
  name: string;

  /**
   * 类型类别
   */
  category: 'primitive' | 'object' | 'array' | 'enum' | 'union' | 'intersection';

  /**
   * 特定类别的附加信息
   */
  details?: any;
}
```

## 类型使用

此包中的类型主要被其他包内部使用，但您也可以使用它们来：

1. 正确键入处理 schema 的函数
2. 创建基于库类型的自定义类型
3. 扩展库的功能

示例：

```typescript
import { JsonSchema, InferJsonSchema } from '@ts-to-json-schema/types';

// 验证对象是否符合 schema 的函数
function validate<T>(data: T, schema: InferJsonSchema<T>): boolean {
  // 验证实现
  return true;
}

// 合并 schema 的函数
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