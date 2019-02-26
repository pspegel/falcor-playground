import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

export default {
  name: 'client',
  entry: {
    // webpack-hot-middleware/client refers to client.js inside node_modules, not our client.
    main: ['webpack-hot-middleware/client', './client/index.tsx']
  },
  output: {
    // We only need a public path here since the client is build in memory.
    publicPath: '/'
  },
  mode: 'development', // Required because this config will be loaded server side. Otherwise it will default to prod.
  target: 'web',
  module: {
    rules: [
      { test: /\.tsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.html$/, use: 'html-loader' }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  plugins: [
    // Inject React app into custom HTML template. Without this plugin no index.html would exist in the dist folder.
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
