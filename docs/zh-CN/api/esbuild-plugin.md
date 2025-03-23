# ESBuild 插件

`@ts-to-json-schema/esbuild-plugin` 包提供了与 ESBuild 的集成，便于在使用此 bundler 的项目中使用 TS to JSON Schema。

## 安装

```bash
# 使用 npm
npm install --save-dev @ts-to-json-schema/esbuild-plugin

# 使用 yarn
yarn add -D @ts-to-json-schema/esbuild-plugin
```

## 基本用法

```typescript
import { build } from 'esbuild';
import { tsToJsonSchemaPlugin } from '@ts-to-json-schema/esbuild-plugin';

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/bundle.js',
  plugins: [tsToJsonSchemaPlugin()]
});
```

## 配置

插件接受一个可选的配置对象：

```typescript
interface ESBuildPluginOptions {
  /**
   * 转换器选项
   */
  transformOptions?: {
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
  };

  /**
   * TypeScript 配置
   */
  tsconfig?: string;
}
```

### 完整配置示例

```typescript
import { build } from 'esbuild';
import { tsToJsonSchemaPlugin } from '@ts-to-json-schema/esbuild-plugin';

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/bundle.js',
  plugins: [
    tsToJsonSchemaPlugin({
      transformOptions: {
        resolveCycles: false,
        includeReadonly: false,
        includePrivate: true
      },
      tsconfig: './tsconfig.custom.json'
    })
  ]
});
```

## 功能

插件自动：

1. 配置 TypeScript 转换器
2. 处理 `.ts` 和 `.tsx` 文件
3. 注入必要的元数据
4. 优化最终 bundle

## 与 Watch Mode 的集成

插件完美支持 ESBuild 的 watch 模式：

```typescript
import { context } from 'esbuild';
import { tsToJsonSchemaPlugin } from '@ts-to-json-schema/esbuild-plugin';

async function watch() {
  const ctx = await context({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/bundle.js',
    plugins: [tsToJsonSchemaPlugin()]
  });

  await ctx.watch();
}

watch();
```

## 使用注意事项

- 插件应放在其他处理 TypeScript 的插件之前
- 转换器选项会影响项目中生成的所有 schema
- 插件兼容所有支持插件的 ESBuild 版本
- 构建开销最小，仅影响使用 `toJsonSchema` 的文件