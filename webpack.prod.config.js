const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = () => ({
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    library: {
      name: 'app',
      type: 'umd',
      export: 'default'
    },
    filename: 'app.js'
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm-browser.prod.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        oneOf: [{
          resourceQuery: /module/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { modules: true }
            }
          ]
        }, {
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { esModule: false }
            }
          ]
        }]
      },
      {
        test: /\.less$/,
        oneOf: [{
          resourceQuery: /module/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { modules: true }
            },
            'less-loader'
          ]
        }, {
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { esModule: false }
            },
            'less-loader'
          ]
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
})
