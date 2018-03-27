# webpack(3.X) 打包多页面

########### 目录结构描述<br/>
├── src                                // 配置<br/>
│   ├── assets                         // 项目使用文件<br/>
│   │   ├── css<br/>
│   │   ├── img<br/>
│   │   ├── js<br/>
│   │   ├── view                       // 页面<br/>
│   │   │   └── XXXX                   // 页面名称(关联生成页面以及js名称)<br/>
│   │   │       ├── index.html         // 页面文件<br/>
│   │   │       ├── main.html          // 入口文件<br/>
│   │   │       └── index.stylus       // 样式<br/>
│   │   └──...<br/>
│   └── static                         // 不常改动文件<br/>
│       ├── css<br/>
│       ├── img<br/>
│       ├── js<br/>
│       └── ...<br/>
├── webpack_config                      // 配置<br/>
│   ├── config   //webpack变量配置<br/>
│   ├── webpack.config.base.js          // 基础设置<br/>
│   ├── webpack.config.dev.js           // 开发环境<br/>
│   ├── webpack.config.lint.js          // lint代码风格检查<br/>
│   └── webpack.config.prod.js          // 生产环境<br/>
├── logger-service.js                   // 启动日志配置<br/>
├── .editorconfig                       // webstorm代码格式配置文件<br/>
├── .eslintrc                           // eslint配置<br/>
├── .gitignore		                      // git文件上传设置<br/>
├── package.json                        // 依赖包<br/>
├── postcss.config.js                   // postcss的设置<br/>
└── Readme.md                           // 就是这个文档<br/>
<br/>
<br/>
########### 运行<br/>
npm run dev    // derserver<br/>
npm run build  // 打包<br/>
npm run lint   // 代码检查&&derserver<br/>
