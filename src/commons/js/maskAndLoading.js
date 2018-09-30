import Loading from '../components/maskAndLoading'

export default {
	install(Vue, options) {
		const VueLoading = Vue.extend(Loading)
		let loading = null
		Vue.prototype.$loading = (() => {
			if (!loading) {
				loading = new VueLoading()
				loading.$mount()
			}
			function show(type, option) {
				document.querySelector('body').appendChild(loading.$el)
				loading.show(type, option)
			}
			function hide() {
				if (document.querySelector('.vue-loading')) {
					document.querySelector('body').removeChild(loading.$el)
				}
			}
			return {
				show: show,
				hide: hide
			}
		})()
	}
}
