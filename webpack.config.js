const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// SEO: title, description and Open Graph tags for each page
const SITE_URL = 'https://royalcut.uk';
const seo = (title, description, pagePath) => ({
    title,
    meta: {
        description,
        'og:title': { property: 'og:title', content: title },
        'og:description': { property: 'og:description', content: description },
        'og:url': { property: 'og:url', content: SITE_URL + pagePath },
        'og:type': { property: 'og:type', content: 'website' },
        // 'og:image': { property: 'og:image', content: SITE_URL + '/product-images/YOUR-PHOTO.jpg' },
    },
});

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
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
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
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'product-images/',
                        }
                    }
                ]
            }
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html', filename: 'index.html', chunks:['main'],
            ...seo('Royal Cut | Barbershop in South Ealing, London',
                'Royal Cut is a barbershop in South Ealing, London, offering haircuts, fades and beard trims. Book your appointment today.', '/') }),
        new HtmlWebpackPlugin({ template: './src/pages/about/about.html', filename: 'pages/about/about.html', chunks:['about'],
            ...seo('Contact & About Us | Royal Cut South Ealing',
                'Find Royal Cut barbershop in South Ealing, London. Opening hours, address and how to book your next haircut.', '/about') }),
        new HtmlWebpackPlugin({ template: './src/pages/products/products.html', filename: 'pages/products/products.html', chunks:['products'],
            ...seo('Hair & Beard Products | Royal Cut South Ealing',
                'Hair and beard care products available at Royal Cut barbershop in South Ealing, London.', '/products') }),
        new HtmlWebpackPlugin({ template: './src/pages/services/services.html', filename: 'pages/services/services.html', chunks:['services'],
            ...seo('Services & Prices | Royal Cut South Ealing',
                'Haircuts, skin fades, beard trims and more. See services and prices at Royal Cut barbershop in South Ealing, London.', '/services') }),
        new HtmlWebpackPlugin({ template: './src/pages/team/team.html', filename: 'pages/team/team.html', chunks:['team'],
            ...seo('Meet the Team | Royal Cut South Ealing',
                'Meet the barbers at Royal Cut in South Ealing, London.', '/team') }),

        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',}),

        new CopyPlugin({
            patterns: [
                { from: "./src/product-images", to: "product-images"},
                { from: "./src/*.json", to: "[name][ext]" },
                { from: "_redirects" },
                { from: "./src/robots.txt", to: "robots.txt", noErrorOnMissing: true },
                { from: "./src/sitemap.xml", to: "sitemap.xml", noErrorOnMissing: true },


            ],
        }),
    ],
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ]
    },
};
