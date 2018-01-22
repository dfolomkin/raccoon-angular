const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = (env = {}) => {
  if (env.production) {
    console.log('>>> Production');
  } else {
    console.log('>>> Develeopment');
  }

  return {
    entry: {
      vendor: [
        'angular',
        'angular-resource',
        'angular-route',
        'ng-dialog',
        'ng-file-upload'
      ],
      app: './src/app/app.module.js'
    },

    output: {
      path: path.resolve(__dirname, 'dist/js'),
      filename: '[name]-bundle.js'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              plugins: [['angularjs-annotate', { explicitOnly: true }]]
            }
          }
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        },
        {
          test: /\.css$/,
          use: env.production ?
            [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [autoprefixer('last 2 versions')]
                }
              }
            ] :
            ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                { loader: 'css-loader' },
                {
                  loader: 'postcss-loader',
                  options: {
                    plugins: [autoprefixer('last 2 versions')]
                  }
                }
              ]
            })
        },
        {
          test: /\.less$/,
          use: env.production ?
            [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [autoprefixer('last 2 versions')]
                }
              },
              { loader: 'less-loader' }
            ] :
            ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                { loader: 'css-loader' },
                {
                  loader: 'postcss-loader',
                  options: {
                    plugins: [autoprefixer('last 2 versions')]
                  }
                },
                { loader: 'less-loader' }
              ]
            })
        },
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/,
          use: [
            { loader: 'url-loader' }
          ]
        },
        {
          test: /\.(png|svg)$/,
          use: [
            { loader: 'url-loader' }
          ]
        }
      ]
    },

    resolve: {
      extensions: ['.js', '.json', '.less', '.css'],
      alias: {
        Css: path.resolve(__dirname, 'src/css'),
        Fonts: path.resolve(__dirname, 'src/fonts'),
        Img: path.resolve(__dirname, 'src/img'),
        App: path.resolve(__dirname, 'src/app'),
        Common: path.resolve(__dirname, 'src/app/common'),
        Components: path.resolve(__dirname, 'src/app/components'),
        Vendors: path.resolve(__dirname, 'vendors'),
        NodeModules: path.resolve(__dirname, 'node_modules')
      }
    },

    plugins: env.production ?
      [
        new webpack.optimize.UglifyJsPlugin({
          test: /\.js/
        }),
        new HtmlWebpackPlugin({
          title: 'Raccoon blog | Angular',
          filename: `${__dirname}/index.html`,
          template: 'src/index.tpl.html',
          hash: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks: Infinity
        }),
        new CopyWebpackPlugin([
          { from: 'src/img', to: '../img' },
          { from: 'src/css/reset.css', to: '../css' }
        ], { copyUnmodified: true })
      ] :
      [
        new ExtractTextPlugin('../css/styles.css'),
        new HtmlWebpackPlugin({
          title: 'Raccoon blog | Angular',
          filename: `${__dirname}/index.html`,
          template: 'src/index.tpl.html',
          hash: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks: Infinity
        }),
        new CopyWebpackPlugin([
          { from: 'src/img', to: '../img' },
          { from: 'src/css/reset.css', to: '../css' }
        ], { copyUnmodified: true })
      ],

    devtool: env.production ? false : 'cheap-source-map'
  };
};
