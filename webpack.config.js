const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const SITE_URL = 'https://royalcut.uk';

// One entry per page: title and description are used for SEO
const pages = [
  {
    name: 'main',
    entry: './src/index.ts',
    template: './src/index.html',
    filename: 'index.html',
    path: '/',
    title: 'Royal Cut | Barbershop in South Ealing, London',
    description:
        'Royal Cut is a barbershop in South Ealing, London, offering haircuts, fades and beard trims. Book your appointment today.',
  },
  {
    name: 'about',
    entry: './src/pages/about/about.ts',
    template: './src/pages/about/about.html',
    filename: 'pages/about/about.html',
    path: '/about',
    title: 'Contact & About Us | Royal Cut South Ealing',
    description:
        'Find Royal Cut barbershop in South Ealing, London. Opening hours, address and how to book your next haircut.',
  },
  {
    name: 'products',
    entry: './src/pages/products/products.ts',
    template: './src/pages/products/products.html',
    filename: 'pages/products/products.html',
    path: '/products',
    title: 'Hair & Beard Products | Royal Cut South Ealing',
    description:
        'Hair and beard care products available at Royal Cut barbershop in South Ealing, London.',
  },
  {
    name: 'services',
    entry: './src/pages/services/services.ts',
    template: './src/pages/services/services.html',
    filename: 'pages/services/services.html',
    path: '/services',
    title: 'Services & Prices | Royal Cut South Ealing',
    description:
        'Haircuts, skin fades, beard trims and more. See services and prices at Royal Cut barbershop in South Ealing, London.',
  },
  {
    name: 'team',
    entry: './src/pages/team/team.ts',
    template: './src/pages/team/team.html',
    filename: 'pages/team/team.html',
    path: '/team',
    title: 'Meet the Team | Royal Cut South Ealing',
    description:
        'Meet the barbers at Royal Cut in South Ealing, London.',
  },
];

module.exports = (env, argv) => ({
  entry: Object.fromEntries(pages.map((p) => [p.name, p.entry])),

  devServer: {
    static: { directory: path.join(__dirname, 'dist') },
    compress: true,
    port: 8080,
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    publicPath: '/',
    // clean only for production builds: in dev mode it can delete copied images
    clean: argv.mode === 'production',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: { filename: 'product-images/[name].[contenthash][ext]' },
      },
    ],
  },

  plugins: [
    ...pages.map(
        (p) =>
            new HtmlWebpackPlugin({
              template: p.template,
              filename: p.filename,
              chunks: [p.name],
              title: p.title,
              meta: {
                description: p.description,
                'og:title': { property: 'og:title', content: p.title },
                'og:description': { property: 'og:description', content: p.description },
                'og:url': { property: 'og:url', content: SITE_URL + p.path },
                'og:type': { property: 'og:type', content: 'website' },
              },
            })
    ),

    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),

    new CopyPlugin({
      patterns: [
        { from: './src/product-images', to: 'product-images' },
        { from: './src/*.json', to: '[name][ext]', noErrorOnMissing: true },
        { from: '_redirects' },
        { from: './src/robots.txt', to: 'robots.txt' },
        { from: './src/sitemap.xml', to: 'sitemap.xml' },
      ],
    }),
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
});