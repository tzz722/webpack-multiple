// 过滤器
import numeral from 'numeral'
let filter = {
	install: function(Vue, options) {
		Vue.filter('format-income', income => {
			return numeral(Math.floor(income * 100) / 100).format('0,0.00')
		})
	}
}

export default filter
