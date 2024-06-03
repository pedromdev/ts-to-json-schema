const semver = require('semver');
const ts = require('typescript');

module.exports = semver.satisfies(ts.version, '>=5.0.0')
  ? require('ts-patch/compiler')
  : require('ttypescript');
