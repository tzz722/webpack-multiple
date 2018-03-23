const path = require("path");
// 引入 webpack
const webpack = require("webpack");
// 引入插件
const HTMLWebpackPlugin = require("html-webpack-plugin");
// 抽取 css
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 引入多页面文件列表
const config = require("./config");
// 通过 html-webpack-plugin 生成的 HTML 集合
let HTMLPlugins = [];
// 入口文件集合
let Entries = {}
// 生成多页面的集合
config.HTMLDirs.forEach((page) => {
  const htmlPlugin = new HTMLWebpackPlugin({
    filename: `${config.htmlOutputPath}${page}.html`,
    inject: 'head',
    hash: false,
    template: path.resolve(__dirname, `../src/view/${page}.html`),
    chunks: ['manifest', 'vendor', 'commons', page],
    chunksSortMode: 'manual',
  });
  HTMLPlugins.push(htmlPlugin);
  Entries[page] = path.resolve(__dirname, `../src/js/${page}.js`);
})

//已分离成静态文件
// //polyfills
// let polyfills = path.resolve(__dirname, '../src/js/commonJS/polyfills.js');
// Entries.polyfills = polyfills

module.exports = {
  entry: Entries,
  output: {
    filename: "js/[name].bundle.[chunkhash].js",
    path: path.resolve(__dirname, "../dist"),
    chunkFilename: "js/[id].chunk.[chunkhash].js"
  },
  resolve: {
    //支持无后缀名
    extensions: [' ', '.css', '.js', '.json', '.styl'],
    //常用依赖
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'js': path.resolve(__dirname, '../src/js'),
      'img': path.resolve(__dirname, '../src/img'),
      'css': path.resolve(__dirname, '../src/css'),
      'static': path.resolve(__dirname, '../src/static'),  //静态文件地址
      'jquery': path.resolve(__dirname, '../src/js/commonJS/jquery.min.js')
    }
  },
  // 加载器
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        // 抽取 css 文件到单独的文件夹
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          publicPath: config.cssPublicPath,
          use: [{
            loader: "css-loader",
            options: {
              minimize: true,
              imagesLoaded: 1
            }
          },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.styl(us)?$/,
        exclude: /node_modules/,
        // 抽取 css 文件到单独的文件夹
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          publicPath: config.cssPublicPath,
          use: [{
            loader: "css-loader",
            options: {
              minimize: true,
              imagesLoaded: 2
            }
          },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
            removeComments: false,
            collapseWhitespace: false
          }
        }],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['transform-runtime']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: config.fileLimit,
              name: config.fileFormat,
              outputPath: config.imgOutputPath
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: config.fileLimit,
          name: config.fileFormat,
          outputPath: config.mediaOutputPath
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: config.fileLimit,
          name: config.fileFormat,
          outputPath: config.fontOutputPath
        }
      }
    ],
  },
  plugins: [
    // 将 css 抽取到某个文件夹
    new ExtractTextPlugin({filename: config.cssOutputPath}),
    // 自动生成 HTML 插件
    ...HTMLPlugins,
    //自动加载插件
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}
