# `@ts-to-json-schema/transform`

> Type transformer for TypeScript to JSON Schema

## Installation

```shell
npm install --save-dev typescript @ts-to-json-schema/transform
```

## Configuration

### 1. TypeScript Compiler API

```typescript
import * as ts from 'typescript';
import transform from '@ts-to-json-schema/transform';

const program = ts.createProgram(['./index.ts'], compilerOptions);
const sourceFiles = program.getSourceFiles();
const compilerOptions = {
  lib: ["es2015"],
  strict: true,
};

for (const sourceFile of sourceFiles) {
  const transformedSourceFile = ts.transform(
    sourceFile,
    [transform(program)],
    compilerOptions
  );
  const result = ts.createPrinter().printNode(
    ts.EmitHint.Unspecified,
    transformedSourceFile.transformed[0],
    sourceFile
  );

  console.log(result);
}
```

### 2. Alternative Compiler

To apply the transformation to the TypeScript code using bundlers/runners (such as Webpack, ts-node, etc.),
you must use an alternative compiler that supports plugins. Install one of the following compilers based on TypeScript
version:

| TypeScript Version | Compiler            | Documentation                                     |
|--------------------|---------------------|---------------------------------------------------|
| 5.x or newer       | `ts-patch/compiler` | [link](https://www.npmjs.com/package/ts-patch)    |
| 3.x, 4.x           | `ttypescript`       | [link](https://www.npmjs.com/package/ttypescript) |

```shell
npm install --save-dev ts-patch
```

Follow the instructions in the documentation to configure `@ts-to-json-schema/transform` plugin.
You need to enable `strict` mode too.

```json
{
  "compilerOptions": {
    "strict": true,
    "plugins": [
      { "transform": "@ts-to-json-schema/transform", "type": "program" }
    ]
  }
}
```

#### Change TypeScript compiler (TSC) to Alternative compiler

If you just need compile/transform your TypeScript code into JavaScript code,
you can use one of following commands instead of `tsc`:
- `ttsc` (for `ttypescript`)
- `tspc` (for `ts-patch`)

#### TS Node (ts-node)

Set the alternative compiler as ts-node compiler argument:

```shell
ts-node --compiler=ts-patch/compiler src/index.ts
```

#### Webpack + TS Loader

Set the alternative compiler in ts-loader options

```javascript
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          compiler: 'ts-patch/compiler', // add here
        },
      },
    ],
  }
};
```

### 3. ESBuild

Follow the instructions in the [ESBuild plugin](https://www.npmjs.com/package/@ts-to-json-schema/esbuild-plugin)
documentation.
