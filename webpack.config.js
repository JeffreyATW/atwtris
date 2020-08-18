const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const config = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ context: "public/", from: "**/*" }],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "docs"),
  },
};

if (process.env.NODE_ENV === "production") {
  config.mode = "production";
} else {
  config.devServer = {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 9000,
  };
  config.devtool = "eval-source-map";
}

module.exports = config;
