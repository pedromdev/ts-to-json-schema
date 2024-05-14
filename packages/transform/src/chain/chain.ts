import { Class } from "@ts-to-json-schema/types";
import { StringHandler } from "./string.handler";
import { NumberHandler } from "./number.handler";
import { BooleanHandler } from "./boolean.handler";
import { EnumLikeHandler } from "./enum-like.handler";
import { AbstractTransformHandler } from "./abstract-transform.handler";
import { ClassOrObjectHandler } from "./class-or-object.handler";
import { UnionHandler } from "./union.handler";
import { IntersectionHandler } from "./intersection.handler";
import { ArrayHandler } from "./array.handler";
import { NullHandler } from "./null.handler";
import { DateHandler } from "./date.handler";
import { AnyHandler } from "./any.handler";

export type TransformChain = Class<AbstractTransformHandler>[];

export const transformChain: TransformChain = [
  AnyHandler,
  StringHandler,
  NumberHandler,
  BooleanHandler,
  DateHandler,
  NullHandler,
  EnumLikeHandler,
  ArrayHandler,
  ClassOrObjectHandler,
  UnionHandler,
  IntersectionHandler,
];
