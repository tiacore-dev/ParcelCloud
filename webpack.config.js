const path = require('path');
const webpack = require('webpack')
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = () => {
    const env = dotenv.config().parsed;

    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        mode: 'development',
        entry: './main.tsx',
        devtool: 'inline-source-map',
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'bundle.js',
            publicPath: '/',
            clean: true
        },
        devtool: 'inline-source-map',
        devServer: {
            static: './dist',
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            new webpack.DefinePlugin({process: {env: envKeys}})
        ]
    }
}