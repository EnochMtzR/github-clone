const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CompressionPlugin = require("compression-webpack-plugin");

const publicPath = path.join(__dirname, "public", "dist");

module.exports = env => {
  const isProduction = env === "production";

  return {
    entry: "./src/app.jsx",
    output: {
      path: publicPath,
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.jsx$/,
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: "styles.css" }),
      new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ],
    devtool: isProduction ? "source-map" : "cheap-module-eval-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true,
      publicPath: "/dist/"
    },
    mode: "production",
    resolve: {
      extensions: [".js", ".jsx"]
    }
  };
};
