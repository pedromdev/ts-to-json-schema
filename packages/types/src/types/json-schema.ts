// Definição de tipos para JSON Schema
export type PrimitiveType = 'string' | 'number' | 'integer' | 'boolean' | 'null' | 'array' | 'object';

// Tipo para JSON Schema completo
export interface JsonSchema {
  // Tipo
  type?: PrimitiveType | PrimitiveType[];
  
  // Propriedades comuns
  title?: string;
  description?: string;
  default?: any;
  examples?: any[];
  deprecated?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
  see?: string;
  since?: string;
  $id?: string;
  $schema?: string;
  $comment?: string;
  
  // Propriedades para strings
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: string;
  
  // Propriedades para números
  multipleOf?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  
  // Propriedades para arrays
  items?: JsonSchema | JsonSchema[];
  contains?: JsonSchema;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  
  // Propriedades para objetos
  properties?: Record<string, JsonSchema>;
  patternProperties?: Record<string, JsonSchema>;
  additionalProperties?: boolean | JsonSchema;
  required?: string[];
  propertyNames?: JsonSchema;
  minProperties?: number;
  maxProperties?: number;
  
  // Propriedades para uniões
  oneOf?: JsonSchema[];
  anyOf?: JsonSchema[];
  allOf?: JsonSchema[];
  not?: JsonSchema;
  
  // Propriedades para enums
  enum?: any[];
  
  // Outras propriedades
  [key: string]: any;
}

// Tipo para inferir JSON Schema para string
export interface StringJsonSchema extends JsonSchema {
  type: 'string';
}

// Tipo para inferir JSON Schema para número
export interface NumberJsonSchema extends JsonSchema {
  type: 'number';
}

// Tipo para inferir JSON Schema para booleano
export interface BooleanJsonSchema extends JsonSchema {
  type: 'boolean';
}

// Tipo para inferir JSON Schema para null
export interface NullJsonSchema extends JsonSchema {
  type: 'null';
}

// Tipo para inferir JSON Schema para array
export interface ArrayJsonSchema<T> extends JsonSchema {
  type: 'array';
  items: InferJsonSchema<T>;
}

// Tipo para inferir JSON Schema para objeto
export interface ObjectJsonSchema<T> extends JsonSchema {
  type: 'object';
  properties: {
    [K in keyof T]-?: InferJsonSchema<T[K]> & JsonSchema;
  };
  required: Extract<keyof T, string>[];
}

// Tipo utilitário para extrair propriedades obrigatórias
type RequiredProperties<T> = {
  [K in keyof T]-?: undefined extends T[K] ? never : Extract<K, string>;
}[keyof T];

/**
 * Tipo utilitário para inferir um JSON Schema a partir de um tipo TypeScript.
 * 
 * @example
 * ```typescript
 * interface Person {
 *   name: string;      // propriedade obrigatória
 *   age: number;       // propriedade obrigatória
 *   email?: string;    // propriedade opcional
 * }
 * 
 * // O tipo inferido seria:
 * // {
 * //   type: 'object',
 * //   properties: {
 * //     name: { type: 'string' },    // presente no schema
 * //     age: { type: 'number' },     // presente no schema
 * //     email: { type: 'string' }    // presente no schema
 * //   },
 * //   required: ['name', 'age']      // apenas propriedades obrigatórias
 * // }
 * type PersonSchema = InferJsonSchema<Person>;
 * ```
 */
export type InferJsonSchema<T> = 
  T extends string ? StringJsonSchema :
  T extends number ? NumberJsonSchema :
  T extends boolean ? BooleanJsonSchema :
  T extends null ? NullJsonSchema :
  T extends Array<infer U> ? ArrayJsonSchema<U> & JsonSchema :
  T extends object ? ObjectJsonSchema<T> :
  JsonSchema; 