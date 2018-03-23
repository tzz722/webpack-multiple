'use strict';
// 导入css
import 'css/index';
// 导入js
import {apiLoading, anime, showToast, ajax} from 'js/commonJS/packet'; // 全局包设置
import {Act} from 'js/commons';


document.onreadystatechange = function () {
  if (document.readyState === 'interactive') {
    // 加载动画开启
    apiLoading(true, 'page');
  }
};


window.onload = function () {
  let act = new Act();
  // 初始化
  act.init();
  actRuleBtn();
  apiLoading(false, 'page');

  function actRuleBtn () {
    anime({
      targets: document.querySelector('.act-rule'),
      translateY: {
        value: 15,
        duration: 1000,
        easing: 'easeInQuad',
      },
      direction: 'alternate',
      loop: true,
    });
  }

  // app购买成功  刷新列表和部份数据
  window.onBuySuccess = function () {
    act.refash();
  };

  // app分享成功
  window.onShareSuccess = function () {
    if (act.state === 1 && act.hasshare >= 1) {
      apiLoading(true);
      ajax.post('activity/' + act.acttitle + '/shared', {}, (data) => {
        apiLoading(false);
        if (parseInt(data.code) === 0) {
          showToast('分享成功');
          act.refash();
        } else {
          showToast(data.msg);
        }
      });
    }
  };
};


