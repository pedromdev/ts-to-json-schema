# Como Funciona

O TS to JSON Schema utiliza uma abordagem única para converter tipos TypeScript em JSON Schema. Em vez de gerar os schemas em tempo de compilação ou através de ferramentas CLI, a biblioteca funciona em tempo de execução, mantendo a tipagem forte do TypeScript.

## Arquitetura

A biblioteca é dividida em vários pacotes, cada um com uma responsabilidade específica:

### @ts-to-json-schema/core

O pacote core fornece a função principal `toJsonSchema` que você usa em seu código. Esta função parece simples na superfície, mas internamente ela:

1. Captura informações sobre o tipo TypeScript usado como parâmetro genérico
2. Utiliza as informações coletadas pelo transformador para gerar o schema
3. Aplica as configurações e personalizações definidas

### @ts-to-json-schema/transform

Este é o coração da mágica. O transformador:

1. É executado durante a compilação do TypeScript
2. Analisa os tipos usando a API do Compilador TypeScript
3. Coleta metadados sobre os tipos
4. Injeta os metadados no código compilado

### @ts-to-json-schema/types

Contém as definições de tipos compartilhadas entre os pacotes, incluindo:

- Tipos para configuração
- Interfaces para os schemas
- Tipos utilitários

### @ts-to-json-schema/esbuild-plugin

Fornece integração com o ESBuild, permitindo:

- Configuração automática do transformador
- Otimização do processo de build
- Suporte a várias configurações do ESBuild

## Fluxo de Transformação

```mermaid
graph TB
    subgraph "Tempo de Compilação"
        A[Código TypeScript] -->|@ts-to-json-schema/transform| B[Análise de Tipos]
        B -->|API do Compilador TS| C[Coleta de Metadados]
        C --> D[Injeção no Código JS]
    end

    subgraph "Tempo de Execução"
        E[Chamada toJsonSchema] -->|@ts-to-json-schema/core| F[Leitura de Metadados]
        F --> G[Geração do Schema]
        G -->|@ts-to-json-schema/types| H[JSON Schema Final]
    end

    D -.->|Metadados Disponíveis| F

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style E fill:#bbf,stroke:#333,stroke-width:2px
    style H fill:#bfb,stroke:#333,stroke-width:2px
    
    %% Cores específicas para melhorar o contraste no modo escuro
    classDef default fill:#444,stroke:#42b883,color:#fff,stroke-width:2px
    classDef subgraph fill:#333,stroke:#42b883,color:#fff
    
    class A,B,C,D,E,F,G,H default
    class "Tempo de Compilação","Tempo de Execução" subgraph
```

## Fluxo de Execução

1. **Tempo de Compilação**
   - O transformador analisa seu código TypeScript
   - Coleta informações sobre os tipos
   - Injeta os metadados no código compilado

2. **Tempo de Execução**
   - Você chama `toJsonSchema<SeuTipo>()`
   - A função acessa os metadados injetados
   - Gera o JSON Schema correspondente

## Exemplo Detalhado

```typescript
// 1. Defina seus tipos
interface User {
  id: number;
  name: string;
  email: string;
  profile?: {
    avatar: string;
    bio: string;
  };
}

// 2. Use a função toJsonSchema
const schema = toJsonSchema<User>();

// 3. O schema gerado incluirá:
// {
//   type: 'object',
//   properties: {
//     id: { type: 'number' },
//     name: { type: 'string' },
//     email: { type: 'string' },
//     profile: {
//       type: 'object',
//       properties: {
//         avatar: { type: 'string' },
//         bio: { type: 'string' }
//       },
//       required: ['avatar', 'bio']
//     }
//   },
//   required: ['id', 'name', 'email']
// }
```

## Vantagens desta Abordagem

1. **Sem Etapa Extra de Build**
   - Não precisa executar geradores
   - Integração natural com o fluxo de desenvolvimento

2. **Tipagem Forte**
   - Mantém o TypeScript como fonte única da verdade
   - Erros de tipo são pegos em tempo de compilação

3. **Performance**
   - Metadados são gerados apenas uma vez durante a compilação
   - Geração de schema é rápida em tempo de execução

4. **Flexibilidade**
   - Suporte a tipos complexos
   - Personalizável através de configurações 