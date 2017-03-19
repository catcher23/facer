const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        './ui/index.jsx'
    ],

    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.(js|jsx)$/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    },
                    'img-loader'
                ]
            }
        ]
    },

    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '/ui/'),
    },

    plugins: [
        new webpack.NoErrorsPlugin()
    ],

    resolve: {
        extensions: ['.js', '.jsx']
    }
};
