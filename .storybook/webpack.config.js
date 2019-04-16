const path = require("path");
const SRC_PATH = path.join(__dirname, '../src/client');

module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: [/node_modules/, /src\/server/]
    }
  );
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};