class JSBridge {
	constructor() {
		this.init()
	}
	// 初始化
	init() {
		this.showToast = {
			type: 'page',
			page: '123',
			data: { a: '1' },
			callback: data => {
				alert('showToast')
			}
		}
		this.getData = {
			type: 'page',
			page: '123',
			data: { a: '1' },
			callback: data => {
				alert(data)
			}
		}
	}
	register(name, option, callback) {
		this[name] = {}
		this[name].params = option
		this[name].callback = callback
	}
	send(name) {
		let json = Object.assign({}, this[name].params, { name: name })
		if (window.appInjection && window.appInjection.postMessage) {
			window.appInjection.postMessage(json)
		} else {
			console.log('未知错误:未定义App交互环境')
		}
	}
	call(name, data) {
		this[name].callback(data)
	}
}

let jsbridge = new JSBridge()
window.JSBridge = jsbridge
export default window.JSBridge
