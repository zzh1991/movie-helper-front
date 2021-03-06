const webpack = require('webpack');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const path = require('path');

const port = process.env.PORT || 3000;

module.exports = {
  mode: 'development',
  entry: {
    bundle: './index.js',
    vendor: [
      'react-redux',
      'react-router-dom',
      'redux',
      'redux-saga',
      'redux-thunk',
    ],
  },
  output: {
    // path: path.resolve(__dirname, 'src/main/resources/static/built'),
    filename: '[name].js',
    publicPath: '/built/',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'jsx',
              target: 'es2015',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              sourceMap: true,
            },
          },
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'css',
            },
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
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin(),
    new AntdDayjsWebpackPlugin(),
  ],
  devServer: {
    host: '0.0.0.0',
    port,
    proxy: {
      '*': {
        target: 'http://localhost:8080',
        secure: false,
        prependPath: false,
        changeOrigin: false,
      },
    },
    historyApiFallback: true,
    open: false,
    hot: true,
  },
};
