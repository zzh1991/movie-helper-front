const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const darkTheme = require('@ant-design/dark-theme');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  entry: {
    bundle: './index.js',
    vendor: [
      'react-redux',
      'react-router-dom',
      'redux',
      'redux-saga',
      'redux-thunk',
      'prop-types',
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
              },
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
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['../src/main/resources/static/built/*.*'],
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://cdnjs.cloudflare.com/ajax/libs/react/16.13.1/umd/react.production.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.13.1/umd/react-dom.production.min.js',
          global: 'ReactDOM',
        },
      ],
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new AntdDayjsWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
};
