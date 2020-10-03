// const HtmlWebPackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const common = {
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
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
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
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
  // resolve: { alias: { "@material-ui/core": "@material-ui/core/es" } },
};

module.exports = [
  {
    ...common,
    entry: "./src/index.js",
    output: {
      // filename: "bundle.js",
      path: __dirname + "/dist",
    },
    // devServer: {
    //   port: 3000,
    //   historyApiFallback: true,
    // },
  },
  {
    ...common,
    target: "node",
    entry: "./src/server/server.js",
    externals: [nodeExternals()],
  },
];
