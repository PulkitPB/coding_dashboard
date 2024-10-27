const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",  // Set Webpack to production mode
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].[contenthash].js",  // Cache-busting with content hash
    clean: true,  // Clean old build files
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,  // Extracts CSS into separate files
          "css-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,  // Remove console statements
          },
        },
      }),
      new CssMinimizerPlugin(),  // Minify CSS files
    ],
    splitChunks: {
      chunks: "all",  // Split vendor and common code
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",  // Cache-busting for CSS
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),  // Set environment variable to production
    }),
  ],
  devtool: "source-map",  // Generate source maps for easier debugging
};
