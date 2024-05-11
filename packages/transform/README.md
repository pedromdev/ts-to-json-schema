# `@ts-to-json-schema/transform`

> Type transformer for TypeScript to JSON Schema

## Installation

```shell
npm install --save-dev typescript @ts-to-json-schema/transform
```

## Configuration

### TypeScript Compiler API

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

### TS Patch

Install `ts-patch` package:

```shell
npm install --save-dev ts-patch
```

Follow the instructions in the [TS Patch](https://www.npmjs.com/package/ts-patch) documentation 
to configure `@ts-to-json-schema/transform` plugin. You need to enable `strict` mode too. 

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

#### Change TypeScript compiler (TSC) to TS Patch (TSPC)

If you just need compile/transform your TypeScript code into JavaScript code,
you can `tspc` command instead of `tsc`.

#### TS Node (ts-node)

Add ts-patch compiler as ts-node compiler argument:

```shell
ts-node --compiler=ts-patch/compiler src/index.ts
```

#### Webpack + TS Loader

Add ts-patch compiler in ts-loader options

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

### ESBuild 

Follow the instructions in the [ESBuild plugin](https://www.npmjs.com/package/@ts-to-json-schema/esbuild-plugin) documentation.
