var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

var publicPath = path.join(__dirname, 'app', 'public');
var srcPath = path.join(__dirname, 'app', 'src');

module.exports = {
  entry: {
    js: path.join(srcPath, 'index.js')
  },
  output: {
    path: publicPath,
    filename: 'bundle.js'
  },
  module: {
    loaders:[{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: "babel"
    }, {
      test: /\.scss$/,
      exclude: /(node_modules)/,
      loader: ExtractTextPlugin.extract('style','css!postcss!less')
    }]
  },
  postcss: [ autoprefixer({ browsers: ['> 5%', 'last 2 versions'] }) ],
  plugins: [
    new CleanWebpackPlugin( publicPath, {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(srcPath , 'img'),
        to: path.join(publicPath , 'img')
      }
    ]),
    new ExtractTextPlugin("style.css", {
      allChunks: true
    })
  ]
};
