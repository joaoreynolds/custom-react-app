const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const paths = require('./paths')


const esLintRule = {
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  enforce: 'pre',
  use: [
    {
      options: {
        configFile: paths.eslintConfig
      },
      loader: require.resolve('eslint-loader'),
    },
  ],
  include: [
    paths.appSrc
  ],
}

// "url" loader works like "file" loader except that it embeds assets
// smaller than specified limit in bytes as data URLs to avoid requests.
// A missing `test` is equivalent to a match.
const urlLoaderRule = {
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  loader: require.resolve('url-loader'),
  options: {
    limit: 10000,
    name: 'static/media/[name].[hash:8].[ext]',
  },
}

const babelRule = {
  test: /\.(js|mjs|jsx|ts|tsx)$/,
  include: [
    paths.appSrc
  ],
  use: [
    {
      loader: require.resolve('babel-loader'),
      options: {
        cacheDirectory: true,
        cacheCompression: false,
        // presets: [], <-- Presets and plugins should be added in package.json so that jest can see what they are
        // plugins: []
      }
    }
  ]
}

// "postcss" loader applies autoprefixer to our CSS. Even though this
// app doesn't use regular css (we use styled-components, we want to
// run post-css on external css files we might use from other library)
// "css" loader resolves paths in CSS and adds assets as dependencies.
// "style" loader turns CSS into JS modules that inject <style> tags.
// In production, we use a plugin to extract that CSS to a file, but
// in development "style" loader enables hot editing of CSS.
const stylesRule = {
  test: /\.css$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
  ],
}

const productionCssRule = {
  test: /\.css$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: false
      }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
  ]
}

// "file" loader makes sure those assets get served by WebpackDevServer.
// When you `import` an asset, you get its (virtual) filename.
// In production, they would get copied to the `build` folder.
// This loader doesn't use a "test" so it will catch all modules
// that fall through the other loaders.
const fileLoaderRule = {
  // Exclude `js` files to keep "css" loader working as it injects
  // its runtime that would otherwise be processed through "file" loader.
  // Also exclude `html` and `json` extensions so they get processed
  // by webpacks internal loaders.
  exclude: [/\.(js|mjs|jsx|ts|tsx|ttf|eot|svg|woff(2))$/, /\.html$/, /\.json$/],
  loader: require.resolve('file-loader'),
  options: {
    name: 'static/media/[name].[hash:8].[ext]',
  },
}

module.exports = {
  esLintRule,
  urlLoaderRule,
  babelRule,
  stylesRule,
  productionCssRule,
  fileLoaderRule
}
