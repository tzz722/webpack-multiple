const path = require("path");
// 引入基础配置
const webpackBase = require("./webpack.config.base");
// 引入 webpack-merge 插件
const webpackMerge = require("webpack-merge");
// 引入 webpack
const webpack = require("webpack");
const config = require("./config");
//拷贝静态文件
const CopyWebpackPlugin = require('copy-webpack-plugin')
//gzip
const CompressionPlugin = require("compression-webpack-plugin");
// 清理 dist 文件夹
const CleanWebpackPlugin = require("clean-webpack-plugin")
// 合并配置文件
module.exports = webpackMerge(webpackBase, {
  output: {
    publicPath: config.buildPublicPath,
  },
  plugins: [
    // 代码压缩
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        except: ['$', 'jQuery'] //排除压缩  保留方法名
      },
      compress: {
        warnings: false,
        drop_console: true,
      }
    }),
    // 提取公共 JavaScript 代码
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      minChunks: 2,
    }),
    // 暂时方案  当第三方库过多时采用手动导入需要的包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/static'),
        to: config.staticOutputPath,
        ignore: ['.*']
      }
    ]),
    // 自动清理 dist 文件夹
    new CleanWebpackPlugin(['*'], {
      root: path.resolve(__dirname, '../dist'),
      // exclude:  [],
      verbose: true,
      dry: false
    }),
    //gzip
    // new CompressionPlugin({
    //   asset: "[path].gz[query]",
    //   algorithm: "gzip",
    //   test: /\.(js|html)$/,
    //   threshold: 10240,
    //   minRatio: 0.8
    // })
  ]
});
