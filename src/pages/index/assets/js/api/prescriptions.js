import network from '@/commons/js/network'
import { isTest, isDebug } from '@/commons/js/config'

const promiseAjaxPost = network.promiseAjaxPost

let baseParams = {
	JKBM: '',
	MAIN: {}
}
let host = ''
if (isDebug) {
	if (isTest) {
		host = '/yunchufang/presc_tz/presc'
	} else {
		host = 'http://30.11.99.31:8088/presc_tz/presc'
	}
} else {
	if (isTest) {
		host = 'http://30.11.99.31:8088/presc_tz/presc'
	} else {
		host = 'http://30.11.99.31:8088/presc_tz/presc'
	}
}
let yunchufangPost = (api, params, success, fail, type) => {
	api = api.toUpperCase()
	let newApi = host + '/' + api
	let newParams = baseParams
	newParams.JKBM = api
	newParams.MAIN = params
	return promiseAjaxPost(newApi, newParams, success, fail, type)
}

let mainSearch = (params, success, fail) => {
	yunchufangPost('APP005', params, success, fail, 'Json')
}

export default {
	mainSearch: mainSearch // 获取主列表 获得个状态的处方详情
}
