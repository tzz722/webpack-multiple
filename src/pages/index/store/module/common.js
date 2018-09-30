const store = {
	namespaced: true,
	state: {
		mainScroll: ''
	},
	getters: {
		getMainScroll(state) {
			return state.mainScroll
		}
	},
	actions: {},
	mutations: {
		setMainScroll(state, status) {
			state.mainScroll = status
		}
	}
}

export default store
