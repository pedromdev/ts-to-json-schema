# Plugin ESBuild

O pacote `@ts-to-json-schema/esbuild-plugin` fornece integração com o ESBuild para facilitar o uso do TS to JSON Schema em projetos que utilizam este bundler.

## Instalação

```bash
# Usando npm
npm install --save-dev @ts-to-json-schema/esbuild-plugin

# Usando yarn
yarn add -D @ts-to-json-schema/esbuild-plugin
```

## Uso Básico

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

## Configuração

O plugin aceita um objeto de configuração opcional:

```typescript
interface ESBuildPluginOptions {
  /**
   * Opções do transformador
   */
  transformOptions?: {
    /**
     * Define se deve resolver referências circulares
     * @default true
     */
    resolveCycles?: boolean;

    /**
     * Define se deve incluir propriedades readonly no schema
     * @default true
     */
    includeReadonly?: boolean;

    /**
     * Define se deve incluir propriedades privadas no schema
     * @default false
     */
    includePrivate?: boolean;
  };

  /**
   * Opções do TypeScript
   */
  tsconfig?: string;
}
```

### Exemplo com Configuração Completa

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

## Funcionalidades

O plugin automaticamente:

1. Configura o transformador TypeScript
2. Processa arquivos `.ts` e `.tsx`
3. Injeta os metadados necessários
4. Otimiza o bundle final

## Integração com Watch Mode

O plugin funciona perfeitamente com o modo watch do ESBuild:

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

## Considerações de Uso

- O plugin deve ser incluído antes de outros plugins que processam TypeScript
- As opções do transformador afetam todos os schemas gerados no projeto
- O plugin é compatível com todas as versões do ESBuild que suportam plugins
- O overhead de build é mínimo, afetando apenas arquivos que usam `toJsonSchema` 