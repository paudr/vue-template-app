const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = () => ({
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    library: {
      name: 'app',
      type: 'var',
      export: 'default'
    },
    filename: 'app.js'
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm-browser.js'
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
            'vue-style-loader',
            {
              loader: 'css-loader',
              options: { modules: true }
            }
          ]
        }, {
          use: [
            'vue-style-loader',
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
            'vue-style-loader',
            {
              loader: 'css-loader',
              options: { modules: true }
            },
            'less-loader'
          ]
        }, {
          use: [
            'vue-style-loader',
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
  plugins: [new VueLoaderPlugin()],
  devServer: {
    static: {
      directory: path.join(__dirname, 'assets')
    },
    port: 8080,
    hot: true
  }
})
