const nodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  output: {
    filename: "serverBundle.js",
  },
  entry: "./src/server/server.js",
  externals: {
    express: "commonjs express",
    mongoose: "commonjs mongoose"
  },
  // externals: [nodeExternals()],
};
