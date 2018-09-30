const path = require('path')
const proxy = require('./proxy')
const webpackBase = require('./webpack.base')
const webpackMerge = require('webpack-merge')
const config = require('./config')
const ip = require('ip').address()

module.exports = webpackMerge(webpackBase, {
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['vue-style-loader', 'css-loader', 'postcss-loader']
			},
			{
				test: /\.styl(us)?$/,
				// exclude: /node_modules/,
				use: [
					'vue-style-loader',
					'css-loader',
					'postcss-loader',
					{
						loader: 'stylus-loader',
						options: {
							import: [path.resolve(__dirname, '../src/commons/css/main')]
						}
					}
				]
			},
			{
				test: /\.(js|vue)$/,
				enforce: 'pre', // 强制先进行 ESLint 检查
				exclude: [/node_modules/, /.min.js$/],
				loader: 'eslint-loader',
				options: {
					fix: true, // 启用自动修复
					emitWarning: true // 启用警告信息
				}
			}
		]
	},
	devServer: {
		contentBase: config.devServerOutputPath,
		host: ip,
		port: config.port,
		overlay: {
			errors: true,
			warnings: true
		},
		open: false, // 服务启动后 打开浏览器
		proxy: proxy // 反向代理 配置文件在同文件夹下的proxy里
	}
})
