import { router } from '../../router'
import store from '../../store'
import Transition from './transition'

let transition = new Transition()

// 路由事件
router.beforeEach(function(to, from, next) {
	// 加载transition回调事件 切换动画
	transition.transitionCallback(to, from, store)
	if (to.meta.title) {
		document.title = to.meta.title
	}
	next()
})

router.afterEach(function(to, from) {})

export default router
