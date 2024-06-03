import * as esbuild from 'esbuild';
import * as path from "path";
import * as fs from "fs";
import { tsToJsonSchemaPlugin } from '../packages/esbuild-plugin/src';

function executeTestCasesFromDir(dir: string) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const testFile = path.resolve(dir, file);
    const content = fs.readFileSync(testFile, 'utf-8');
    const testCases = eval(content);

    for (const [actual, expected] of testCases) {
      expect(actual).toEqual(expected);
    }
  }
}

describe('ESBuild', () => {
  const sampleDistDir = path.resolve(__dirname, 'samples/dist');

  afterEach(() => {
    if (fs.existsSync(sampleDistDir)) {
      fs.rmdirSync(sampleDistDir, { recursive: true });
    }
  });

  it('should build the project', async () => {
    const result = await esbuild.build({
      entryPoints: ['tests/samples/*.ts'],
      platform: 'node',
      outdir: sampleDistDir,
      format: 'cjs',
      bundle: true,
      plugins: [tsToJsonSchemaPlugin({
        tsConfigFile: 'tsconfig.spec.json',
      })],
    });

    expect(result.errors).toEqual([]); // No errors

    executeTestCasesFromDir(sampleDistDir);
  }, 30000);

  it('should use default config file', async () => {
    const result = await esbuild.build({
      entryPoints: ['tests/samples/*.ts'],
      platform: 'node',
      outdir: sampleDistDir,
      format: 'cjs',
      bundle: true,
      plugins: [tsToJsonSchemaPlugin()],
    });

    expect(result.errors).toEqual([]); // No errors
  }, 30000);

  it('should build TSX files', async () => {
    const result = await esbuild.build({
      entryPoints: ['tests/samples/*.tsx'],
      platform: 'node',
      outdir: sampleDistDir,
      format: 'cjs',
      bundle: true,
      plugins: [tsToJsonSchemaPlugin({
        tsx: true,
      })],
    });

    expect(result.errors).toEqual([]); // No errors

    executeTestCasesFromDir(sampleDistDir);
  }, 30000);
});
