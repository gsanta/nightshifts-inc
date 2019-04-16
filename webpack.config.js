const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => {
    return {
        entry: './src/client/index.tsx',
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
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.gwm$/,
                    use: 'raw-loader'
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {}
                        }
                    ]
                }
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
            path: path.resolve(__dirname, 'build'),
            library: 'thegame'
        },
        devtool: 'eval',
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://localhost:3001',
                    secure: false
                }
            },
            contentBase: ['.', './test'],
            port: 8765
        }
    }
};