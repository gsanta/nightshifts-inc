const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => {
  return {
    entry: './src/gui/index.tsx',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: [/node_modules/, /src\/server/]
        },
        {
          test: /\.scss$/,
          use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader'
          ]
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
          filename: "app.css",
          allChunks: true
      }),
      new webpack.DefinePlugin({
          DEBUG: env === 'debug' ? true : false
      })
    ],
    resolve: {
      extensions: [ '.tsx', '.ts', '.js', 'scss', '.css' ]
    },
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'build')
    },
    devtool: 'eval'
  }
};