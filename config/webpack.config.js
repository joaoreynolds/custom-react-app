const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')

const paths = require('./paths')
const getClientEnvironment = require('./env')
const webpackSettings = require('./webpackSettings')

const env = getClientEnvironment('')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: [
    paths.appIndexJs
  ],
  output: {
    filename: 'static/js/[name].js',
    publicPath: '/'
  },
  devServer: {
    contentBase: paths.appPublic,
    historyApiFallback: true,
    // hot: true,
    clientLogLevel: 'none',
    overlay: true,
    open: true,
    quiet: false,
    stats: 'minimal'
  },
  resolve: {
    modules: [
      paths.appSrc,
      'node_modules' // paths.appNodeModules isn't compatible with react-router if you want to use NavLink active class for some weird reason
    ],
    extensions: ['.js', '.jsx', '.scss'],
  },
  module: {
    strictExportPresence: true,
    noParse: /node_modules\/ajv\/build\/ajv.bundle.js/,
    rules: [
      webpackSettings.esLintRule,
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          webpackSettings.urlLoaderRule,
          webpackSettings.babelRule,
          webpackSettings.stylesRule,
          webpackSettings.fileLoaderRule,
        ]
      },
    ], // end rules
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      myPublicUrl: env.stringified.PUBLIC_URL
    }),
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    // new InterpolateHtmlPlugin(env.raw), //<-- incompatible with webpack 4 as of 2018-03-19

    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
    new webpack.DefinePlugin(env.stringified),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebook/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    new WebpackNotifierPlugin(),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    new webpack.IgnorePlugin(/regenerator|nodent|js\-beautify|\.\/locale/, /ajv|moment/),
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: '/',
    })
  ],

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
}
