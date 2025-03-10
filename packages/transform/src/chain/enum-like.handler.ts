import { JsonSchema, PrimitiveType } from "@ts-to-json-schema/types";
import * as ts from 'typescript';
import { AbstractTransformHandler } from "./abstract-transform.handler";
import { CycleResolver } from "../cycle.resolver";

export class EnumLikeHandler extends AbstractTransformHandler {
  shouldTransform(type: ts.Type): boolean {
    return !!(type.flags & ts.TypeFlags.EnumLike) || this.isUnionLikeEnum(type)
  }

  transform(type: ts.Type, originSymbol?: ts.Symbol): JsonSchema {
    const values = this.getValues(type);
    let schema: JsonSchema;

    if (values.every((value) => typeof value === 'string')) {
      schema = { type: 'string' as PrimitiveType, enum: values };
    } else if (values.every((value) => typeof value === 'number')) {
      schema = { type: 'number' as PrimitiveType, enum: values };
    } else {
      schema = { enum: values };
    }

    return CycleResolver.ignore(this.addMetadata(schema, originSymbol));
  }

  private getValues(type: ts.Type) {
    if (this.isUnionLikeEnum(type)) {
      return this.parseUnionValues(type);
    }

    const symbol = type.getSymbol()!;
    const declaration = symbol.declarations![0] as ts.EnumDeclaration;

    return declaration.members.map((member) => this.transformer.typeChecker.getConstantValue(member));
  }

  private parseUnionValues(type: ts.UnionType) {
    return type.types.filter((t) => !(t.flags & ts.TypeFlags.Undefined)).map((t) => {
      const enumMember = t.getSymbol()?.valueDeclaration;

      if (enumMember && ts.isEnumMember(enumMember)) {
        return this.transformer.typeChecker.getConstantValue(enumMember);
      }

      return JSON.parse(this.transformer.typeChecker.typeToString(t));
    });
  }

  private isUnionLikeEnum(type: ts.Type): type is ts.UnionType {
    try {
      if (!(type.flags & ts.TypeFlags.EnumLike) && type.flags & ts.TypeFlags.Union) {
        return (<ts.UnionType>type).types.filter((t) => !(t.flags & ts.TypeFlags.Undefined)).every(
          (t) => !!(t.flags & ts.TypeFlags.StringLike || t.flags & ts.TypeFlags.NumberLike)
        ) && !!this.parseUnionValues(<ts.UnionType>type);
      }

      return false;
    } catch {
      return false;
    }
  }
}
