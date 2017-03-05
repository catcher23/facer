const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        './src/app.jsx'
    ],
    vendor: [
        'react',
        'react-dom',
        'react-redux',
        'react-router'
    ]


    output: {
        path: path.join(__dirname, 'static'),
        filename: 'bundle.js',
        publicPath: '/'
    },

    plugins: [
        new webpack.NoErrorsPlugin()
    ],

    resolve: {
        extensions: ['.js', '.jsx']
    },

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
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        },
                        'sass-loader'
                    ]
                }),
                exclude: /node_modules/
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
    }
};
