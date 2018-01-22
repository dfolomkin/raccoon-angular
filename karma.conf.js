const path = require('path');

module.exports = (config) => {
  const webpackConfig = {
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          },
          exclude: path.resolve(__dirname, 'node_modules'),
          include: path.resolve(__dirname, 'src/app')
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
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' }
          ]
        },
        {
          test: /\.less$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'less-loader' }
          ]
        },
        {
          test: /\.(png|svg|ttf|otf|eot|woff|woff2)$/,
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

    devtool: 'source-map'
  };

  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      // this invokes 'WARNING: Tried to load angular more than once.'
      './node_modules/angular/angular.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './src/app/**/*.+(module|component|service|filter).js',
      './src/app/**/*.+(mock|spec).js'
    ],

    preprocessors: {
      './src/app/**/*.+(component|service|filter).js': ['webpack', 'sourcemap', 'coverage'],
      './src/app/**/*.module.js': ['webpack', 'sourcemap'],
      './src/app/**/*.mock.js': ['webpack', 'sourcemap'],
      './src/app/**/*.spec.js': ['webpack', 'sourcemap']
    },

    reporters: ['progress', 'coverage', 'kjhtml'],

    coverageReporter: {
      reporters: [
        { type: 'html', dir: 'coverage/' },
        { type: 'text' }
      ]
    },

    port: 9876,

    autoWatch: true,

    browsers: ['Chrome'],

    webpack: webpackConfig,

    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      'karma-coverage',
      'karma-jasmine-html-reporter'
    ]
  });
};
