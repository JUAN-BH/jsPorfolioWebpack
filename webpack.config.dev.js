/** @type {import('webpack').Configuration} */
//Path esta disponible en node
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");
//Creacion de modulo que vamos a exportar con un objeto con la configuracion deseada
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"), //permite saber donde se encuentra nuestro proy para poderlo usar
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  mode: "development", //decimos que tiene al conf para desarrollo
  watch: true, //
  resolve: {
    //pasandole extensiones
    extensions: [".js"],
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/, //utiliza cualquier extension mjs o js
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i, //utiliza cualquier extension de css
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.png$/i, //utiliza cualquier extension de png
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash][ext]",
        },
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      inject: "body", //insercion de elementos
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name][contenthash].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
    new Dotenv(),
  ],
};
