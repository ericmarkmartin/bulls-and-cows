import webpack from 'webpack';


export const devServer = ({ host, port }) => ({
  devServer: {
    historyApiFallback: true,
    hot: true,
    stats: 'errors-only',
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    overlay: {
      errors: true,
      warnings: true,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});

export const lintJavascript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include,
        exclude,
        enforce: 'pre',
        loader: 'eslint-loader',
        options,
      },
    ],
  },
});
