# `@ts-to-json-schema/transform`

This package is responsible for transforming TypeScript types into JSON Schema objects.

## Installation

```bash
npm install @ts-to-json-schema/transform
```

or

```bash
yarn add @ts-to-json-schema/transform
```

## Usage

This package is used internally by the `@ts-to-json-schema/core` package and should not be used directly.

## Supported JSDoc Tags

The package supports the following JSDoc tags to add metadata to the JSON Schema:

### `@deprecated`

Marks a field as deprecated.

```typescript
interface Example {
  /**
   * @deprecated This field is deprecated and will be removed in the next version
   */
  field: string;
}
```

Result in JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "field": {
      "type": "string",
      "deprecated": true
    }
  },
  "required": ["field"]
}
```

### `@example`

Provides example values for a field.

```typescript
interface Example {
  /**
   * @example "example value"
   * @example 123
   */
  field: string;
}
```

Result in JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "field": {
      "type": "string",
      "examples": ["example value", "123"]
    }
  },
  "required": ["field"]
}
```

### `@see`

Provides links to additional documentation.

```typescript
interface Example {
  /**
   * @see https://example.com/docs
   */
  field: string;
}
```

Result in JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "field": {
      "type": "string",
      "see": "https://example.com/docs"
    }
  },
  "required": ["field"]
}
```

### `@since`

Indicates the version in which a field was introduced.

```typescript
interface Example {
  /**
   * @since 1.0.0
   */
  field: string;
}
```

Result in JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "field": {
      "type": "string",
      "since": "1.0.0"
    }
  },
  "required": ["field"]
}
```

### `@default`

Provides a default value for a field.

```typescript
interface Example {
  /**
   * @default "default value"
   */
  field: string;
}
```

Result in JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "field": {
      "type": "string",
      "default": "default value"
    }
  },
  "required": ["field"]
}
```

### Numeric Validation Tags

#### `@minimum` and `@maximum`

Specify the minimum and maximum values for a numeric field.

```typescript
interface Example {
  /**
   * @minimum 1
   * @maximum 100
   */
  field: number;
}
```

Result in JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "field": {
      "type": "number",
      "minimum": 1,
      "maximum": 100
    }
  },
  "required": ["field"]
}
```

### String Validation Tags

#### `@minLength` and `@maxLength`

Specify the minimum and maximum lengths for a string field.

```typescript
interface Example {
  /**
   * @minLength 3
   * @maxLength 100
   */
  field: string;
}
```

Result in JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "field": {
      "type": "string",
      "minLength": 3,
      "maxLength": 100
    }
  },
  "required": ["field"]
}
```

### `@format`

Specifies the format of a field.

```typescript
interface Example {
  /**
   * @format email
   */
  field: string;
}
```

Result in JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "field": {
      "type": "string",
      "format": "email"
    }
  },
  "required": ["field"]
}
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
