# API 转换器

`@ts-to-json-schema/transform` 包负责分析 TypeScript 类型并生成转换为 JSON Schema 所需的元数据。

## 配置

### TypeScript 插件

转换器在 `tsconfig.json` 中配置为 TypeScript 插件：

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "transform": "@ts-to-json-schema/transform",
        "type": "program"
      }
    ]
  }
}
```

### 插件选项

插件接受以下选项：

```typescript
interface TransformOptions {
  /**
   * 是否解析循环引用
   * @default true
   */
  resolveCycles?: boolean;

  /**
   * 是否在 schema 中包含只读属性
   * @default true
   */
  includeReadonly?: boolean;

  /**
   * 是否在 schema 中包含私有属性
   * @default false
   */
  includePrivate?: boolean;
}
```

配置示例：

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "transform": "@ts-to-json-schema/transform",
        "type": "program",
        "resolveCycles": false,
        "includeReadonly": false
      }
    ]
  }
}
```

## 功能

### 类型解析

转换器能够解析各种复杂的 TypeScript 类型：

```typescript
// 基本类型
type Basic = string | number | boolean;

// 数组和元组
type ArrayType = string[];
type TupleType = [string, number];

// 对象和接口
interface ComplexType {
  prop1: string;
  prop2?: number;
  readonly prop3: boolean;
}

// 泛型类型
interface Container<T> {
  data: T;
  metadata: Record<string, unknown>;
}

// 实用类型
type PartialType = Partial<ComplexType>;
type PickType = Pick<ComplexType, 'prop1' | 'prop2'>;

// 映射类型
type Nullable<T> = { [K in keyof T]: T[K] | null };
```

### 循环解析

转换器自动处理循环引用：

```typescript
interface Node {
  value: string;
  next?: Node; // 循环引用
}

interface Tree {
  value: string;
  left?: Tree;  // 循环引用
  right?: Tree; // 循环引用
}
```

### 生成的元数据

转换器生成的元数据包括：

- 类型信息（名称、类别）
- 属性及其类型
- 修饰符（可选、只读）
- 对其他类型的引用
- 泛型类型信息
- 泛型类型的约束和默认值

## 与 Bundlers 的集成

### Webpack

要与 Webpack 一起使用，请配置 `ts-loader`：

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          compiler: 'ttypescript'
        }
      }
    ]
  }
};
```

### Rollup

要与 Rollup 一起使用，请配置 `@rollup/plugin-typescript` 插件：

```javascript
import typescript from '@rollup/plugin-typescript';

export default {
  plugins: [
    typescript({
      typescript: require('ttypescript')
    })
  ]
};
```

## 使用注意事项

- 在使用 `toJsonSchema` 函数之前必须配置转换器
- 转换器选项会影响项目中生成的所有 schema
- 转换器会略微增加编译过程的开销
- 元数据仅注入到使用 `toJsonSchema` 的文件中 