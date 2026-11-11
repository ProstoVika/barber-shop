const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const SITE_URL = 'https://royalcut.uk';

// Pages: clean URL (same as _redirects and sitemap.xml) + SEO texts
const pages = [
    { chunk: 'main', template: './src/index.html', filename: 'index.html', url: '/',
        title: 'Royal Cut | Barbershop in South Ealing, London',
        description: 'Royal Cut is a barbershop in South Ealing, London, offering haircuts, fades and beard trims. Book your appointment today.' },
    { chunk: 'about', template: './src/pages/about/about.html', filename: 'pages/about/about.html', url: '/about',
        title: 'Contact & About Us | Royal Cut South Ealing',
        description: 'Find Royal Cut barbershop in South Ealing, London. Opening hours, address and how to book your next haircut.' },
    { chunk: 'products', template: './src/pages/products/products.html', filename: 'pages/products/products.html', url: '/products',
        title: 'Hair & Beard Products | Royal Cut South Ealing',
        description: 'Hair and beard care products available at Royal Cut barbershop in South Ealing, London.' },
    { chunk: 'services', template: './src/pages/services/services.html', filename: 'pages/services/services.html', url: '/services',
        title: 'Services & Prices | Royal Cut South Ealing',
        description: 'Haircuts, skin fades, beard trims and more. See services and prices at Royal Cut barbershop in South Ealing, London.' },
    { chunk: 'team', template: './src/pages/team/team.html', filename: 'pages/team/team.html', url: '/team',
        title: 'Gallery | Royal Cut South Ealing',
        description: 'Photos of haircuts, fades and beard trims from Royal Cut barbershop in South Ealing, London.' },
];

// Business details for Google (structured data on the home and contact pages)
// Each location is a separate object with its own @context (most compatible with validators)
const BUSINESS = [
    {
        '@context': 'https://schema.org',
        '@type': 'BarberShop',
        name: 'Royal Cut South Ealing',
        url: SITE_URL + '/',
        image: SITE_URL + '/product-images/1.jpeg',
        telephone: '+44 20 8567 7342',
        priceRange: '£12-£27',
        address: {
            '@type': 'PostalAddress',
            streetAddress: '134A South Ealing Road',
            addressLocality: 'London',
            postalCode: 'W5 4QJ',
            addressCountry: 'GB',
        },
        openingHours: ['Mo-Fr 09:00-19:00', 'Sa 09:00-18:00', 'Su 10:00-17:00'],
        sameAs: ['https://www.facebook.com/p/Royal-cut-100057832162337/'],
    },
    {
        '@context': 'https://schema.org',
        '@type': 'BarberShop',
        name: 'Royal Cut The Vale',
        url: SITE_URL + '/about',
        image: SITE_URL + '/product-images/1.jpeg',
        telephone: '+44 20 7041 9409',
        priceRange: '£12-£27',
        address: {
            '@type': 'PostalAddress',
            streetAddress: '11 The Vale',
            addressLocality: 'London',
            postalCode: 'W3 7SH',
            addressCountry: 'GB',
        },
        openingHours: ['Mo-Sa 10:00-19:00', 'Su 10:00-18:00'],
        sameAs: ['https://www.facebook.com/p/Royal-cut-100057832162337/'],
    },
];
const STRUCTURED_DATA_PAGES = ['index.html', 'pages/about/about.html'];

// Favicon for browser tabs and Google search results (square PNG, e.g. 192x192)
const FAVICON = './src/favicon.png';
const hasFavicon = fs.existsSync(path.resolve(__dirname, FAVICON));

/**
 * Fixes every page during the build, so the HTML templates don't need editing:
 * - menu links -> clean URLs (/team, /services ...), same as in sitemap.xml
 * - adds a canonical link if the page doesn't have one
 * - logo: no lazy loading, descriptive alt text
 * - phone links match the numbers shown on the page
 * - fixes the Cyrillic "С" in "Royal Сut", footer "MEET?" -> "VISIT US"
 * - business structured data on the home and contact pages
 */
class CleanSeoPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap('CleanSeoPlugin', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tap('CleanSeoPlugin', (data) => {
                const page = pages.find((p) => p.filename === data.outputName);
                let html = data.html;

                // Menu and button links
                html = html.replace(/href=(["'])(?:\.\.\/)*\/?index\.html\1/g, 'href=$1/$1');
                html = html.replace(/href=(["'])(?:\.\.\/)*\/?pages\/(about|products|services|team)\/\2(?:\.html)?\1/g, 'href=$1/$2$1');

                // Logo image (6.png)
                html = html.replace(/<img([^>]*?)src=(["'])((?:\.\.\/)*\/?product-images\/6\.png)\2([^>]*?)\/?>/g, (m, before, q, src, after) => {
                    const attrs = (before + after).replace(/\s*loading=(["'])lazy\1/g, '').replace(/\s*alt=(["'])[^"']*\1/g, '');
                    return `<img${attrs} src=${q}${src}${q} alt="Royal Cut barbershop logo"/>`;
                });

                // Phone links: use the number written in the link text (e.g. "T: 020 8567 7342")
                html = html.replace(/<a([^>]*?)href=(["'])tel:[^"']*\2([^>]*)>([^<]*?)(0\d[\d ]{8,})([^<]*)<\/a>/g,
                    (m, before, q, after, textBefore, number, textAfter) => {
                        const digits = number.replace(/\s/g, '').replace(/^0/, '');
                        return `<a${before}href=${q}tel:+44${digits}${q}${after}>${textBefore}${number}${textAfter}</a>`;
                    });

                // Cyrillic letters that look like Latin "C"/"c" in the brand name
                html = html.replace(/Royal [\u0421\u0441]ut/g, 'Royal Cut');

                // Footer heading
                html = html.replace(/>\s*MEET\?\s*</g, '>VISIT US<');

                // Structured data for Google
                if (STRUCTURED_DATA_PAGES.includes(data.outputName) && !html.includes('application/ld+json')) {
                    html = html.replace('</head>',
                        `    <script type="application/ld+json">${JSON.stringify(BUSINESS)}</script>\n</head>`);
                }

                // Canonical
                if (page && !/rel=["']?canonical/.test(html)) {
                    html = html.replace('</head>', `    <link rel="canonical" href="${SITE_URL}${page.url}">\n</head>`);
                }

                data.html = html;
                return data;
            });
        });
    }
}

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
        // Clean URLs work locally too (like _redirects on Netlify)
        historyApiFallback: {
            rewrites: [
                { from: /^\/about\/?$/, to: '/pages/about/about.html' },
                { from: /^\/products\/?$/, to: '/pages/products/products.html' },
                { from: /^\/services\/?$/, to: '/pages/services/services.html' },
                { from: /^\/team\/?$/, to: '/pages/team/team.html' },
            ],
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: 'pages/about/about.bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
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
        ...pages.map((p) => new HtmlWebpackPlugin({
            template: p.template,
            filename: p.filename,
            chunks: [p.chunk],
            title: p.title,
            ...(hasFavicon ? { favicon: FAVICON } : {}),
            meta: {
                description: p.description,
                'og:title': { property: 'og:title', content: p.title },
                'og:description': { property: 'og:description', content: p.description },
                'og:url': { property: 'og:url', content: SITE_URL + p.url },
                'og:type': { property: 'og:type', content: 'website' },
                'og:image': { property: 'og:image', content: SITE_URL + '/product-images/1.jpeg' },
            },
        })),

        new CleanSeoPlugin(),

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