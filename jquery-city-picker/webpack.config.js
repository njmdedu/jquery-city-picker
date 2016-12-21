var html_webpack_plugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/js/index.js',
  },
  output: {
    path: __dirname + '/dist/js',
    filename: '[name].js'
  },
  module: {
  
  },
  plugins: [
    new html_webpack_plugin({
      filename: __dirname + '/dist/html/index.html',
      template: __dirname + '/src/html/index.html',
      inject: 'body',
      hash: true,
      //设置该页面引用入口的哪些js文件
      chunks: ['index']
    })
  ]
}
