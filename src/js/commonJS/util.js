/* eslint-disable */
import {pageScroll} from './packet';
var nativeToast = require('./native-toast');
//toast样式
require('../../css/commonCSS/native-toast.styl');
//apiload  和  share的样式
require('../../css/commonCSS/util.styl');

import axios from 'axios';

var AppMessage = (function () {
  var sendParse = function (json) {
    for (var i in json) {
      json[i].url = encodeURIComponent(json[i].url);
    }
    return JSON.stringify(json);
  };

  var sendIOSMessage = function (json) {
    var type = json['type'];
    if (!type) {
      type = 'foo';
    }

    if (window['myjs'] && window['myjs'].runOnAndroidJavaScript) {
      window['myjs'].runOnAndroidJavaScript(JSON.stringify(json));
    } else {
      location.href = 'objc://' + type + '/-_-/' + sendParse(json);
    }
  };

  var sendAndroidMessage = function (json) {
    if (window['myjs'] && window['myjs'].runOnAndroidJavaScript) {
      window['myjs'].runOnAndroidJavaScript(JSON.stringify(json));
    } else {
      console.log('未知错误:未定义App交互环境');
    }
  };

  var sendMessage = function (json) {
    // if (isAndroid()) {
    sendAndroidMessage(json);
    //} else if (isIOS()) {
    // sendIOSMessage(json);
    //}
  };

  var openPage = function (appLink) {
    var json = {
      type: 'appLink',
      appLink: appLink,
    };

    sendMessage(json);
  };

  var share = function (content, platform) {
    platform = platform || ['weixin', 'qq', 'pengyouquan', 'weibo'];
    if (!platform.length) {
      return;
    }

    var json = {
      'type': 'share',
    };

    platform.forEach(function (obj, idx) {
      json[obj] = content;
    });

    sendMessage(json);
  };


  var enableShareButton = function (content, platform) {
    platform = platform || ['weixin', 'qq', 'pengyouquan', 'weibo'];
    if (!platform.length) {
      return;
    }

    var json = {
      'type': 'showShareButton',
    };

    platform.forEach(function (obj, idx) {
      json[obj] = content;
    });

    sendMessage(json);
  };

  var login = function () {
    var json = {
      'type': 'login',
    };
    sendMessage(json);
  };

  var showProduct = function (serial) {
    openPage('app://shark/product?serial=' + serial);
  };

  var showProducts = function () {
    var os = AppUtil.Request.get('os').toLowerCase();
    if (os == 'ios') {
      openPage('app://shark/Zhangzhi.ProductMainController');
    }
    else if (os == 'android') {
      openPage('app://shark/hotProductList');
    }
  };

  var showOrder = function (orderNo, amount, serial, commission) {
    if (commission) {
      openPage('app://shark/orderConfirm?orderNo=' + orderNo + '&amount=' + amount + '&serial=' + serial + '&commission=' + commission);
    }
    else {
      openPage('app://shark/orderConfirm?orderNo=' + orderNo + '&amount=' + amount + '&serial=' + serial);
    }

  };


  return {
    sendMessage: sendMessage,
    openPage: openPage,
    share: share,
    enableShareButton: enableShareButton,
    login: login,
    showProduct: showProduct,
    showProducts: showProducts,
    showOrder: showOrder,
    isNative: function () {
      return (window.myjs && window.myjs.runOnAndroidJavaScript) ? true : false;
    },
  };

})();

var AppUtil = (function () {
  var Request = (function () {
    var queryArr = window.location.search.substr(1).split('&');
    var params = {};
    for (var i = 0; i < queryArr.length; i++) {
      var pair = queryArr[i].split('=');
      params[pair[0]] = pair[1];
    }

    var get = function (str) {
      return params[str] ? params[str] : '';
    };

    var isFromNative = function () {
      var os = this.get('os').toLowerCase();
      return (os === 'ios' || os === 'android');
    };

    var isPC = function () {
      var os = this.get('os').toLowerCase();
      return (os === 'pc');
    };

    return {
      get: get,
      isPC: isPC,
      isFromNative: isFromNative,
      isNative: isFromNative, //deprecated
    };
  })();

  var userKey = (Request.isFromNative() || Request.isPC()) ?
    Request.get('userKey') :
    localStorage.getItem('auth');
  var apiLink = (function () {
    var host = window.location.host;
    if (host === 'h5.zhangzhijian.com') {
      return 'https://www.zhangzhijian.com';
    } else {
      return 'http://t.zhangzhijian.cn:10010';
      // return 'http://t1.zhangzhijian.cn:10011';
    }
  })();
  var hostLink = (function () {
    var host = window.location.host;
    if (host === 'h5.zhangzhijian.com') {
      return 'http://h5.zhangzhijian.com';
    } else {
      return 'http://h5.zhangzhijian.cn:10010';
    }
  })();

  var isLogin = function () {
    return userKey && userKey.length > 0;
  };

  //配置
  axios.defaults.timeout = 10000;
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  axios.defaults.baseURL = apiLink + '/';
  var params = {os: 'h5', version: '3.4.0'};
  if (userKey) {
    params.userKey = userKey;
  }
  axios.defaults.params = params;

  //请求
  var ajax = {
    get: function (api, params, success, fail) {
      axios.get(api, {params: params}).then(function (response) {
        success(response.data);
      })
        .catch(function (error) {
          (fail) ? fail() : tools.showToast(error);
        });
    },
    post: function (api, params, success, fail) {
      var data;
      if (params) {
        var queries = [];
        var keys = Object.keys(params);
        keys.forEach(key => {
          queries.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
        });
        data = queries.join('&');
      }
      axios.post(api, data).then(function (response) {
        success(response.data);
      })
        .catch(function (error) {
          (fail) ? fail() : tools.showToast(error);
        });
    },
    promiseAjaxGet: function (api, params, callback) {
      return new Promise((resolve) => {
        this.get(api, params, function (data) {
          callback(data);
          resolve();
        });
      });
    },
    promiseAjaxPost: function (api, params, callback) {
      return new Promise((resolve) => {
        this.post(api, params, function (data) {
          callback(data);
          resolve();
        });
      });
    },
  };

  var login = function () {
    if (AppMessage.isNative()) {
      AppMessage.login();
    } else {
      if (AppUtil.Request.isPC()) {
        parent.postMessage('/login', '*');
      }
      else {
        if (this.forOldH5) {
          location.href = this.hostLink + '/#/login?from=' +
            btoa(location.href);
        } else {
          location.href = this.hostLink + '/#/login?back=' +
            btoa(location.href);
        }
      }
    }
  };

  var showProduct = function (serial) {
    if (AppMessage.isNative()) {
      AppMessage.showProduct(serial);
    } else {
      if (this.forOldH5) {
        location.href = this.hostLink +
          '/product/product.html?serial=' + serial;
      } else {
        location.href = this.hostLink + '/#/products/' + serial;
      }

    }
  };

  var showProducts = function () {
    if (AppMessage.isNative()) {
      AppMessage.showProducts();
    } else {
      location.href = this.hostLink + '/#/finances/products';
    }
  };

  return {
    hostLink: hostLink,
    apiLink: apiLink,
    userKey: userKey,
    ajax: ajax,
    isLogin: isLogin,
    login: login,
    showProduct: showProduct,
    showProducts: showProducts,
    Request: Request,
    Message: AppMessage,
  };
})();

(function (root) {
  var Share = (function () {
    var shareData;
    var callback;

    function setShareData (data, call) {
      shareData = data;
      callback = call;

      if (AppMessage.isNative()) {
        AppMessage.enableShareButton(shareData);
      } else {
        registerWXConfig();
      }
    }

    function sharePublic () {
      var toShare = shareData;
      if (arguments.length == 1) {
        toShare = arguments[0];
      }

      if (AppMessage.isNative()) {
        AppMessage.share(toShare);
      } else {
        //H5 weixin分享
        var dialog = document.getElementById('dialog');
        if (dialog == null) {
          dialog = document.createElement('div');
          dialog.id = 'dialog';
          dialog.className = 'weixin';
          document.body.appendChild(dialog);
          dialog.addEventListener('click', function () {
            this.style.display = 'none';
          });

        }
        dialog.style.display = 'block';
      }
    }

    function registerWXConfig () {
      tools.ajax.get('http://www.zhangzhijian.com/system/wxconfig', {}, function (data) {
        setWxConfig(data, shareData);
      });
    }

    function setWxConfig (data, shareData) {
      wx.config({
        // debug: true,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      // wx.error(function(res){
      //     alert(JSON.stringify(res))
      //     console.log(JSON.stringify(res))
      // });
      wx.ready(function (res) {
        wx.onMenuShareTimeline({
          title: shareData.text,
          link: shareData.url,
          imgUrl: shareData.image,
          success: function (res) {
            callback('分享成功');
          },
          cancel: function (res) {
            callback('分享失败');
          },
        });
        wx.onMenuShareAppMessage({
          title: shareData.title,
          desc: shareData.text,
          link: shareData.url,
          imgUrl: shareData.image,
          success: function (res) {
            callback('分享成功');
          },
          cancel: function (res) {
            callback('分享失败');
          },
        });
        wx.onMenuShareQQ({
          title: shareData.title,
          desc: shareData.text,
          link: shareData.url,
          imgUrl: shareData.image,
          success: function (res) {
            callback('分享成功');
          },
          cancel: function (res) {
            callback('分享失败');
          },
        });
      });

    }

    return {
      setShareData: setShareData,
      send: sharePublic,
    };

  })();
  root.Share = Share;

})(AppUtil);

var tools = {
  ajax: AppUtil.ajax,
  //暂定样式  提示语
  showToast: function (text) {
    nativeToast({
      message: text,
      position: 'bottom',
      timeout: 5000,
      square: true,
      // type: 'warning'
    });
  },
  //加载动画  第二个参数传参  则为pageload动画
  apiLoading: function (bool, type) {
    if (bool) {
      pageScroll.lock();
      let loadermask = document.createElement('div');
      let loader = document.createElement('div');
      let loadertext = document.createElement('div');
      let loaderinner = document.createElement('div');
      let loaderbox = document.createElement('div');
      let inner = document.createElement('div');
      loadermask.className = 'loader-mask';
      loader.className = 'loader';
      inner.className = 'inner-box';
      loadertext.innerText = '加载中...';
      if(AppUtil.Request.isPC())
      {
        loaderbox.className = 'loader-box-pc';
        loadertext.className = 'loader-text-pc';
        loaderinner.className = 'loader-inner pacman-pc';
      }
      else
      {
        loaderbox.className = 'loader-box-h5';
        loadertext.className = 'loader-text-h5';
        loaderinner.className = 'loader-inner pacman-h5';
      }
      document.body.appendChild(loadermask);
      loadermask.appendChild(loaderbox);
      loaderbox.appendChild(inner);
      inner.appendChild(loader);
      inner.appendChild(loaderinner);
      inner.appendChild(loadertext);

      for (var i = 1; i <= 5; i++) {
        loaderinner.appendChild(document.createElement('div'));
      }
      if (arguments.length > 1) {
        loadermask.style.backgroundColor = '#22b4ed';
        loaderbox.style.backgroundColor = 'transparent';
      }
      else {
        loadermask.style.backgroundColor = 'transparent';
        loaderbox.style.backgroundColor = 'rgba(0,0,0,0.5)';
      }
    }
    else {
      pageScroll.scroll();
      let loadermask=document.querySelector('.loader-mask');
      if (loadermask) {
        loadermask.classList.add('loader-box-hide');
        setTimeout(function () {
          document.body.removeChild(loadermask);
          loadermask.classList.remove('loader-box-hide');
        },500);
      }
    }
  },
  storage: {
    localStorage: function (key, value) {
      if (arguments.length === 1) {
        let data = localStorage.getItem(key);
        return JSON.parse(data);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    sessionStorage: function (key, value) {
      if (arguments.length === 1) {
        let data = sessionStorage.getItem(key);
        return JSON.parse(data);
      } else {
        sessionStorage.setItem(key, JSON.stringify(value));
      }
    },
  },
  pageScroll: (function () {
    return {
      scrollTop:0,
      lock: function () {
        if(document.body.style.position !== 'fixed')
        {
          this.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
          document.body.style.position = 'fixed';
          document.body.style.top =  -this.scrollTop + 'px';
        }
      },
      scroll: function () {
        if(document.body.style.position === 'fixed')
        {
          if(document.body.style.top) this.scrollTop = document.body.style.top.replace('px','');
          document.body.style.position = '';
          document.body.style.top =  '';
          window.scrollTo(0, -this.scrollTop);
        }
      },
    };
  })(),
};

export default {AppUtil, AppMessage, axios, tools};
