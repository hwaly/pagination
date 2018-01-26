const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        'pagination': [
            './src/pagination-test.js',
            './src/pagination.scss'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                sourceMap: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                outputStyle: 'expanded',
                                sourceMap: true
                            }
                        },
                    ],

                    fallback: 'style-loader'
                })
            }
        ]
    },
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        contentBase: [path.resolve(__dirname, 'dist'), path.resolve(__dirname, 'test')],
        historyApiFallback: true,
        noInfo: true,
        compress: true
    },
    plugins: [
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath('[name].css').replace('js/', 'css/');
            }
        })
    ]
};

if (process.env.NODE_ENV === 'production' || process.argv.includes('-p')) {
    module.exports.devtool = false;

    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),

        new UglifyJSPlugin({
            sourceMap: true,
            uglifyOptions: {
                compress: {
                    warnings: false,
                    drop_console: true,
                },
                output: {
                    comments: false
                }
            }
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}