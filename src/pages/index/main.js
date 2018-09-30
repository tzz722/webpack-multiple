import Vue from 'vue'
import App from './App'
import store from './store'
import router from './assets/js/router'
import './assets/css/main.styl'
import '@/commons/js/base'
import VueLazyload from 'vue-lazyload'

// 懒加载
Vue.use(VueLazyload, {
	preLoad: 1.3,
	error: '',
	loading: '',
	attempt: 1
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	template: '<App/>',
	components: { App }
})
