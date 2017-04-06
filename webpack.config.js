const path = require('path')
const webpack = require('webpack')
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
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          failOnWarning: false,
          failOnError: true,

          fix: false,

          outputReport: {
            filePath: 'checkstyle.xml',
            formatter: require('eslint/lib/formatters/checkstyle'),
          },
        },
      },
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

      overlay: {
        errors: true,
        warnings: true,
      },
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
