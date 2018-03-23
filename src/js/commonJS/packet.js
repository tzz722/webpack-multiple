// 导入
checkToAddPolyfills() //按需加载polyfills
import FastClick from 'fastclick'; // 解决click点击300毫秒延时问题
import 'css/commonCSS/reset.css'; // 样式初始化
import 'js/commonJS/flexible2.0'; // rem
import util from 'js/commonJS/util'; // 导入util
import anime from 'js/commonJS/anime.min'; // 动画
// import './clamp.min' //文字超出转为...  $clamp(dom, {clamp: 3});
// import soda from './soda.min'  //soda框架  dom渲染
// import './swiper-3.4.2.min'  //轮播图
// import {echo} from  './echo'; //懒加载
// 导出
export const AppUtil = util.AppUtil;
export const pageScroll = util.tools.pageScroll; // 弹窗固定
export const storage = util.tools.storage; // 对storage进行操作
export const AppMessage = util.AppMessage; // app交互
export const showToast = util.tools.showToast; // 提示
export const apiLoading = util.tools.apiLoading; // 加载动画
export const ajax = util.tools.ajax; // ajax请求
// export {anime,soda}
export {anime, FastClick};

function checkToAddPolyfills () {
  let modernBrowser = (
    'fetch' in window &&
    'assign' in Object
  );
  if (!modernBrowser) {
    let scriptElement = document.createElement('script');
    scriptElement.async = false;
    scriptElement.src = 'https://cdn.bootcss.com/babel-polyfill/7.0.0-beta.42/polyfill.min.js';
    document.head.appendChild(scriptElement);
  }
}
