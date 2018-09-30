import axios from './axios'

const baseAjax = {
	get: (api, params, success, fail) => {
		axios
			.get(api, { params: params })
			.then(function(response) {
				success(response.data)
			})
			.catch(function(error) {
				fail ? fail() : console.log(error)
			})
	},
	postFormData: (api, params, success, fail) => {
		var data
		if (params) {
			var queries = []
			var keys = Object.keys(params)
			keys.forEach(key => {
				queries.push(
					encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
				)
			})
			data = queries.join('&')
		}
		axios
			.post(api, data)
			.then(function(response) {
				success(response.data)
			})
			.catch(function(error) {
				fail ? fail() : console.log(error)
			})
	},
	postJson: (api, params, success, fail) => {
		axios
			.post(api, params)
			.then(
				function(response) {
					success(response.data)
				},
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			.catch(function(error) {
				fail ? fail() : console.log(error)
			})
	}
}

export default {
	promiseAjaxGet: (api, params, callback) => {
		return new Promise(resolve => {
			this.get(api, params, function(data) {
				callback(data)
				resolve()
			})
		})
	},
	promiseAjaxPost: (api, params, success, fail, type) => {
		return new Promise(resolve => {
			baseAjax['post' + type](
				api,
				params,
				data => {
					success(data)
					resolve()
				},
				fail
			)
		})
	}
}
