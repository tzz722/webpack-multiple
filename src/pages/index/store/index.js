import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import transition from './module/transition'
import common from './module/common'

Vue.use(Vuex)

const store = new Vuex.Store({})
// 模块化 this.$store.x.模块名
store.registerModule('user', user)
store.registerModule('transition', transition)
store.registerModule('common', common)

export default store

// state.xx
// getters['xx/xx']
// dispatch('xx/xx')
// commit('xx/xx')

// ...mapState('xx', [
// ])
// ...mapGetters('xx', [
// ])
// ...mapActions('xx', [
// ])
// ...mapMutations('xx', [
// ])
