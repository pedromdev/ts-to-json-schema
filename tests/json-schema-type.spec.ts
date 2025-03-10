import { JsonSchema, InferJsonSchema } from '@ts-to-json-schema/types';

// Este teste é para verificar a compilação e uso do tipo JsonSchema
describe('JsonSchema', () => {
  it('should define JSON Schema for primitive types', () => {
    // String
    const stringSchema: JsonSchema = {
      type: 'string',
      minLength: 3,
      maxLength: 100
    };
    expect(stringSchema.type).toBe('string');

    // Number
    const numberSchema: JsonSchema = {
      type: 'number',
      minimum: 0,
      maximum: 100
    };
    expect(numberSchema.type).toBe('number');

    // Boolean
    const booleanSchema: JsonSchema = {
      type: 'boolean'
    };
    expect(booleanSchema.type).toBe('boolean');
  });

  it('should define JSON Schema for array types', () => {
    const stringArraySchema: JsonSchema = {
      type: 'array',
      items: {
        type: 'string'
      }
    };
    expect(stringArraySchema.type).toBe('array');
    
    // Verificar se items é um objeto (não um array)
    if (stringArraySchema.items && !Array.isArray(stringArraySchema.items)) {
      expect(stringArraySchema.items.type).toBe('string');
    }
  });

  it('should define JSON Schema for object types', () => {
    const personSchema: JsonSchema = {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        age: {
          type: 'number'
        },
        isActive: {
          type: 'boolean'
        }
      },
      required: ['name', 'age']
    };
    expect(personSchema.type).toBe('object');
    expect(personSchema.properties?.name.type).toBe('string');
    expect(personSchema.properties?.age.type).toBe('number');
    expect(personSchema.required).toContain('name');
    expect(personSchema.required).toContain('age');
  });

  it('should define JSON Schema for nested object types', () => {
    const personSchema: JsonSchema = {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        age: {
          type: 'number'
        },
        address: {
          type: 'object',
          properties: {
            street: {
              type: 'string'
            },
            city: {
              type: 'string'
            },
            zipCode: {
              type: 'string'
            }
          },
          required: ['street', 'city', 'zipCode']
        },
        tags: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      },
      required: ['name', 'age', 'address', 'tags']
    };
    expect(personSchema.type).toBe('object');
    expect(personSchema.properties?.address.type).toBe('object');
    expect(personSchema.properties?.address.properties?.street.type).toBe('string');
    expect(personSchema.properties?.tags.type).toBe('array');
    
    // Verificar se items é um objeto (não um array)
    if (personSchema.properties?.tags.items && !Array.isArray(personSchema.properties.tags.items)) {
      expect(personSchema.properties.tags.items.type).toBe('string');
    }
  });
});

// Este teste é para verificar a inferência de tipos com InferJsonSchema
describe('InferJsonSchema', () => {
  it('should infer JSON Schema from primitive types', () => {
    // Definindo tipos TypeScript
    type MyString = string;
    type MyNumber = number;
    type MyBoolean = boolean;
    
    // Criando instâncias dos schemas inferidos
    const stringSchema: InferJsonSchema<MyString> = {
      type: 'string',
      minLength: 3,
      maxLength: 100
    };
    
    const numberSchema: InferJsonSchema<MyNumber> = {
      type: 'number',
      minimum: 0,
      maximum: 100
    };
    
    const booleanSchema: InferJsonSchema<MyBoolean> = {
      type: 'boolean'
    };
    
    // Verificando se os schemas têm as propriedades esperadas
    expect(stringSchema.type).toBe('string');
    expect(numberSchema.type).toBe('number');
    expect(booleanSchema.type).toBe('boolean');
  });
  
  it('should infer JSON Schema from array types', () => {
    // Definindo tipo de array
    type StringArray = string[];
    
    // Criando instância do schema inferido
    const stringArraySchema: InferJsonSchema<StringArray> = {
      type: 'array',
      items: {
        type: 'string'
      }
    };
    
    // Verificando se o schema tem as propriedades esperadas
    expect(stringArraySchema.type).toBe('array');
    if (stringArraySchema.items && !Array.isArray(stringArraySchema.items)) {
      expect(stringArraySchema.items.type).toBe('string');
    }
  });
  
  it('should infer JSON Schema from object types', () => {
    // Definindo interface de objeto
    interface Person {
      name: string;
      age: number;
      isActive?: boolean;
    }
    
    // Criando instância do schema inferido
    const personSchema: InferJsonSchema<Person> = {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        age: {
          type: 'number'
        },
        isActive: {
          type: 'boolean'
        }
      },
      required: ['name', 'age']
    };
    
    // Verificando se o schema tem as propriedades esperadas
    expect(personSchema.type).toBe('object');
    expect(personSchema.properties?.name.type).toBe('string');
    expect(personSchema.properties?.age.type).toBe('number');
    expect(personSchema.required).toContain('name');
    expect(personSchema.required).toContain('age');
  });
  
  it('should infer JSON Schema from nested object types', () => {
    // Definindo interfaces aninhadas
    interface Address {
      street: string;
      city: string;
      zipCode: string;
    }
    
    interface Person {
      name: string;
      age: number;
      address: Address;
      tags: string[];
    }
    
    // Criando instância do schema inferido
    const personSchema: InferJsonSchema<Person> = {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        age: {
          type: 'number'
        },
        address: {
          type: 'object',
          properties: {
            street: {
              type: 'string'
            },
            city: {
              type: 'string'
            },
            zipCode: {
              type: 'string'
            }
          },
          required: ['street', 'city', 'zipCode']
        },
        tags: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      },
      required: ['name', 'age', 'address', 'tags']
    };
    
    // Verificando se o schema tem as propriedades esperadas
    expect(personSchema.type).toBe('object');
    expect(personSchema.properties?.address.type).toBe('object');
    expect(personSchema.properties?.address.properties?.street.type).toBe('string');
    expect(personSchema.properties?.tags.type).toBe('array');
    if (personSchema.properties?.tags.items && !Array.isArray(personSchema.properties.tags.items)) {
      expect(personSchema.properties.tags.items.type).toBe('string');
    }
  });
  
  it('should infer JSON Schema with JSDoc metadata', () => {
    // Definindo interface com JSDoc
    interface Product {
      /**
       * The unique identifier for the product
       * @minimum 1
       */
      id: number;
      
      /**
       * The name of the product
       * @minLength 3
       * @maxLength 100
       */
      name: string;
      
      /**
       * The price of the product
       * @minimum 0
       */
      price: number;
      
      /**
       * The description of the product
       * @deprecated This field is deprecated and will be removed in the next version
       */
      description?: string;
      
      /**
       * The status of the product
       * @example "active"
       * @default "pending"
       */
      status?: string;
      
      /**
       * The tags of the product
       * @see https://example.com/docs/tags
       */
      tags?: string[];
    }

    // Criando instância do schema inferido
    const productSchema: InferJsonSchema<Product> = {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'The unique identifier for the product',
          minimum: 1
        },
        name: {
          type: 'string',
          description: 'The name of the product',
          minLength: 3,
          maxLength: 100
        },
        price: {
          type: 'number',
          description: 'The price of the product',
          minimum: 0
        },
        description: {
          type: 'string',
          description: 'The description of the product',
          deprecated: true
        },
        status: {
          type: 'string',
          description: 'The status of the product',
          examples: ['active'],
          default: 'pending'
        },
        tags: {
          type: 'array',
          description: 'The tags of the product',
          items: {
            type: 'string'
          },
          see: 'https://example.com/docs/tags'
        }
      },
      required: ['id', 'name', 'price']
    };
    
    // Verificando se o schema tem as propriedades esperadas
    expect(productSchema.type).toBe('object');
    expect(productSchema.properties?.id.minimum).toBe(1);
    expect(productSchema.properties?.name.minLength).toBe(3);
    expect(productSchema.properties?.name.maxLength).toBe(100);
    expect(productSchema.properties?.price.minimum).toBe(0);
    
    if (productSchema.properties?.description) {
      expect(productSchema.properties.description.deprecated).toBe(true);
    }
    
    if (productSchema.properties?.status) {
      expect(productSchema.properties.status.default).toBe('pending');
      expect(productSchema.properties.status.examples).toContain('active');
    }
    
    if (productSchema.properties?.tags) {
      expect(productSchema.properties.tags.see).toBe('https://example.com/docs/tags');
    }
  });
}); 