const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const darkTheme = require('@ant-design/dark-theme');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
// const uglify = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    bundle: './index.js',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'redux',
      'redux-saga',
      'redux-thunk',
      'prop-types',
      'immutable',
      'styled-components',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../src/main/resources/static/'),
    filename: 'built/[name].[hash].js',
    chunkFilename: 'built/[name].[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: darkTheme.default,
              }
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: '../src/main/resources/static/images/',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: 'vendor',
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '../src/main/resources/html-template/index.html',
      filename: '../templates/index.html',
    }),
    // new uglify(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['../src/main/resources/static/built/*.*'],
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new AntdDayjsWebpackPlugin(),
  ],
};
