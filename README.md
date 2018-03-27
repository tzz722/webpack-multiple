# webpack(3.X) 打包多页面

###########目录结构描述
├── src                                // 配置
│   ├── assets                         // 项目使用文件
│   │   ├── css
│   │   ├── img
│   │   ├── js
│   │   ├── view                       // 页面
│   │   │   └── XXXX                   // 页面名称(关联生成页面以及js名称)
│   │   │       ├── index.html         // 页面文件
│   │   │       ├── main.html          // 入口文件
│   │   │       └── index.stylus       // 样式
│   │   └──...
│   └── static                         // 不常改动文件
│       ├── css
│       ├── img
│       ├── js
│       └── ...
├── webpack_config                      // 配置
│   ├── config   //webpack变量配置
│   ├── webpack.config.base.js          // 基础设置
│   ├── webpack.config.dev.js           // 开发环境
│   ├── webpack.config.lint.js          // lint代码风格检查
│   └── webpack.config.prod.js          // 生产环境
├── logger-service.js                   // 启动日志配置
├── .editorconfig                       // webstorm代码格式配置文件
├── .eslintrc                           // eslint配置
├── .gitignore		                      // git文件上传设置
├── package.json                        // 依赖包
├── postcss.config.js                   // postcss的设置
└── Readme.md                           // 就是这个文档


npm run dev    // derserver
npm run build  // 打包
npm run lint   // 代码检查&&derserver
