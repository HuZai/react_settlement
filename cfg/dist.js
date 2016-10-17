'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
let config = Object.assign({}, baseConfig, {
  //entry: path.join(__dirname, '../src/index'),
  entry:{
    index:"./src/index",
    vendor:['react','react-dom']
  },
  cache: false,
  devtool: 'false',
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CommonsChunkPlugin({
      name:['vendor'],
      minChunks:Infinity
    }),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: `${defaultSettings.srcPath}/entry/settlement.html`,
      inject:`body`,
      chunks:['index','vendor']
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
