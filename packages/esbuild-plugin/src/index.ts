import transform from "@ts-to-json-schema/transform";
import { Plugin } from 'esbuild';
import * as path from "path";
import * as ts from "typescript";

interface TsToJsonSchemaPluginOptions {
  tsConfigFile?: string;
  tsx?: boolean;
}

export const tsToJsonSchemaPlugin = (options: TsToJsonSchemaPluginOptions = {}): Plugin => ({
  name: 'ts-to-json-schema',
  setup(build) {
    let config: ts.ParsedCommandLine;
    const {
      tsConfigFile = path.resolve(process.cwd(), 'tsconfig.json'),
      tsx = false,
    } = options;

    build.onLoad({ filter: tsx ? /\.tsx?$/ : /\.ts$/ }, async (args) => {
      if (!config) {
        const tsConfigPath = ts.findConfigFile(
          process.cwd(),
          ts.sys.fileExists,
          tsConfigFile,
        );
        const readConfig = ts.readConfigFile(tsConfigPath!, ts.sys.readFile).config;

        config = ts.parseJsonConfigFileContent(
          readConfig,
          ts.sys,
          process.cwd(),
        );
      }

      const program = ts.createProgram([args.path], config.options);
      const sourceFile = program.getSourceFiles().find((sourceFile) => sourceFile.fileName.includes(args.path));
      const transformedSourceFile = ts.transform(
        sourceFile!,
        [transform(program)],
        config.options
      );
      const result = ts.createPrinter().printNode(
        ts.EmitHint.Unspecified,
        transformedSourceFile.transformed[0],
        sourceFile!
      );
      const contents = ts.transpile(result, config.options);

      return { contents };
    });
  }
});
