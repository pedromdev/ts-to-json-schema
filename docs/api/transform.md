# API Transform

O pacote `@ts-to-json-schema/transform` é responsável por analisar os tipos TypeScript e gerar os metadados necessários para a conversão em JSON Schema.

## Configuração

### Plugin do TypeScript

O transformador é configurado como um plugin do TypeScript no seu `tsconfig.json`:

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "transform": "@ts-to-json-schema/transform",
        "type": "program"
      }
    ]
  }
}
```

### Opções do Plugin

O plugin aceita as seguintes opções:

```typescript
interface TransformOptions {
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
}
```

Exemplo de configuração com opções:

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "transform": "@ts-to-json-schema/transform",
        "type": "program",
        "resolveCycles": false,
        "includeReadonly": false
      }
    ]
  }
}
```

## Funcionalidades

### Resolução de Tipos

O transformador é capaz de resolver vários tipos complexos do TypeScript:

```typescript
// Tipos Básicos
type Basic = string | number | boolean;

// Arrays e Tuplas
type ArrayType = string[];
type TupleType = [string, number];

// Objetos e Interfaces
interface ComplexType {
  prop1: string;
  prop2?: number;
  readonly prop3: boolean;
}

// Tipos Genéricos
interface Container<T> {
  data: T;
  metadata: Record<string, unknown>;
}

// Tipos Utilitários
type PartialType = Partial<ComplexType>;
type PickType = Pick<ComplexType, 'prop1' | 'prop2'>;

// Tipos Mapeados
type Nullable<T> = { [K in keyof T]: T[K] | null };
```

### Resolução de Ciclos

O transformador lida automaticamente com referências circulares:

```typescript
interface Node {
  value: string;
  next?: Node; // Referência circular
}

interface Tree {
  value: string;
  left?: Tree;  // Referência circular
  right?: Tree; // Referência circular
}
```

### Metadados Gerados

O transformador gera metadados que incluem:

- Informações sobre o tipo (nome, categoria)
- Propriedades e seus tipos
- Modificadores (opcional, readonly)
- Referências a outros tipos
- Informações sobre tipos genéricos
- Constraints e defaults de tipos genéricos

## Integração com Bundlers

### Webpack

Para usar com Webpack, configure o `ts-loader`:

```javascript
module.exports = {
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

### Rollup

Para usar com Rollup, configure o plugin `@rollup/plugin-typescript`:

```javascript
import typescript from '@rollup/plugin-typescript';

export default {
  plugins: [
    typescript({
      typescript: require('ttypescript')
    })
  ]
};
```

## Considerações de Uso

- O transformador deve ser configurado antes de usar a função `toJsonSchema`
- As opções do transformador afetam todos os schemas gerados no projeto
- O transformador adiciona um pequeno overhead ao processo de compilação
- Os metadados são injetados apenas nos arquivos que usam `toJsonSchema` 