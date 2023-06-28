import * as CopyPlugin from "copy-webpack-plugin";
import * as webpack from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const config: webpack.Configuration = {
  entry: {
    popup: "./service/popup.ts",
    background: "./service/background.ts",
    content: "./service/content.ts",
  },
  output: {
    path: __dirname + "/dist",
    filename: "./page/assets/js/[name].js",
  },
  resolve: {
    extensions: [".ts", ".js", "json"],
  },
  watchOptions: {
    ignored: ["**/node_modules", "**/dist"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html?$/,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: [
          // 由于是默认行为，`injectType` 选项可以省略
          "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new CopyPlugin({
      patterns: [{ from: "./manifest.json" }, { from: "./page", to: "./page" }],
    }),
  ],
};
export default config;
