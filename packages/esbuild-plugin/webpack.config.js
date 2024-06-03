const webpackConfigFactory = require('../../lib/webpackConfigFactory');

module.exports = webpackConfigFactory('@ts-to-json-schema/esbuild-plugin', __dirname, {
  target: 'node',
});
