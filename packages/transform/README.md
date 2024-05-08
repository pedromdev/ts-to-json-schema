# `@ts-to-json-schema/transform`

> Type transformer for TypeScript to JSON Schema

## Installation

```shell
npm install --save-dev typescript ts-patch @ts-to-json-schema/transform
```

## Configuration

### Basic configuration (tsconfig.json)

```json
{
  "compilerOptions": {
    // ...
    "strict": true, // Strict mode is required
    "plugins": [
      { "transform": "@ts-to-json-schema/transform", "type": "program" }
    ]
  }
}
```

### Bundlers/Runners

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
