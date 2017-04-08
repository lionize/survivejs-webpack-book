const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')

const parts = require('./webpack.parts')

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
}

const commonConfig = merge([
  {
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo',
      }),
    ],
  },
  parts.lintJavascript({ include: PATHS.app }),
  parts.lintCSS({ include: PATHS.app }),
])

const productionConfig = merge([
  parts.extractCSS({
    use: [
      {
        loader: 'css-loader',
        options: {
          modules: true,
        },
      },
      parts.autoprefix(),
    ],
  }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*`, { nodir: true }),
  }),
])

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
])

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig)
  }

  return merge(commonConfig, developmentConfig)
}
