# `@ts-to-json-schema/esbuild-plugin`

> ESBuild plugin for TypeScript to JSON Schema

## Installation

```shell
npm install --save-dev typescript esbuild @ts-to-json-schema/esbuild-plugin @ts-to-json-schema/transform
```

## Configuration

```javascript
const esbuild = require('esbuild');
const { tsToJsonSchemaPlugin } = require('@ts-to-json-schema/esbuild-plugin');

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  plugins: [
    tsToJsonSchemaPlugin() // Add here
  ],
}).catch(() => process.exit(1));
```

### Options

#### `tsConfigFile`

You can specify the path to the TypeScript configuration file.

```javascript
tsToJsonSchemaPlugin({
  tsConfigFile: 'tsconfig.other.json' // Default: 'tsconfig.json'
})
```

#### `tsx`

You can enable parsing of TSX files.

```javascript
tsToJsonSchemaPlugin({
  tsx: true // Default: false
})
```
