const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // 开发模式
  entry: {
    index: './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist', // 告诉开发服务器(dev server)，在哪里查找文件
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  optimization: {
    // runtimeChunk: 'single', // 将 runtime 代码拆分为一个单独的 chunk
  },
};