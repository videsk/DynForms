var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'dynforms.min.js',
        library: 'DynForm',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-es2015-destructuring', 'transform-object-rest-spread']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
