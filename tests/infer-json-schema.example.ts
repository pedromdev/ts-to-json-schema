import { toJsonSchema } from '@ts-to-json-schema/core';
import { InferJsonSchema } from '@ts-to-json-schema/types';

// Exemplo 1: Tipo primitivo
type MyString = string;
const stringSchema = toJsonSchema<MyString>();
// stringSchema terá o tipo: InferJsonSchema<string> (StringJsonSchema)
// {
//   type: 'string';
//   ...outras propriedades opcionais
// }

// Exemplo 2: Array
type StringArray = string[];
const arraySchema = toJsonSchema<StringArray>();
// arraySchema terá o tipo: InferJsonSchema<string[]> (ArrayJsonSchema<string>)
// {
//   type: 'array';
//   items: InferJsonSchema<string>;
//   ...outras propriedades opcionais
// }

// Exemplo 3: Objeto simples
interface Person {
  name: string;
  age: number;
  isActive?: boolean;
}
const personSchema = toJsonSchema<Person>();
// personSchema terá o tipo: InferJsonSchema<Person> (ObjectJsonSchema<Person>)
// {
//   type: 'object';
//   properties: {
//     name?: InferJsonSchema<string>;
//     age?: InferJsonSchema<number>;
//     isActive?: InferJsonSchema<boolean>;
//   };
//   required?: string[];
//   ...outras propriedades opcionais
// }

// Exemplo 4: Objeto aninhado
interface Address {
  street: string;
  city: string;
  zipCode: string;
}
interface PersonWithAddress {
  name: string;
  age: number;
  address: Address;
  tags: string[];
}
const personWithAddressSchema = toJsonSchema<PersonWithAddress>();
// personWithAddressSchema terá o tipo: InferJsonSchema<PersonWithAddress> (ObjectJsonSchema<PersonWithAddress>)
// {
//   type: 'object';
//   properties: {
//     name?: InferJsonSchema<string>;
//     age?: InferJsonSchema<number>;
//     address?: InferJsonSchema<Address>;
//     tags?: InferJsonSchema<string[]>;
//   };
//   required?: string[];
//   ...outras propriedades opcionais
// }

// Exemplo 5: Objeto com JSDoc
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
const productSchema = toJsonSchema<Product>();
// productSchema terá o tipo: InferJsonSchema<Product> (ObjectJsonSchema<Product>)
// {
//   type: 'object';
//   properties: {
//     id?: InferJsonSchema<number>;
//     name?: InferJsonSchema<string>;
//     price?: InferJsonSchema<number>;
//     description?: InferJsonSchema<string>;
//     status?: InferJsonSchema<string>;
//     tags?: InferJsonSchema<string[]>;
//   };
//   required?: string[];
//   ...outras propriedades opcionais
// }

// Verificação de tipos em tempo de compilação
function validateSchema<T>(schema: InferJsonSchema<T>): void {
  console.log('Schema válido:', schema);
}

// Estas chamadas são válidas em tempo de compilação
validateSchema(stringSchema);
validateSchema(arraySchema);
validateSchema(personSchema);
validateSchema(personWithAddressSchema);
validateSchema(productSchema);

// Esta chamada seria inválida em tempo de compilação
// validateSchema({ type: 'invalid' });

// Exportando os schemas para uso em outros arquivos
export {
  stringSchema,
  arraySchema,
  personSchema,
  personWithAddressSchema,
  productSchema
}; 