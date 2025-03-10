# Instalação

## Instalando os Pacotes

O TS to JSON Schema é composto por vários pacotes, cada um com sua função específica. Para começar, você precisará instalar pelo menos o pacote core e suas dependências:

```bash
# Usando npm
npm install @ts-to-json-schema/core
npm install --save-dev typescript @ts-to-json-schema/transform ts-patch

# Usando yarn
yarn add @ts-to-json-schema/core
yarn add -D typescript @ts-to-json-schema/transform ts-patch
```

## Configuração do TypeScript

Adicione o plugin de transformação ao seu `tsconfig.json`:

```json
{
  "compilerOptions": {
    "plugins": [
      { "transform": "@ts-to-json-schema/transform", "type": "program" }
    ]
  }
}
```

## Configuração do Bundler

### ESBuild

Se você estiver usando ESBuild, instale o plugin específico:

```bash
npm install --save-dev @ts-to-json-schema/esbuild-plugin
# ou
yarn add -D @ts-to-json-schema/esbuild-plugin
```

Configure o plugin no seu arquivo de build:

```typescript
import { build } from 'esbuild';
import { tsToJsonSchemaPlugin } from '@ts-to-json-schema/esbuild-plugin';

build({
  // ... outras configurações
  plugins: [tsToJsonSchemaPlugin()]
});
```

### Webpack

Para Webpack, você precisará configurar o `ts-loader` com o transformador:

```javascript
module.exports = {
  // ... outras configurações
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

## Verificando a Instalação

Para verificar se tudo está funcionando corretamente, crie um arquivo de teste:

```typescript
import { toJsonSchema } from '@ts-to-json-schema/core';

interface TestType {
  name: string;
  age: number;
}

const schema = toJsonSchema<TestType>();
console.log(schema);
```

Se você ver o schema JSON no console, a instalação foi bem-sucedida! 