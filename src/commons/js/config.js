// 全局配置文件
let isTest = process.env.MODEL === 'test' // 全局模式设置
let isDebug = process.env.NODE_ENV === 'development' // 全局开发模式设置

console.log(
	`%c现在是${isDebug ? '开发模式' : '生产模式'}连接的${
		isTest ? '测试环境' : '正式环境'
	}`,
	'color:red;font-size:24px;font-weight:600;font-family:"微软雅黑"'
)

export { isTest, isDebug }
