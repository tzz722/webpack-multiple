export default {
	name: '我的家庭',
	list: [
		{
			path: '/familyBind',
			name: 'familyBind-index',
			meta: {
				title: '我的家庭'
			},
			component: () =>
				import(/* webpackChunkName: "familyBind" */ '../../views/familyBind/index')
		},
		{
			path: '/familyBind/add',
			name: 'familyBind-add',
			meta: {
				title: '添加家人'
			},
			component: () =>
				import(/* webpackChunkName: "familyBind" */ '../../views/familyBind/add')
		},
		{
			path: '/familyBind/add/phone',
			name: 'familyBind-add-phone',
			meta: {
				title: '绑定手机号'
			},
			component: () =>
				import(/* webpackChunkName: "familyBind" */ '../../views/familyBind/bindPhone')
		},
		{
			path: '/familyBind/detail',
			name: 'familyBind-detail',
			meta: {
				title: '家庭详情'
			},
			component: () =>
				import(/* webpackChunkName: "familyBind" */ '../../views/familyBind/detail')
		}
	]
}
