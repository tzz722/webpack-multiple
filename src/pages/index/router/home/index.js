export default {
	name: '首页',
	list: [
		{
			path: '/home',
			name: 'page1',
			component: () =>
				import(/* webpackChunkName: "home" */ '../../views/home/page1')
		},
		{
			path: '/home/page2',
			name: 'page2',
			component: () =>
				import(/* webpackChunkName: "home" */ '../../views/home/page2')
		},
		{
			path: '/home/page3',
			name: 'page3',
			component: () =>
				import(/* webpackChunkName: "home" */ '../../views/home/page3')
		},
		{
			path: '/home/page4',
			name: 'page4',
			component: () =>
				import(/* webpackChunkName: "home" */ '../../views/home/page4')
		}
	]
}
