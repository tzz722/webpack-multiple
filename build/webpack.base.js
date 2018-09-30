const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin') // lodash按需加载模块
const config = require('./config') // 多页面的配置项
let HTMLPlugins = []
let Entries = {}

config.HTMLDirs.forEach(item => {
	const htmlPlugin = new HTMLWebpackPlugin({
		title: item.title, // 生成的html页面的标题
		baseUrl: config.buildPublicPath, // 引入的静态文件路径
		icon: item.icon, // 图标显示
		filename: `${config.htmlOutputPath}${item.page}.html`, // 生成到dist目录下的html文件名称
		template: path.resolve(__dirname, `../src/template/${item.template}.html`), // 模板文件
		chunks: ['runtime', 'vendors', 'commons', item.page], // 参考公共模块分离设置
		chunksSortMode: 'dependency'
	})
	HTMLPlugins.push(htmlPlugin)
	Entries[item.page] = path.resolve(
		__dirname,
		`../src/pages/${item.page}/main.js`
	) // 根据配置设置入口js文件
})

const webpackBase = {
	entry: Entries,
	output: {
		filename: `${config.jsOutputPath}[name].[chunkhash:8].js`,
		path: path.resolve(__dirname, '../dist'),
		chunkFilename: `${config.jsOutputPath}[name].[chunkhash:8].js`
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: 'vue-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.pug$/,
				use: ['pug-plain-loader']
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
		]
	},
	resolve: {
		// 支持无后缀名
		extensions: [' ', '.css', '.js', '.json', '.styl', '.vue'],
		// 常用依赖
		alias: {
			'@': path.resolve(__dirname, '../src'),
			vue$: 'vue/dist/vue.esm.js'
		}
	},
	externals: {
		vue: 'Vue',
		axios: 'axios',
		inobounce: 'iNoBounce',
		fastclick: 'FastClick'
	},
	plugins: [
		new VueLoaderPlugin(),
		// new LodashModuleReplacementPlugin(),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, '../public'),
				to: path.resolve(__dirname, '../dist')
				// ignore: ['*.html']
			}
		]),
		...HTMLPlugins
	]
}
if (process.env.MODEL)
	webpackBase.plugins.push(new webpack.EnvironmentPlugin('MODEL'))

module.exports = webpackBase
