const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const {InjectManifest} = require('workbox-webpack-plugin')

const paths = require('./paths')
const getClientEnvironment = require('./env')
const webpackSettings = require('./webpackSettings')

const env = getClientEnvironment('')

module.exports = {
  // Don't attempt to continue if there are any errors.
  bail: true,
  mode: 'production',
  devtool: undefined,
  entry: {
    main: paths.appIndexJs
  },
  output: {
    path: paths.appBuild,
    filename: 'static/[name].[contenthash].js',
    publicPath: '/',
    assetModuleFilename: 'static/[hash][ext][query]'
  },
  resolve: {
    modules: [
      paths.appSrc,
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.scss', '.ts', '.tsx'],
  },
  module: {
    strictExportPresence: true,
    noParse: /node_modules\/ajv\/build\/ajv.bundle.js/,
    rules: [
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          webpackSettings.imageAssetRule,
          webpackSettings.babelRule,
          webpackSettings.productionCssRule,
          webpackSettings.generalAssetRule,
        ]
      },
    ], // end rules
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      name: false,
    }
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{js,mjs,jsx,ts,tsx}', // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
        options: {
          configFile: paths.eslintConfig,
          cache: true
        }
      },
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: false,
      publicPath: '/'
    }),
    new webpack.ids.HashedModuleIdsPlugin(),
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    // new InterpolateHtmlPlugin(env.raw), //<-- incompatible with webpack 4 as of 2018-03-19

    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
    new webpack.DefinePlugin(env.stringified),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebook/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      filename: "static/[name].[contenthash].css"
    }),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    new webpack.IgnorePlugin({ resourceRegExp: /regenerator|nodent|js\-beautify|\.\/locale/, contextRegExp: /ajv|moment/ }),
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new WebpackManifestPlugin({
      fileName: 'asset-manifest.json',
      basePath: '/',
      publicPath: '/',
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed)
        const entrypointFiles = entrypoints.main.filter(
          fileName => !fileName.endsWith('.map')
        )
        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        }
      }
    }),
    new InjectManifest({
      swSrc: paths.serviceWorkerSrc,
      dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
      // exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
      // Bump up the default maximum size (2mb) that's precached,
      // to make lazy-loading failure scenarios less likely.
      // See https://github.com/cra-template/pwa/issues/13#issuecomment-722667270
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
    })
  ],
}
