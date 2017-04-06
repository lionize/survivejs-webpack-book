const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
}

const commonConfig = {
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
}

const productionConfig = () => commonConfig

const developmentConfig = () => {
  const config = {
    devServer: {
      // Enable history API fallback so HTML5
      // History API based routing works. Good for
      // complex strings.
      historyApiFallback: true,

      // Display only errors to reduce output
      stats: 'errors-only',

      host: process.env.HOST,
      port: process.env.PORT,
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',

          loader: 'eslint-loader',
          options: {
            emitWarning: true,
          },
        },
      ],
    },
  }

  return Object.assign(
    {},
    commonConfig,
    config
  )
}

module.exports = (env) => {
  if (env === 'production') {
    return productionConfig()
  }

  return developmentConfig()
}
