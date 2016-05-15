const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        './src/app.jsx'
    ],

    output: {
        path: path.join(__dirname, 'static'),
        filename: 'bundle.js',
        publicPath: '/'
    },

    plugins: [
        new webpack.NoErrorsPlugin()
    ],

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [{
            test: /\.jsx$/,
            loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
            include: path.join(__dirname, 'src'),
            exclude: /node_modules/,
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
        }, {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff',
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream',
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file',
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=image/svg+xml',
        }
        ]
    },

    devServer: {
        historyApiFallback: true,
        contentBase: 'static/',
        proxy: {
            '/api/*': {
                target: 'http://localhost:3000',
                secure: false,
            }
        }
    }
};