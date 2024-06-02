import compiler from '../packages/transform/src';
import * as path from "node:path";
import * as ts from 'typescript';

function getSchemaFromSourceFile(fileName: string) {
  const compilerOptions = {
    lib: ["dom", "es2015"],
    sourceMap: true,
    declaration: true,
    strict: true,
  };
  const samplePath = path.resolve(__dirname, fileName);
  const program = ts.createProgram([samplePath], compilerOptions);
  const sourceFile = program.getSourceFiles().find((sourceFile) => sourceFile.fileName.includes(samplePath));
  const transformedSourceFile = ts.transform(
    sourceFile!,
    [compiler(program)],
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

describe('Visitor', () => {
  it('should visit a source file', () => {
    const schema = getSchemaFromSourceFile('samples/visitor.sample.ts');

    expect(schema).toEqual({
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
        isDeveloper: { type: 'boolean' },
        createdAt: { type: 'string', format: 'date-time' },
        enum: { type: 'number', enum: [1, 2, 3] },
        stringEnum: { type: 'string', enum: ['A', 'B', 'C'] },
        mixedEnum: { enum: [1, 'B', 3] },
        question: { type: 'string', enum: ['yes', 'no'] },
        question2: { type: 'string', enum: ['yes', 'no'] },
        order: { type: 'number', enum: [0, 1, -1] },
        array: { type: 'array', items: { type: 'string' } },
        union: { anyOf: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }, { type: 'null' }] },
        intersection: {
          allOf: [
            {
              type: 'object',
              properties: {
                a: { type: 'number' }
              },
              required: ['a']
            },
            {
              type: 'object',
              properties: {
                b: {type: 'string'}
              },
              required: ['b']
            }
          ]
        },
        anyValue: {}
      },
      required: ['name', 'isDeveloper', 'createdAt', 'stringEnum', 'question2', 'order', 'array', 'union', 'intersection', 'anyValue']
    });
  });
});
