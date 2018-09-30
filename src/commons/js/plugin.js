// vue注册事件 定义全局方法
import lodash from 'lodash'
import CryptoJS from 'crypto-js'
import numeral from 'numeral'
import anime from 'animejs'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

// 注册插件到全局
export default {
	install: function(Vue) {
		Vue.prototype._ = lodash // 对象操作 lodash需要在文件中单独引入 按需加载
		Vue.prototype.crypto = CryptoJS // crypto加密
		Vue.prototype.numeral = numeral // 数字处理
		Vue.prototype.anime = anime // animeJs动画
		Vue.prototype.dayjs = dayjs // 时间格式化
	}
}
