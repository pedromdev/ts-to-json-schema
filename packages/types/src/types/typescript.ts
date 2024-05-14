import * as ts from 'typescript';

export type Type = ts.Type & {
  id?: number;
};
