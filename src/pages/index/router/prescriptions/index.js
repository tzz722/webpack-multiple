export default {
	name: '处方外配',
	list: [
		{
			path: '/prescriptions',
			name: 'prescriptions-index',
			meta: {
				title: '处方外配'
			},
			component: () =>
				import(/* webpackChunkName: "prescriptions" */ '../../views/prescriptions/index')
		},
		{
			path: '/prescriptions/pharmacy',
			name: 'prescriptions-pharmacy',
			meta: {
				title: '选择药店'
			},
			component: () =>
				import(/* webpackChunkName: "prescriptions" */ '../../views/prescriptions/pharmacy')
		},
		{
			path: '/prescriptions/detail',
			name: 'prescriptions-detail',
			meta: {
				title: '处方详情'
			},
			component: () =>
				import(/* webpackChunkName: "prescriptions" */ '../../views/prescriptions/detail')
		},
		{
			path: '/prescriptions/order',
			name: 'prescriptions-order',
			meta: {
				title: '确认订单'
			},
			component: () =>
				import(/* webpackChunkName: "prescriptions" */ '../../views/prescriptions/orderInfo')
		},
		{
			path: '/prescriptions/dispensing',
			name: 'prescriptions-dispensing',
			meta: {
				title: '取药码'
			},
			component: () =>
				import(/* webpackChunkName: "prescriptions" */ '../../views/prescriptions/dispensing')
		}
	]
}
