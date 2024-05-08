import { JsonSchema } from "@ts-to-json-schema/types";
import * as ts from 'typescript';
import { AbstractTransformHandler } from "./abstract-transform.handler";

type PropertyEntry = [string, ts.Symbol];

export class ClassOrObjectHandler extends AbstractTransformHandler {
  shouldTransform(type: ts.Type): boolean {
    return !!(
      (type.flags & ts.TypeFlags.Object)
      || (type.flags & ts.SymbolFlags.Interface)
      || (type.flags & ts.SymbolFlags.Class)
    );
  }

  transform(type: ts.Type): JsonSchema {
    const propertiesEntries = this.getPropertiesEntries(type);
    const properties = this.getProperties(propertiesEntries);
    const required = this.getRequiredList(propertiesEntries);

    return {
      type: 'object',
      properties: Object.keys(properties).length ? properties : undefined,
      required: required.length ? required : undefined,
    };
  }

  private getPropertiesEntries(type: ts.Type): PropertyEntry[] {
    const properties = this.transformer.typeChecker.getPropertiesOfType(type);
    const propertiesEntries: PropertyEntry[] = properties.map((property) => ([
      property.getName(),
      property,
    ]));

    return this.filterValidProperties(propertiesEntries);
  }

  private getProperties(propertiesEntries: PropertyEntry[]) {
    return propertiesEntries.reduce<Record<string, JsonSchema>>((acc, [key, value]) => {
      let type = this.getTypeFromSymbol(value);

      if (this.isOptional(type)) {
        const subtypes = type.types.filter((t) => !(t.flags & ts.TypeFlags.Undefined));
        type = subtypes.length === 1 ? subtypes[0] : type;
      }

      return {
        ...acc,
        [key]: this.transformer.transform(type),
      };
    }, {});
  }

  private getRequiredList(propertiesEntries: PropertyEntry[]) {
    return propertiesEntries
      .filter(([_, value]) => !this.isOptional(this.getTypeFromSymbol(value)))
      .map(([key]) => key);
  }

  private filterValidProperties(propertiesEntries: PropertyEntry[]): PropertyEntry[] {
    return propertiesEntries.filter(([_, value]) => !value || !(
      (value.flags & ts.SymbolFlags.Method)
      || (value.flags & ts.SymbolFlags.Function)
      || (value.flags & ts.SymbolFlags.Constructor)
    ));
  }

  private getTypeFromSymbol(symbol: ts.Symbol) {
    return this.transformer.typeChecker.getTypeOfSymbolAtLocation(symbol, this.transformer.node);
  }

  private isOptional(type: ts.Type): type is ts.UnionType {
    if (type.flags & ts.TypeFlags.Union) {
      return (<ts.UnionType>type).types.some((t) => !!(t.flags & ts.TypeFlags.Undefined));
    } else if (!type.symbol) {
      return false;
    } else if (type.symbol.flags & ts.SymbolFlags.Optional) {
      return true;
    }

    return false;
  }
}
