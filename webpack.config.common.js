var webpack = require('webpack');

module.exports = {
    entry: {
        'app': './assets/app/main.ts'
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                    'angular2-router-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                loader: 'raw-loader'
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                'file-loader',
                {
                    loader: 'image-webpack-loader',
                    query: {
                        progressive: true,
                        mozjpeg: {
                            progressive: true,
                        },
                        gifsicle: {
                            interlaced: false,
                            optimizationLevel: 4
                        },
                        optipng: {
                            optimizationLevel: 4
                        },
                        pngquant: {
                            quality: '75-90',
                            speed: 3,
                            optimizationLevel: 4
                        },
                        svgo: {
                            
                        }
                    }
                }
                ]
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            './src' // location of your src
        )
    ]
};