export default {
	name: '项目目录',
	list: [
		{
			path: '/',
			name: 'catalogue',
			meta: {
				title: '项目目录'
			},
			component: () =>
				import(/* webpackChunkName: "catalogue" */ '../../views/catalogue.vue')
		}
	]
}
