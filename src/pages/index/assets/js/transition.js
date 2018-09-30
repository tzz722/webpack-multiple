import { TAB_LIST } from './config'
// 页面滑动
export default class Transition {
	constructor() {
		this.history = window.sessionStorage
		this.init()
		this.historyCount = 0
	}
	init() {
		this.history.clear()
		this.historyCount = this.history.getItem('count') * 1 || 0
		this.history.setItem('/', 0)

		TAB_LIST.forEach((item, index) => {
			this.history.setItem('/' + item.routename, index + 1)
			this.historyCount++
		})
	}
	transitionCallback(to, from, store) {
		const toIndex = this.history.getItem(to.path)
		const fromIndex = this.history.getItem(from.path)

		if (toIndex) {
			if (
				!fromIndex ||
				parseInt(toIndex, 10) > parseInt(fromIndex, 10) ||
				(toIndex === '0' && fromIndex === '0')
			) {
				store.commit('transition/UPDATE_DIRECTION', 'forward')
			} else {
				store.commit('transition/UPDATE_DIRECTION', 'reverse')
			}
		} else {
			++this.historyCount
			this.history.setItem('count', this.historyCount)
			to.path !== '/' && this.history.setItem(to.path, this.historyCount)
			store.commit('UPDATE_DIRECTION', 'forward')
		}
	}
}
