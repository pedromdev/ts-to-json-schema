# 安装指南

## 安装包

TS to JSON Schema 由多个包组成，每个包都有其特定功能。要开始使用，您至少需要安装核心包及其依赖项：

```bash
# 使用 npm
npm install @ts-to-json-schema/core
npm install --save-dev typescript @ts-to-json-schema/transform ts-patch

# 使用 yarn
yarn add @ts-to-json-schema/core
yarn add -D typescript @ts-to-json-schema/transform ts-patch
```

## TypeScript 配置

在您的 `tsconfig.json` 中添加转换插件：

```json
{
  "compilerOptions": {
    "plugins": [
      { "transform": "@ts-to-json-schema/transform", "type": "program" }
    ]
  }
}
```

## Bundler 配置

### ESBuild

如果您使用 ESBuild，请安装专用插件：

```bash
npm install --save-dev @ts-to-json-schema/esbuild-plugin
# 或者
yarn add -D @ts-to-json-schema/esbuild-plugin
```

在您的构建文件中配置插件：

```typescript
import { build } from 'esbuild';
import { tsToJsonSchemaPlugin } from '@ts-to-json-schema/esbuild-plugin';

build({
  // ... 其他配置
  plugins: [tsToJsonSchemaPlugin()]
});
```

### Webpack

对于 Webpack，您需要配置 `ts-loader` 与转换器：

```javascript
module.exports = {
  // ... 其他配置
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

## 验证安装

要验证一切是否正常工作，请创建一个测试文件：

```typescript
import { toJsonSchema } from '@ts-to-json-schema/core';

interface TestType {
  name: string;
  age: number;
}

const schema = toJsonSchema<TestType>();
console.log(schema);
```

如果您在控制台中看到 JSON Schema，则安装成功！ 