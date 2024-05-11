import * as esbuild from 'esbuild';
import * as path from "node:path";
import * as fs from "node:fs";
import { tsToJsonSchemaPlugin } from '../packages/esbuild-plugin/src';

describe('ESBuild', () => {
  it('should build the project', async () => {
    const sampleDistDir = path.resolve(__dirname, 'samples/dist');
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
    const files = fs.readdirSync(sampleDistDir);

    expect(result.errors).toEqual([]); // No errors

    for (const file of files) {
      const testFile = path.resolve(sampleDistDir, file);
      const content = fs.readFileSync(testFile, 'utf-8');
      const testCases = eval(content);

      for (const [actual, expected] of testCases) {
        expect(actual).toEqual(expected);
      }
    }

    fs.rmSync(sampleDistDir, { recursive: true });
  }, 30000);
});
