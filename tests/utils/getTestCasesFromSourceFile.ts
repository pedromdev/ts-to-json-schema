import * as path from "node:path";
import * as ts from "typescript";
import transport from "../../packages/transform/src";

export function getTestCasesFromSourceFile(fileName: string) {
  const compilerOptions = {
    lib: ["dom", "es2015"],
    sourceMap: true,
    declaration: true,
    strict: true,
  };
  const samplePath = path.resolve(__dirname, '../samples', fileName);
  const program = ts.createProgram([samplePath], compilerOptions);
  const sourceFile = program.getSourceFiles().find((sourceFile) => sourceFile.fileName.includes(samplePath));
  const transformedSourceFile = ts.transform(
    sourceFile!,
    [transport(program)],
    compilerOptions
  );
  const result = ts.createPrinter().printNode(
    ts.EmitHint.Unspecified,
    transformedSourceFile.transformed[0],
    sourceFile!
  );
  const transpiledCode = ts.transpile(result, compilerOptions);
  return eval(transpiledCode);
}
