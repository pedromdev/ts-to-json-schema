const defaultsDeep = require('lodash.defaultsdeep');
const path = require('path');
const DtsBundleWebpack = require('dts-bundle-webpack');
const nodeExternals = require('webpack-node-externals');

const root = path.resolve(__dirname, '..');

module.exports = function webpackConfigFactory(libname, dirname, config = {}) {
  return function (env, argv) {
    return defaultsDeep(config, {
      entry: path.resolve(dirname, 'src/index.ts'),
      devtool: argv.mode !== 'production' ? 'inline-source-map' : false,
      output: {
        filename: 'index.js',
        path: dirname,
        libraryTarget: 'umd',
        library: libname,
        umdNamedDefine: true,
        globalObject: 'this',
      },
      externals: [
        nodeExternals(),
        nodeExternals({
          modulesDir: path.resolve(root, 'node_modules')
        })
      ],
      resolve: {
        extensions: [".ts", ".tsx", ".js"]
      },
      module: {
        rules: [
          {
            test: /\.ts?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
          }
        ]
      },
      plugins: [
        new DtsBundleWebpack({
          name: libname,
          main: 'src/index.d.ts',
          out: path.join(dirname, 'index.d.ts'),
          removeSource: true
        }),
      ]
    });
  }
}

