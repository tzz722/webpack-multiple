// 这是一个公共的加载库
import Vue from 'vue'
import plugin from './plugin'
import filter from './filter'
import { isDebug, isTest } from './config'
import maskAndLoading from './maskAndLoading'
import VueInsProgressBar from 'vue-ins-progress-bar'
import fastclick from 'fastclick'

Vue.use(plugin) // 插件加载
Vue.use(filter) // 过滤器加载

// 修复点击
document.addEventListener(
	'DOMContentLoaded',
	function() {
		fastclick.attach(document.body)
	},
	false
)

// 彩虹进度条
const options = {
	position: 'fixed',
	show: true,
	height: '2px'
}

Vue.use(VueInsProgressBar, options)
Vue.use(maskAndLoading) // 加载动画 遮罩层

// 在开发环境加载
if (isDebug) {
} else {
	Vue.config.productionTip = false
	if (isTest) {
		// debug
		import('vconsole')
			.then(({ default: Vconsole }) => {
				Vue.use(new Vconsole())
			})
			.catch(err => {
				console.log(err.message)
			})
	}
}
