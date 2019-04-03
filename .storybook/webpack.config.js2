const path = require("path");
const SRC_PATH = path.join(__dirname, '../src/client');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [SRC_PATH],
    exclude: [/node_modules/, /src\/server/],
    use: [
        {
          loader: require.resolve('ts-loader'),
        },
        { loader: require.resolve('react-docgen-typescript-loader') }
      ]
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};