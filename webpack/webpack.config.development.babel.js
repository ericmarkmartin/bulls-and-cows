import webpack from 'webpack';
import merge from 'webpack-merge';
import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import commonConfig from './webpack.config.common';

const config = {
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '../client/index.jsx'),
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HTMLWebpackPlugin({
      template: path.join(__dirname, '../client/public/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};

const developmentConfig = merge(commonConfig, config);

export default developmentConfig;
