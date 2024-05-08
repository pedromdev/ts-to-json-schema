import { JsonSchema } from "@ts-to-json-schema/types";
import * as ts from 'typescript';
import { AbstractTransformHandler } from "./abstract-transform.handler";

export class EnumLikeHandler extends AbstractTransformHandler {
  shouldTransform(type: ts.Type): boolean {
    return !!(type.flags & ts.TypeFlags.EnumLike) || this.isUnionLikeEnum(type)
  }

  transform(type: ts.Type): JsonSchema {
    const values = this.getValues(type);

    if (values.every((value) => typeof value === 'string')) {
      return { type: 'string', enum: values };
    } else if (values.every((value) => typeof value === 'number')) {
      return { type: 'number', enum: values };
    }

    return { enum: values };
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
    return type.types.map((t) => JSON.parse(this.transformer.typeChecker.typeToString(t)));
  }

  private isUnionLikeEnum(type: ts.Type): type is ts.UnionType {
    try {
      if (!(type.flags & ts.TypeFlags.EnumLike) && type.flags & ts.TypeFlags.Union) {
        return (<ts.UnionType>type).types.every(
          (t) => !!(t.flags & ts.TypeFlags.StringLike || t.flags & ts.TypeFlags.NumberLike)
        ) && !!this.parseUnionValues(<ts.UnionType>type);
      }

      return false;
    } catch {
      return false;
    }
  }
}
