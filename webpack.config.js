const path = require('path');
const webpack = require('webpack');

module.exports = env => {
  return {
    entry: './src/gui/index.tsx',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: [/node_modules/, /src\/server/]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
          DEBUG: env === 'debug' ? true : false
      })
    ],
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'build')
    },
    devtool: 'eval'
  }
};