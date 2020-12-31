const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const paths = require('./paths')

// "imageAssetRule" will either create a file in the build or returns inline data
// depending on the filesize (if it's larger than 8kb, a file path is returned)
const imageAssetRule = {
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  type: 'asset'
}

// "generalAssetRule" will either create a file in the build or returns inline data
// depending on the filesize (if it's larger than 8kb, a file path is returned)
const generalAssetRule = {
  // Exclude `js` files to keep "css" loader working as it injects
  // its runtime that would otherwise be processed through "file" loader.
  // Also exclude `html` and `json` extensions so they get processed
  // by webpacks internal loaders.
  exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
  type: 'asset'
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
        configFile: paths.babelConfig,
        // presets: [], <-- Presets and plugins should be added in .babelrc.js so that jest can see what they are
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
        postcssOptions: {
          // Necessary for external CSS imports to work
          // https://github.com/facebookincubator/create-react-app/issues/2677
          ident: 'postcss',
          plugins: [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              flexbox: 'no-2009',
            }),
          ],
        }
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
        postcssOptions: {
          // Necessary for external CSS imports to work
          // https://github.com/facebookincubator/create-react-app/issues/2677
          ident: 'postcss',
          plugins: [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              flexbox: 'no-2009',
            }),
          ],
        }
      },
    },
  ]
}

module.exports = {
  imageAssetRule,
  generalAssetRule,
  babelRule,
  stylesRule,
  productionCssRule
}
