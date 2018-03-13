const path = require('path');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';
const nodeExternals = require('webpack-node-externals');

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
    target: 'node',
    externals: [nodeExternals()]
};

module.exports = config;