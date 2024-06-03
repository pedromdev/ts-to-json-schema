import { Program, TransformerFactory, SourceFile } from 'typescript';
import { Visitor } from "./visitor";

export default function transform(program: Program): TransformerFactory<SourceFile> {
  const typeChecker = program.getTypeChecker();

  return (context) => (source) => {
    const visitor = new Visitor(typeChecker, context);

    return visitor.visit(source);
  }
}
