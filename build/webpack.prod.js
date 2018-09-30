// 引入基础配置
const path = require('path')
const webpackBase = require('./webpack.base')
const webpackMerge = require('webpack-merge') // 引入 webpack-merge 插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // js压缩、优化插件
// 抽取css extract-text-webpack-plugin不再支持webpack4，官方出了mini-css-extract-plugin来处理css的抽取
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清理 dist 文件夹
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
// 打包文件大小视图
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin
const config = require('./config') // 多页面的配置项

const webpackProd = {
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
			},
			{
				test: /\.styl(us)?$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					{
						loader: 'stylus-loader',
						options: {
							import: [path.resolve(__dirname, '../src/commons/css/main')]
						}
					}
				]
			}
		]
	},
	optimization: {
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '-',
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					minSize: 30000,
					minChunks: 1,
					chunks: 'initial',
					priority: 1 // 该配置项是设置处理的优先级，数值越大越优先处理
				},
				commons: {
					test: /[\\/]src[\\/]commons[\\/]js[\\/]/, // src/commons/js下的文件抽成公共模块
					name: 'commons',
					minSize: 30000,
					minChunks: 3,
					chunks: 'initial',
					priority: -1,
					reuseExistingChunk: true // 这个配置允许我们使用已经存在的代码块
				}
			}
		},
		runtimeChunk: 'single',
		minimizer: [
			new UglifyJsPlugin({
				exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件
				cache: true,
				parallel: true, // 开启并行压缩，充分利用cpu
				sourceMap: false,
				extractComments: false, // 移除注释
				uglifyOptions: {
					compress: {
						unused: true,
						warnings: false,
						drop_debugger: true
					},
					output: {
						comments: false
					}
				}
			}),
			new OptimizeCSSAssetsPlugin({
				// 压缩css
				assetNameRegExp: /\.css$/g,
				cssProcessorOptions: {
					safe: true,
					autoprefixer: { disable: true }, // 不去除autoprefixer添加的前缀
					mergeLonghand: false,
					discardComments: {
						removeAll: true // 移除注释
					}
				},
				canPrint: true
			}),
			new InlineManifestWebpackPlugin('runtime')
		]
	},
	plugins: [
		// 自动清理 dist 文件夹
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '..'),
			verbose: true, //开启在控制台输出信息
			dry: false
		}),
		new MiniCssExtractPlugin({
			filename: `${config.cssOutputPath}[name].[contenthash:8].css`
		})
	]
}

if (process.env.run === 'Analyzer') {
	webpackProd.plugins.push(new BundleAnalyzerPlugin())
}

// 合并配置文件
module.exports = webpackMerge(webpackBase, webpackProd)
