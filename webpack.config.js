// ContextReplacementPlugin = require("webpack/lib/ContextReplacementPlugin"),
// devPort = process.env.PORT = process.env.PORT || 8000;

var fs = require('fs'),
path = require("path"),
assign = require('object-assign'),
HtmlWebpackPlugin = require('html-webpack-plugin'),
version = require('./package.json').version,
webpack = require("webpack");

module.exports = {
  entry: {
    app: ['./app/app.js'],
  },

  output: {
    publicPath: '',
    path: 'dist/',
    filename: "bundle.js",
  },

  module:{
    noParse: [],
    loaders: [{
      test: /\.(js|jsx)$/,
      include: [/app/],
      exclude: [/(node_modules|persistence)/],
      loader: 'babel-loader',
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015', 'stage-0', 'react'],
        cacheDirectory: true
      }
      }, { test: /\.json$/, loader: 'json',
    }, { test: /\.css$/, exclude: /.(\-|\.)min.css$/, loader: 'style!css!postcss-loader'
      // }, { test: /\.sass/, loader: 'style!css!sass?sourceMap=true&indentedSyntax=sass&includePaths[]=' + (__dirname, "./src")
      }, { test: /\.(png|jpg|jpeg|svg|gif)$/, exclude:/icons/, loader: 'url?limit=8192&name=assets/images/[name].[ext]'
      }, { test: /\.(png|jpg|jpeg|svg|gif)$/, include:/icons/, loader: 'file?name=[name].[ext]'
      }, { test: [/index\.html$/, /\.(ico)/], loader: 'file?name=[name].[ext]'}
    ]
  },
  postcss: function() {
    return [
      //add postcss modules
    ];
  },

  plugins: [new HtmlWebpackPlugin({
    filename: 'index.html',
    version: version,
    inject: false,
    template: 'app/assets/index.htm'
    }
  )],

  target: "web",

  resolveLoader: {
    root: [path.join(__dirname, "node_modules"), './src', 'vendor'],
  },

  resolve: {
    root: "app",
    extensions: ["", ".js", ".jsx"],
    /* allow for root relative names in require */
    modulesDirectories: ['node_modules', 'src']
  },

  devServer: {
    contentBase: 'dist/',
    proxy: null,
    https: false,
    historyApiFallback: true,
    stats: {
      cached: false,
      exclude: [/node_modules/]
    }
  },
  /* settings for jshint */
  jshint: {
    "globals": { "__DEV__": true }
  },
};
