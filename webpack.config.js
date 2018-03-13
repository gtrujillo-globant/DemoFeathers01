const webpack = require('webpack');
const path = require('path');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            // eslint-disable-line quote-props
            NODE_ENV: JSON.stringify(nodeEnv)
        }
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
            tslint: {
                emitErrors: true,
                failOnHint: true
            }
        }
    })
];

var config = {
    devtool: isProd ? 'hidden-source-map' : 'source-map',
    context: path.resolve('./src'),
    entry: {
        app: './index.ts'
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].bundle.map',
        devtoolModuleFilenameTemplate: function(info) {
            return 'file:///' + info.absoluteResourcePath;
        }
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts?$/,
                exclude: ['node_modules'],
                use: ['ts-loader', 'source-map-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: plugins
};

module.exports = config;