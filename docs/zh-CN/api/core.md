# 核心 API

`@ts-to-json-schema/core` 包提供了将 TypeScript 类型转换为 JSON Schema 的主要功能。

## toJsonSchema

```typescript
function toJsonSchema<T>(): JsonSchema
```

将 TypeScript 类型转换为 JSON Schema 的主要函数。

### 泛型类型

- `T`: 您要转换为 JSON Schema 的 TypeScript 类型

### 返回值

返回一个表示所提供 TypeScript 类型的 `JsonSchema` 对象。

### 基本示例

```typescript
import { toJsonSchema } from '@ts-to-json-schema/core';

interface User {
  id: number;
  name: string;
  email: string;
}

const schema = toJsonSchema<User>();
```

### 复杂类型示例

```typescript
import { toJsonSchema } from '@ts-to-json-schema/core';

// 枚举
enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

// 包含复杂类型的接口
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

生成的 schema 将包括：
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

### 支持的类型

- 基本类型
  - `string`
  - `number`
  - `boolean`
  - `null`
  - `undefined`
  
- 复合类型
  - `interface`
  - `type`
  - `enum`
  - 数组 (`T[]`)
  - 元组 (`[T, U]`)
  - 联合类型 (`T | U`)
  - 交叉类型 (`T & U`)
  - 可选属性 (`?`)
  - 只读属性 (`readonly`)
  - 泛型类型
  - 实用类型 (`Partial`, `Pick`, 等)

### 注意事项

- `toJsonSchema` 函数必须与配置好的 `@ts-to-json-schema/transform` 转换器一起使用
- Schema 在运行时生成，但元数据在编译时收集
- 泛型类型必须完全解析才能正确生成 schema 