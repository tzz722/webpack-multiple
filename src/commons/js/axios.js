// 定义网络请求
import Axios from 'axios'

// 配置axios
let options = {
	timeout: 10000,
	headers: {
		post: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		}
	}
}

// 创建axios实例
let axios = Axios.create(options)

// 请求
export default axios
