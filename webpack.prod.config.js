const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.config.js');
var webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = merge(common, {
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
        },
        output: {
          comments: false
        }
      }
    })
  ]
});
