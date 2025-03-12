# How it Works

TS to JSON Schema uses a unique approach to convert TypeScript types to JSON Schema. Instead of generating schemas at compile time or through CLI tools, the library works at runtime while maintaining TypeScript's strong typing.

## Architecture

The library is divided into several packages, each with a specific responsibility:

### @ts-to-json-schema/core

The core package provides the main `toJsonSchema` function that you use in your code. This function seems simple on the surface, but internally it:

1. Captures information about the TypeScript type used as a generic parameter
2. Uses the information collected by the transformer to generate the schema
3. Applies the defined settings and customizations

### @ts-to-json-schema/transform

This is where the magic happens. The transformer:

1. Runs during TypeScript compilation
2. Analyzes types using the TypeScript Compiler API
3. Collects metadata about types
4. Injects metadata into the compiled code

### @ts-to-json-schema/types

Contains shared type definitions between packages, including:

- Configuration types
- Schema interfaces
- Utility types

### @ts-to-json-schema/esbuild-plugin

Provides ESBuild integration, allowing:

- Automatic transformer configuration
- Build process optimization
- Support for various ESBuild configurations

## Transformation Flow

```mermaid
graph TB
    subgraph "Compile Time"
        A[TypeScript Code] -->|@ts-to-json-schema/transform| B[Type Analysis]
        B -->|TS Compiler API| C[Metadata Collection]
        C --> D[Injection into JS Code]
    end

    subgraph "Runtime"
        E[toJsonSchema Call] -->|@ts-to-json-schema/core| F[Metadata Reading]
        F --> G[Schema Generation]
        G -->|@ts-to-json-schema/types| H[Final JSON Schema]
    end

    D -.->|Metadata Available| F

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style E fill:#bbf,stroke:#333,stroke-width:2px
    style H fill:#bfb,stroke:#333,stroke-width:2px
    
    %% Specific colors to improve contrast in dark mode
    classDef default fill:#444,stroke:#42b883,color:#fff,stroke-width:2px
    classDef subgraph fill:#333,stroke:#42b883,color:#fff
    
    class A,B,C,D,E,F,G,H default
    class "Compile Time","Runtime" subgraph
```

## Execution Flow

1. **Compile Time**
   - The transformer analyzes your TypeScript code
   - Collects type information
   - Injects metadata into the compiled code

2. **Runtime**
   - You call `toJsonSchema<YourType>()`
   - The function accesses the injected metadata
   - Generates the corresponding JSON Schema

## Detailed Example

```typescript
// 1. Define your types
interface User {
  id: number;
  name: string;
  email: string;
  profile?: {
    avatar: string;
    bio: string;
  };
}

// 2. Use the toJsonSchema function
const schema = toJsonSchema<User>();

// 3. The generated schema will include:
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

## Advantages of this Approach

1. **No Extra Build Step**
   - No need to run generators
   - Natural integration with development flow

2. **Strong Typing**
   - Keeps TypeScript as the single source of truth
   - Type errors are caught at compile time

3. **Performance**
   - Metadata is generated only once during compilation
   - Schema generation is fast at runtime

4. **Flexibility**
   - Support for complex types
   - Customizable through configurations 