const fs = require('fs');
// 获取所有页面 生成多页面的集合
const getFileNameList = path => {
  let fileList = [];
  let dirList = fs.readdirSync(path);
  dirList.forEach(item => {
    if (item.indexOf('html') > -1) {
      fileList.push(item.split('.')[0]);
    }
  });
  return fileList;
};

// 获取到本地的ip
function getIPAdress () {
  let interfaces = require('os').networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

let HTMLDirs = getFileNameList('./src/view');
let host = getIPAdress()
//修改需要注意 文件里引用静态文件的地址
let commonPath = ''
//修改html文件存放的位置 文件夹名
let htmlPath = 'view'
//想对路径 由html的层级决定
let buildPublicPath = (htmlPath) ? '../' : './'
module.exports = {
  HTMLDirs: HTMLDirs,
  //css内地址
  cssPublicPath: '../' + commonPath,
  //图片输出路径
  buildPublicPath: buildPublicPath,
  //图片输出路径
  imgOutputPath: commonPath + 'img/',
  //字体输出路径
  fontOutputPath: commonPath + 'font/',
  //媒体文件输出路径
  mediaOutputPath: commonPath + 'media/',
  //html输出路径
  htmlOutputPath: htmlPath + '/',
  //资源文件的格式
  fileFormat: '[name].[hash:7].[ext]',
  //文件转base64的大小限制
  fileLimit: 10000,
  //独立样式输出
  cssOutputPath: commonPath + "css/[name]-[contenthash].css",
  //导出独立文件地址
  staticOutputPath: "./",
  //本地运行根目录
  devServerOutputPath: '../dist/' + htmlPath,
  host: host,
  port: '8862'
}
