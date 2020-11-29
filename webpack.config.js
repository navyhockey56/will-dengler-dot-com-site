const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ProgressPlugin } = require("webpack");
const webpackMerge = require('webpack-merge');

const mode = process.env.mode || process.env.NODE_ENV || "none";

const environmentWebpack = () => {
  try {
    return require(`./webpack-extensions/webpack.${mode}.js`);
  } catch {
    console.error("Failed to load extension");
    return {};
  }
}

module.exports = () => {
  console.log("Webpack is buidling in mode:", mode);

  return webpackMerge.merge(
    {
      mode,
      module: {
        rules: [
          {
            test: /\.html$/,
            use: "html-loader"
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          },
          {
            test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
            use: 'file-loader?name=[name].[ext]'
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }),
        new ProgressPlugin()
      ]
    },
    environmentWebpack()
  )
}
