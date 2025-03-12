# Cómo Funciona

TS to JSON Schema utiliza un enfoque único para convertir tipos TypeScript en JSON Schema. En lugar de generar schemas en tiempo de compilación o a través de herramientas CLI, la biblioteca funciona en tiempo de ejecución mientras mantiene el tipado fuerte de TypeScript.

## Arquitectura

La biblioteca está dividida en varios paquetes, cada uno con una responsabilidad específica:

### @ts-to-json-schema/core

El paquete core proporciona la función principal `toJsonSchema` que usas en tu código. Esta función parece simple en la superficie, pero internamente:

1. Captura información sobre el tipo TypeScript usado como parámetro genérico
2. Utiliza la información recopilada por el transformador para generar el schema
3. Aplica la configuración y personalizaciones definidas

### @ts-to-json-schema/transform

Aquí es donde ocurre la magia. El transformador:

1. Se ejecuta durante la compilación de TypeScript
2. Analiza tipos usando la API del Compilador TypeScript
3. Recopila metadatos sobre los tipos
4. Inyecta metadatos en el código compilado

### @ts-to-json-schema/types

Contiene definiciones de tipos compartidas entre paquetes, incluyendo:

- Tipos de configuración
- Interfaces de schema
- Tipos utilitarios

### @ts-to-json-schema/esbuild-plugin

Proporciona integración con ESBuild, permitiendo:

- Configuración automática del transformador
- Optimización del proceso de build
- Soporte para varias configuraciones de ESBuild

## Flujo de Transformación

<Mermaid :graph="`
graph TB
    subgraph 'Tiempo de Compilación'
        A[Código TypeScript] -->|@ts-to-json-schema/transform| B[Análisis de Tipos]
        B -->|API del Compilador TS| C[Recopilación de Metadatos]
        C --> D[Inyección en Código JS]
    end

    subgraph 'Tiempo de Ejecución'
        E[Llamada toJsonSchema] -->|@ts-to-json-schema/core| F[Lectura de Metadatos]
        F --> G[Generación del Schema]
        G -->|@ts-to-json-schema/types| H[JSON Schema Final]
    end

    D -.->|Metadatos Disponibles| F

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style E fill:#bbf,stroke:#333,stroke-width:2px
    style H fill:#bfb,stroke:#333,stroke-width:2px
`" />

## Flujo de Ejecución

1. **Tiempo de Compilación**
   - El transformador analiza tu código TypeScript
   - Recopila información sobre los tipos
   - Inyecta metadatos en el código compilado

2. **Tiempo de Ejecución**
   - Llamas a `toJsonSchema<TuTipo>()`
   - La función accede a los metadatos inyectados
   - Genera el JSON Schema correspondiente

## Ejemplo Detallado

```typescript
// 1. Define tus tipos
interface User {
  id: number;
  name: string;
  email: string;
  profile?: {
    avatar: string;
    bio: string;
  };
}

// 2. Usa la función toJsonSchema
const schema = toJsonSchema<User>();

// 3. El schema generado incluirá:
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

## Ventajas de este Enfoque

1. **Sin Paso Extra de Build**
   - No necesitas ejecutar generadores
   - Integración natural con el flujo de desarrollo

2. **Tipado Fuerte**
   - Mantiene TypeScript como única fuente de verdad
   - Los errores de tipo se detectan en tiempo de compilación

3. **Rendimiento**
   - Los metadatos se generan solo una vez durante la compilación
   - La generación de schema es rápida en tiempo de ejecución

4. **Flexibilidad**
   - Soporte para tipos complejos
   - Personalizable a través de configuraciones 