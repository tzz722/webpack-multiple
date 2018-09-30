const store = {
	namespaced: true,
	state: {
		direction: 'forward'
	},
	getters: {},
	actions: {},
	mutations: {
		UPDATE_DIRECTION(state, status) {
			state.direction = status
		}
	}
}

export default store
