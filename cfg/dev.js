'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');
let CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let config = Object.assign({}, baseConfig, {
  entry: {
    //index:[
    //  'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
    //  'webpack/hot/only-dev-server',
    //  './src/index'
    //],
    settlement:[
      'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
      'webpack/hot/only-dev-server',
      './src/index'
    ],
    vendor:['react','react-dom']
  },
  //entry:{
  //  index:"./src/index",
  //  react:['react']
  //},
  output: {
    path: path.join(__dirname, '/../dist'),
    filename: "[name].js",
    publicPath: defaultSettings.publicPath
  },
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    //new ExtractTextPlugin('[name].css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new CommonsChunkPlugin({
        name:['vendor'],
        minChunks:Infinity
    }),
    //new HtmlWebpackPlugin({
    //  filename: `test.html`,
    //  template: `${defaultSettings.srcPath}/entry/index.html`,
    //  inject:`body`,
    //  chunks:['index','vendor']
    //}),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: `${defaultSettings.srcPath}/entry/settlement.html`,
      inject:`body`,
      chunks:['settlement','vendor']
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    })
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

module.exports = config;
