'use strict'

var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var paths = require('./paths')

module.exports = {
  entry: [
    // this is your app's code:
    paths.appMainJs
  ],
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.appBuild
  },
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We read `NODE_PATH` environment variable in `paths.js` and pass paths here.
    // We use `fallback` instead of `root` because we want `node_modules` to "win"
    // if there any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    fallback: paths.nodePaths,
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    extensions: ['.js', '.json', '.jsx', '.styl', ''],
    alias: {
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
      '~config': paths.srcConfig,
      '~components': paths.srcComponents,
      '~containers': paths.srcContainers,
      '~static': paths.srcStatic,
      '~layouts': paths.srcLayouts,
      '~routes': paths.srcRoutes,
      '~store': paths.srcStore,
      '~styles': paths.srcStyles,
      '~service': paths.srcService,
      '~utils': paths.srcUtils
    }
  },
  module: {
    // First, run the linter.
    // It's important to do this before Babel processes the JS.
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
        include: paths.appSrc,
      }
    ],
    loaders: [
      // JSON is not enabled by default in Webpack but both Node and Browserify
      // allow it implicitly so we also enable it.
      {
        test: /\.json$/,
        loader: 'json'
      },
      // "file" loader for svg
      {
        test: /\.svg$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[hash:base64:20].[ext]&limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[hash:base64:20].[ext]&limit=10000&mimetype=application/font-woff2' },
      { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[hash:base64:20].[ext]&limit=10000&mimetype=font/opentype' },
      { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[hash:base64:20].[ext]&limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[hash:base64:20].[ext]' },
      { test: /\.(png|jpg|gif)$/,    loader: 'url?limit=8192' }
    ]
  },
  postcss: function() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
        discardComments: {
          removeAll: true
        },
        discardUnused: false,
        mergeIdents: false,
        reduceIdents: false,
        safe: true,
        sourcemap: true
      }),
    ]
  },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
