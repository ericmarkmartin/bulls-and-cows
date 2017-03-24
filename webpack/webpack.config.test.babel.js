import nodeExternals from 'webpack-node-externals';
import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import merge from 'webpack-merge';
import commonConfig from './webpack.config.common';

const config = {
  target: 'node',
  externals: [nodeExternals()],
  output: {
    // use absolute paths in sourcemaps (important for debugging via IDE)
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
  },
  devtool: 'inline-cheap-module-source-map',
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, '../client/public/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};

const testConfig = merge(commonConfig, config);

export default testConfig;
