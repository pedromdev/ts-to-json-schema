# 快速入门指南

TS to JSON Schema 是一个库，允许您将 TypeScript 类型动态转换为 JSON Schema，无需代码生成器或 CLI 工具。

## 先决条件

- TypeScript 4.1 或更高版本
- Node.js 12 或更高版本

## 快速安装

```bash
# 使用 npm
npm install @ts-to-json-schema/core
npm install --save-dev typescript @ts-to-json-schema/transform ts-patch

# 使用 yarn
yarn add @ts-to-json-schema/core
yarn add -D typescript @ts-to-json-schema/transform ts-patch
```

## 基本示例

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

上面的代码将生成以下 JSON Schema:

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

## 下一步

- 阅读 [安装指南](/zh-CN/guide/installation) 获取详细设置
- 了解 [工作原理](/zh-CN/guide/how-it-works)
- 探索 [API 文档](/zh-CN/api/core) 获取高级功能

## 配置选项
| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|-----|
| `strictNullChecks` | boolean | true | 启用严格的null检查 |
| `allowComments` | boolean | false | 保留TypeScript注释 |

// ... restante do conteúdo precisa da versão original em inglês para tradução completa ... 