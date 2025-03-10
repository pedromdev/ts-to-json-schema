import { JsonSchema } from "@ts-to-json-schema/types";
import * as ts from 'typescript';
import { SchemaTransformer } from "../schema.transformer";
import { TypescriptAdapter } from "../typescript.adapter";

export abstract class AbstractTransformHandler<T extends ts.Type = ts.Type> {
  protected readonly typescriptAdapter = new TypescriptAdapter(this.transformer.typeChecker);

  constructor(protected readonly transformer: SchemaTransformer) {}

  abstract shouldTransform(type: ts.Type): boolean;
  abstract transform(type: T, originSymbol?: ts.Symbol): JsonSchema;

  protected addMetadata(jsonSchema: JsonSchema, originSymbol?: ts.Symbol) {
    if (!originSymbol) {
      return jsonSchema;
    }

    const comment = this.typescriptAdapter.getJSDocComment(originSymbol);

    if (comment) {
      jsonSchema.description = comment;
    }

    // Processar tags JSDoc
    const jsDocTags = this.typescriptAdapter.getJSDocTags(originSymbol);
    
    if (jsDocTags) {
      // Processar tag @deprecated
      if (jsDocTags.some(tag => tag.name === 'deprecated')) {
        jsonSchema.deprecated = true;
      }

      // Processar tag @example
      const exampleTags = jsDocTags.filter(tag => tag.name === 'example');
      if (exampleTags.length > 0) {
        jsonSchema.examples = exampleTags.map(tag => {
          const text = this.typescriptAdapter.getJSDocTagText(tag);
          // Tentar analisar o exemplo como JSON, se possível
          try {
            // Remover aspas do início e fim, se existirem
            const trimmedText = text.trim().replace(/^["'](.*)["']$/, '$1');
            return trimmedText;
          } catch {
            return text;
          }
        });
      }

      // Processar tag @see
      const seeTag = jsDocTags.find(tag => tag.name === 'see');
      if (seeTag) {
        jsonSchema.see = this.typescriptAdapter.getJSDocTagText(seeTag);
      }

      // Processar tag @since
      const sinceTag = jsDocTags.find(tag => tag.name === 'since');
      if (sinceTag) {
        jsonSchema.since = this.typescriptAdapter.getJSDocTagText(sinceTag);
      }

      // Processar tag @default
      const defaultTag = jsDocTags.find(tag => tag.name === 'default');
      if (defaultTag) {
        const defaultValue = this.typescriptAdapter.getJSDocTagText(defaultTag);
        // Tentar analisar o valor padrão como JSON, se possível
        try {
          // Remover aspas do início e fim, se existirem
          const trimmedValue = defaultValue.trim().replace(/^["'](.*)["']$/, '$1');
          jsonSchema.default = trimmedValue;
        } catch {
          jsonSchema.default = defaultValue;
        }
      }

      // Processar tags de validação numérica
      const minimumTag = jsDocTags.find(tag => tag.name === 'minimum');
      if (minimumTag) {
        const minimumValue = this.typescriptAdapter.getJSDocTagText(minimumTag);
        const parsedValue = parseFloat(minimumValue);
        if (!isNaN(parsedValue)) {
          jsonSchema.minimum = parsedValue;
        }
      }

      const maximumTag = jsDocTags.find(tag => tag.name === 'maximum');
      if (maximumTag) {
        const maximumValue = this.typescriptAdapter.getJSDocTagText(maximumTag);
        const parsedValue = parseFloat(maximumValue);
        if (!isNaN(parsedValue)) {
          jsonSchema.maximum = parsedValue;
        }
      }

      // Processar tags de validação de string
      const minLengthTag = jsDocTags.find(tag => tag.name === 'minLength');
      if (minLengthTag) {
        const minLengthValue = this.typescriptAdapter.getJSDocTagText(minLengthTag);
        const parsedValue = parseInt(minLengthValue, 10);
        if (!isNaN(parsedValue)) {
          jsonSchema.minLength = parsedValue;
        }
      }

      const maxLengthTag = jsDocTags.find(tag => tag.name === 'maxLength');
      if (maxLengthTag) {
        const maxLengthValue = this.typescriptAdapter.getJSDocTagText(maxLengthTag);
        const parsedValue = parseInt(maxLengthValue, 10);
        if (!isNaN(parsedValue)) {
          jsonSchema.maxLength = parsedValue;
        }
      }

      // Processar tag @format
      const formatTag = jsDocTags.find(tag => tag.name === 'format');
      if (formatTag) {
        jsonSchema.format = this.typescriptAdapter.getJSDocTagText(formatTag);
      }
    }

    return jsonSchema;
  }

}
