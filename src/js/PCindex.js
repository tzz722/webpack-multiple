'use strict';
// 导入css
import '../css/PCindex.styl';
// 导入js
import {Act} from './commons';


document.onreadystatechange = function () {
    if (document.readyState === 'interactive') {
    // 加载动画开启
    // apiLoading(true, 'page');
    }
};


window.onload = function () {
    let act = new Act();
    // 初始化
    act.init();
    // apiLoading(false, 'page');
};

