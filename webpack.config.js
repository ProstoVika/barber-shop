const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { SITE_URL, SHARE_IMAGE, pages } = require('./config/site');
const layout = require('./config/layout');

// Every page lives in src/pages/<name>/<name>.html|ts|scss.
// Home is served as /index.html, the rest as /pages/<name>/<name>.html
// (clean URLs like /team are mapped in src/public/_redirects).
const pageDir = (page) => `./src/pages/${page.name}`;
const outputFile = (page) => page.output || `pages/${page.name}/${page.name}.html`;

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production';

    return {
        mode: isProd ? 'production' : 'development',
        devtool: isProd ? false : 'eval-source-map',

        entry: Object.fromEntries(pages.map((page) => [page.name, `${pageDir(page)}/${page.name}.ts`])),

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProd ? '[name].[contenthash:8].js' : '[name].js',
            publicPath: '/',
            clean: true,
        },

        resolve: {
            extensions: ['.ts', '.js'],
        },

        module: {
            rules: [
                // onlyCompileBundledFiles: old leftover .ts files in src/ don't break the build
                { test: /\.ts$/, loader: 'ts-loader', options: { onlyCompileBundledFiles: true }, exclude: /node_modules/ },
                { test: /\.s?css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
                {
                    test: /\.(woff2?)$/i,
                    type: 'asset/resource',
                    generator: { filename: 'fonts/[name].[contenthash:8][ext]' },
                },
            ],
        },

        plugins: [
            ...pages.map((page) => new HtmlWebpackPlugin({
                template: `${pageDir(page)}/${page.name}.html`,
                filename: outputFile(page),
                chunks: [page.name],
                title: page.title,
                meta: {
                    description: page.description,
                    'og:title': { property: 'og:title', content: page.title },
                    'og:description': { property: 'og:description', content: page.description },
                    'og:url': { property: 'og:url', content: SITE_URL + page.url },
                    'og:type': { property: 'og:type', content: 'website' },
                    'og:image': { property: 'og:image', content: SHARE_IMAGE },
                },
                // Used in templates as <%= htmlWebpackPlugin.options.layout.header %> etc.
                layout: {
                    head: layout.head(page),
                    header: layout.header(page),
                    footer: layout.footer(),
                },
            })),

            new MiniCssExtractPlugin({
                filename: isProd ? '[name].[contenthash:8].css' : '[name].css',
            }),

            new CopyPlugin({
                patterns: [
                    { from: 'src/public', to: '.' },                         // favicons, robots, sitemap, _redirects, products.json
                    { from: 'src/product-images', to: 'product-images' },
                ],
            }),
        ],

        // Images/video are large on purpose (hero video), don't warn about them
        performance: { hints: false },

        devServer: {
            static: path.join(__dirname, 'dist'),
            compress: true,
            port: 63342,
            // Clean URLs locally, same as _redirects on Netlify
            historyApiFallback: {
                rewrites: pages
                    .filter((page) => page.url !== '/')
                    .map((page) => ({ from: new RegExp(`^${page.url}/?$`), to: `/${outputFile(page)}` })),
            },
        },
    };
};
