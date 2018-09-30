import Vue from 'vue'
import Router from 'vue-router'
import home from './home/index'
import familyBind from './familyBind/index'
import catalogue from './catalogue/index'
import prescriptions from './prescriptions/index'
import { isDebug } from '@/commons/js/config'
import lodash from 'lodash'

Vue.use(Router)

let objList = [home, familyBind, prescriptions]
if (isDebug) {
	objList.push(catalogue)
}
let routes = getList(objList)

export const routesList = objList

export const router = new Router({
	// mode: 'history',
	routes: routes
})

function getList(objList) {
	let list = []
	objList.forEach(item => {
		list.push(item.list)
	})
	return lodash.flattenDeep(list)
}
