const fs = require('fs')
const os = require('os')
const basePath = require('path')

const unPack = [] // 不打包的页面
const onlyPack = [] // 只打包的页面
const HTMLDirs = getFileNameList('./src/pages', unPack, onlyPack)
const commonPath = checkAddSlash('static') // 修改需要注意 文件里引用静态文件的地址
const htmlPath = checkAddSlash('') // 修改html文件存放的位置 文件夹名
const buildPublicPath = htmlPath ? '../' : './' // 相对路径 由html的层级决定
const cssPublicPath = commonPath ? '../../' : '../'

module.exports = {
	HTMLDirs: HTMLDirs,
	cssPublicPath: cssPublicPath, // css内地址
	buildPublicPath: buildPublicPath, // 生成html文件路径
	jsOutputPath: `${commonPath}js/`, // js输出路径
	imgOutputPath: `${commonPath}img/`, // 图片输出路径
	fontOutputPath: `${commonPath}font/`, // 字体输出路径
	mediaOutputPath: `${commonPath}media/`, // 媒体文件输出路径
	htmlOutputPath: `${htmlPath}`, // html输出路径
	fileFormat: '[name].[hash:8].[ext]', // 资源文件的格式
	fileLimit: 10000, // 文件转base64的大小限制
	cssOutputPath: `${commonPath}css/`, // 独立样式输出
	devServerOutputPath: `../dist/${htmlPath}`, // 本地运行根目录
	port: '2333'
}

function getFileNameList(path, unPack, onlyPack) {
	let fileList = []
	let dirList = fs.readdirSync(path)
	let reg = /\.vue/
	onlyPack.length && (dirList = onlyPack) // 只打包需要处理的页面
	dirList.forEach(item => {
		if (!unPack.includes(item)) {
			let dirFileList = fs.readdirSync(path + '/' + item)
			let obj = {}
			let config = require(basePath.resolve(`${path}/${item}/config.json`))
			obj.title = config.title
			obj.icon = config.icon
			obj.isVue = reg.test(dirFileList.join(''))
			obj.page = item
			obj.template = chooseTemplate(config.template, obj.isVue)
			fileList.push(obj)
		}
	})
	return fileList
}

function chooseTemplate(template, isVue) {
	if (template) return template
	if (isVue) return 'vueSingel'
	return 'traditional'
}

function checkAddSlash(path) {
	return path ? `${path}/` : path
}
