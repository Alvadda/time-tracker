const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
var webpack = require('webpack')
require('dotenv').config({ path: './.env' })

const outputPath = path.resolve(__dirname, 'dist')

module.exports = ({ prod }) => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new CopyPlugin({
      patterns: [{ from: 'public/pwa', to: './' }],
    }),
  ]

  if (prod) {
    plugins.push(
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        swDest: 'service-worker.js',
        maximumFileSizeToCacheInBytes: 1000000000000,
      })
    )
  }
  return {
    mode: 'development',
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    output: {
      path: outputPath,
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
        test: path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins,
    devServer: {
      historyApiFallback: true,
      hot: true,
    },
  }
}
