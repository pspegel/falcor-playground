import path from "path";
import nodeExternals from "webpack-node-externals";

export default {
  entry: {
    server: "./server/index.ts"
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js" // [name] refers to the entry point filename.
  },
  target: "node",
  node: {
    // Tell Node to set these variables to the output file.
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()], // Do not bundle any node_modules
  module: {
    rules: [
      { test: /\.tsx?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  resolve: {
    extensions: ["ts", "tsx"]
  }
};
