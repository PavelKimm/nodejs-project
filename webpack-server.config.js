const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  target: "node",
  entry: "./src/server/server.js",
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
  externals: {
    express: "commonjs express",
    mongoose: "commonjs mongoose",
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "./src/style.css", to: "" }],
    }),
  ],
};
