/*jshint esversion: 6 */
const path = require('path');

module.exports = {
  entry: './static_src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'static/build'),
    filename: 'app.js',
    publicPath: 'static/build/',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'static_src'), 'node_modules'],
    extensions: ['.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'static_src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
    ],
  },
};
