import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  entry: {
    main: "./client/index.tsx"
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js" // [name] refers to the entry point key.
  },
  target: "web",
  module: {
    rules: [
      { test: /\.tsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.html$/, use: "html-loader" }
    ]
  },
  resolve: {
    extensions: ["ts", "tsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/index.html",
      filename: "./index.html",
      excludeChunks: ["server"]
    })
  ]
};
