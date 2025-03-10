# `@ts-to-json-schema/transform`

Este pacote é responsável por transformar tipos TypeScript em objetos JSON Schema.

## Instalação

```bash
npm install @ts-to-json-schema/transform
```

ou

```bash
yarn add @ts-to-json-schema/transform
```

## Uso

Este pacote é usado internamente pelo pacote `@ts-to-json-schema/core` e não deve ser usado diretamente.

## Tags JSDoc Suportadas

O pacote suporta as seguintes tags JSDoc para adicionar metadados ao JSON Schema:

### `@deprecated`

Marca um campo como obsoleto.

```typescript
interface Example {
  /**
   * @deprecated Este campo está obsoleto e será removido na próxima versão
   */
  field: string;
}
```

Resultado no JSON Schema:

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

Fornece exemplos de valores para um campo.

```typescript
interface Example {
  /**
   * @example "valor de exemplo"
   * @example 123
   */
  field: string;
}
```

Resultado no JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "field": {
      "type": "string",
      "examples": ["valor de exemplo", "123"]
    }
  },
  "required": ["field"]
}
```

### `@see`

Fornece links para documentação adicional.

```typescript
interface Example {
  /**
   * @see https://example.com/docs
   */
  field: string;
}
```

Resultado no JSON Schema:

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

Indica a versão em que um campo foi introduzido.

```typescript
interface Example {
  /**
   * @since 1.0.0
   */
  field: string;
}
```

Resultado no JSON Schema:

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

Fornece um valor padrão para um campo.

```typescript
interface Example {
  /**
   * @default "valor padrão"
   */
  field: string;
}
```

Resultado no JSON Schema:

```json
{
  "type": "object",
  "properties": {
    "field": {
      "type": "string",
      "default": "valor padrão"
    }
  },
  "required": ["field"]
}
```

### Tags de Validação Numérica

#### `@minimum` e `@maximum`

Especificam os valores mínimo e máximo para um campo numérico.

```typescript
interface Example {
  /**
   * @minimum 1
   * @maximum 100
   */
  field: number;
}
```

Resultado no JSON Schema:

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

### Tags de Validação de String

#### `@minLength` e `@maxLength`

Especificam os comprimentos mínimo e máximo para um campo de string.

```typescript
interface Example {
  /**
   * @minLength 3
   * @maxLength 100
   */
  field: string;
}
```

Resultado no JSON Schema:

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

Especifica o formato de um campo.

```typescript
interface Example {
  /**
   * @format email
   */
  field: string;
}
```

Resultado no JSON Schema:

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
