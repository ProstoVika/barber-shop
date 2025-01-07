const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');


module.exports = {
    entry: {
        main: './src/index.ts',
        about: './src/pages/about/about.ts',
        products: './src/pages/products/products.ts',
        services: './src/pages/services/services.ts',
        team: './src/pages/team/team.ts',

    },
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 63342,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: 'pages/about/about.bundle.js',
        publicPath: '/',

    },
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: 'style-loader',
                        options: { injectType: 'singletonStyleTag' },
                    },
                    'css-loader',
                ],
            },

            {
                test: /\.json$/,
                loader: 'json-loader',
                type: 'javascript/auto',
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192, // Перетворює зображення в Data URL, якщо менше ніж 8KB
                            name: 'product-images/[name].[hash].[ext]', // Генеруємо унікальні імена файлів з хешем
                            outputPath: 'product-images/', // Зберігаємо в папку product-images
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 75, // Компресія для JPEG
                            },
                            optipng: {
                                enabled: true,
                                optimizationLevel: 5, // Компресія для PNG
                            },
                            pngquant: {
                                quality: [0.65, 0.9], // Якість PNG
                                speed: 4,
                            },
                            gifsicle: {
                                interlaced: false, // Оптимізація для GIF
                            },
                            webp: {
                                quality: 75, // Якість WebP
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html', filename: 'index.html', chunks:['main']}),
        new HtmlWebpackPlugin({ template: './src/pages/about/about.html', filename: 'pages/about/about.html', chunks:['about']}),
        new HtmlWebpackPlugin({ template: './src/pages/products/products.html', filename: 'pages/products/products.html', chunks:['products']}),
        new HtmlWebpackPlugin({ template: './src/pages/services/services.html', filename: 'pages/services/services.html', chunks:['services']}),
        new HtmlWebpackPlugin({ template: './src/pages/team/team.html', filename: 'pages/team/team.html', chunks:['team']}),


        new CopyPlugin({
            patterns: [
                { from: "./src/product-images", to: "product-images"},
                { from: "./src/*.json", to: "[name][ext]" },

            ],
        }),
    ],
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ]
    },
};
