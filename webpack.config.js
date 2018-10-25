const path = require('path');
const webpack = require('webpack');

module.exports = env => {
  return {
    entry: './src/index.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
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