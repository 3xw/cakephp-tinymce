const webpack = require('webpack');
const path = require('path');
const conf = require('dotenv').config({path: 'webpack.env'});
const webroot = conf.parsed.PUBLIC_PATH;
const prefix = process.env;

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const tinymceVendorConfig = env => {
  return {
    mode: 'development',
    name: 'tinymceVendorConfig',
    entry: path.join(__dirname, 'resources/assets/tinymce.vendor.conf.js'),
    output: {
      path: path.resolve(__dirname, '../../../webroot'),
      filename: 'js/plugins/tinymce/tinymce.vendor.min.js',
    },
    optimization: {
      minimizer: [new UglifyJsPlugin({
        extractComments: false,
        parallel: true,
        uglifyOptions: {
          keep_fnames: true,
          mangle: true,
        }
      })],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                "@babel/plugin-syntax-dynamic-import"
              ]
            }
          }
        },
        {
          test: /\.(css)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: loader => [
                  require('cssnano')({
                    preset: ['default', {
                      discardComments: {
                        removeAll: true,
                      }
                    }]
                  })
                ]
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/plugins/tinymce/tinymce.vendor.min.css',
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /got$/,
        contextRegExp: /vuejs$/
      }),
    ],
    resolve: {
      alias: {
          'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
  }
};

const tinymceConfig = env => {
  return {
    mode: 'development',
    name: 'tinymceConfig',
    entry: path.join(__dirname, 'resources/assets/tinymce.conf.js'),
    output: {
      path: path.resolve(__dirname, '../../../webroot'),
      publicPath: webroot,
      filename: 'js/plugins/tinymce/tinymce.min.js',
      chunkFilename: 'js/plugins/tinymce/components/tinymce.[name].[hash].min.js',
    },
    watch: true,
    optimization: {
      minimizer: [new UglifyJsPlugin()],
    },
    module: {
      rules: [
        {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              "@babel/plugin-syntax-dynamic-import"
            ]
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          cacheBusting: true,
        }
      },
      {
        test: /\.(scss)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader, },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [
                require('postcss-preset-env')(),
                require('pixrem')(),
                require('autoprefixer')({overrideBrowserslist: 'last 10 versions'}),
                require('cssnano')()
              ]
            }
          },
          { loader: 'resolve-url-loader' },
          { loader: 'sass-loader' },
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
          test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  publicPath: webroot+'fonts/',
                  outputPath: 'fonts/'
              }
          }]
      }]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/plugins/tinymce/tinymce.min.css',
        chunkFilename: 'css/plugins/tinymce/components/tinymce.[name].[hash].min.css',
      }),
      new VueLoaderPlugin()
    ],
    resolve: {
      alias: {
          'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
  }
}

module.exports = [tinymceVendorConfig, tinymceConfig];
