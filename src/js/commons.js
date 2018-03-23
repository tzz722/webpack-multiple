import {apiLoading, ajax, showToast, AppUtil, FastClick, pageScroll, anime, AppMessage} from './commonJS/packet';

export let Act = class Act {
    constructor () {
        this.acttitle = '180315';
        this.rotating = false;
        this.rotary;
        this.move;
        this.data = {}; // 全局数据
        this.state = 0; // 活动状态
        this.times = 0; // 转盘次数
        this.list = []; // 获奖列表
        this.mylist = []; // 个人获奖列表
        this.annual = 0; // 年化值
        this.vip = 0; // vip等级
        this.hasreceive = 0;// 是否领取过红包
        this.hasshare = 0;// 是否分享过
        this.prizelist = ['旅游金2000元', 'MINI自拍杆', '小米充电宝', '中石化加油卡500元', '兔子保温杯', '迪士尼双人票', '旅行箱', '50元代金券']; // 奖品列表
    }

    async init () {
        FastClick.attach(document.body); // 300毫秒延迟fix
        await this.getPageDate(); // 获取页面数据
        this.rotary = new Rotary();
        this.setBtnEvent(); // 绑定事件 只再首次进入页面绑定
        this.setActMode(); // 设置活动状态 修改页面按钮显示
    }

    resetData () {
        this.state = this.data.status || 0;
        this.list = this.data.prizeRecords || [];
        if (JSON.stringify(this.data.user) !== '{}') {
            this.mylist = this.data.user.prizeRecords || [];
            this.annual = this.data.user.vip.annual || 0;
            this.vip = this.data.user.vip.level || 0;
            this.times = this.data.user.giftRecord.leftDrawTimes || 0;
            this.hasreceive = this.data.user.giftRecord.hadReceive || 0;
            this.hasshare = this.data.user.giftRecord.leftShareTimes || 0;
        }
    }

    async getPageDate () {
        await ajax.promiseAjaxGet('/activity/' + this.acttitle + '/state', {}, (data) => {
            if (parseInt(data.code) === 0) {
                this.data = data;
                this.resetData();
            } else {
                showToast(data.msg);
            }
        });
    }

    // 更新页面
    async refash () {
        await this.getPageDate();// 刷新页面数据
        this.setActMode(); // 初始化获奖列表
    }

    setBtnEvent () {
        let that = this;
        rotaryBind(); // 绑定转盘事件
        jumpToBuyBind(); // 绑定购买事件
        receivePacket(); // 绑定领取红包事件
        Invite(); // 绑定邀请好友事件
        openPrizeList(); // 绑定显示获奖列表事件
        reLogin(); // 绑定年化值重登录事件
        closePopop(); // 绑定关闭弹窗事件
        // 非PC独立事件
        if (!AppUtil.Request.isPC()) {
            openRule(); // 绑定打开活动规则
            initShare(); // 初始化分享
            Share(); //  绑定分享页面事件
            updataInfo(); // 更新用户信息
        }

        function openRule () {
            document.querySelector('.act-rule').addEventListener('click', () => {
                mianCheck([0, 1, 2], false, function () {
                    that.showPopop('rule');
                });
            }, false);
        }

        function Share () {
            document.querySelector('#share').addEventListener('click', () => {
                mianCheck([1], true, function () {
                    AppUtil.Share.send();
                });
            }, false);
        }

        function initShare () {
            let shareData = {
                title: '暖春造富，天降豪礼，就差你没领啦~',
                text: '2000元旅游金、迪士尼双人票、中石化加油卡500元等超多好礼疯狂抽取中...',
                url: AppUtil.hostLink + '/activity/180315/view/',
                image: 'http://zhangzhijian.b0.upaiyun.com/upload/alauda/static/res/activity0315/images/share0001.jpg',
            };
            AppUtil.Share.setShareData(shareData, function (text) {
                if (text === '分享成功') {
                    if (that.state === 1 && that.hasshare >= 1) {
                        apiLoading(true);
                        ajax.post('activity/' + that.acttitle + '/shared', {}, (data) => {
                            apiLoading(false);
                            if (parseInt(data.code) === 0) {
                                showToast('分享成功');
                                that.refash();
                            } else {
                                showToast(data.msg);
                            }
                        });
                    }
                }
            });
        }

        function updataInfo () {
            document.querySelector('.updata-btn').addEventListener('click', () => {
                mianCheck([1, 2], true, function () {
                    let name = getValue('name');
                    let phone = getValue('phone');
                    let address = getValue('address');
                    if (!name || !phone || !address) {
                        return;
                    } // 内容不全
                    if (!checkPhone(phone)) {
                        showToast('手机号码格式错误');
                        return;
                    }
                    let params = {name: name, phone: phone, address: address};
                    apiLoading(true);
                    ajax.post('api/contact', params, (data) => {
                        apiLoading(false);
                        if (parseInt(data.code) === 0) {
                            that.showPopop('tip', '修改成功');
                        } else {
                            showToast(data.msg);
                        }
                    });
                });
            }, false);

            // 必须id对应
            function getValue (select) {
                return document.querySelector('#' + select).value;
            }

            function checkPhone (num) {
                var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                return (reg.test(num));
            }
        }

        function reLogin () {
            document.querySelector('#annual').addEventListener('click', () => {
                mianCheck([0, 1, 2], true, function () {
                });
            }, false);
        }

        function openPrizeList () {
            document.querySelector('.rotary-btn').addEventListener('click', () => {
                mianCheck([1, 2], true, function () {
                    let finallist = makeSureList();
                    if (!AppUtil.Request.isPC()) {
                        apiLoading(true);
                        ajax.get('api/contact', {}, (data) => {
                            apiLoading(false);
                            if (parseInt(data.code) === 0) {
                                that.showPopop('prize', finallist);
                                setInfo([{name: data.name}, {phone: data.phone}, {address: data.address}]);
                            } else {
                                showToast(data.msg);
                            }
                        });
                    } else {
                        that.showPopop('prize', finallist);
                    }
                });
            }, false);

            function makeSureList () {
                let newlist = [];
                let newobjlist = [];
                that.mylist.forEach((item) => {
                    if (!newlist.includes(item.prizeName)) {
                        newlist.push(item.prizeName);
                    }
                });
                newlist.forEach((item) => {
                    let num = 0;
                    that.mylist.forEach((itemin) => {
                        if (item === itemin.prizeName) {
                            num++;
                        }
                    });
                    newobjlist.push({prizeName: item, num: num});
                });
                return newobjlist;
            }

            function setInfo (infolist) {
                infolist.forEach((item) => {
                    document.querySelector('#' + Object.keys(item)).value = Object.values(item);
                });
            }
        }

        function Invite () {
            document.querySelector('#invite').addEventListener('click', () => {
                mianCheck([1], true, function () {
                    if (AppUtil.Request.isPC()) {
                        parent.postMessage('/activity/yqhy', '*');
                    } else {
                        var url = AppUtil.hostLink + '/app/yqhy.html';
                        var userKey = AppUtil.userKey;
                        if (userKey) {
                            url += '?userKey=' + userKey;
                        }
                        window.location.href = url;
                    }
                });
            }, false);
        }


        function receivePacket () {
            document.querySelector('.receive-btn').addEventListener('click', (e) => {
                mianCheck([1], true, function () {
                    if (!that.hasreceive) {
                        apiLoading(true);
                        ajax.post('activity/' + that.acttitle + '/preferences/achieve', {}, (data) => {
                            apiLoading(false);
                            if (parseInt(data.code) === 0) {
                                that.showPopop('tip', '领取成功');
                                that.hasreceive = 1;
                                e.target.innerText = '立即投资';
                            } else {
                                that.showPopop('tip', data.msg);
                            }
                        });
                    } else {
                        if (AppUtil.Request.isFromNative()) {
                            AppMessage.showProducts();
                        } else {
                            if (AppUtil.Request.isPC()) {
                                parent.postMessage('/newProducts', '*');
                            } else {
                                window.location.href = AppUtil.hostLink + '/#/finances/products';
                            }
                        }
                    }
                });
            }, false);
        }

        function closePopop () {
            let closelist = [].slice.call(document.querySelectorAll('.close-btn'));
            closelist.forEach((item) => {
                item.addEventListener('click', () => {
                    that.showPopop();
                });
            }, false);
        }

        function jumpToBuyBind () {
            let buylist = [].slice.call(document.querySelectorAll('.buy-btn'));
            buylist.forEach((item) => {
                item.addEventListener('click', () => {
                    mianCheck([1], true, function () {
                        if (AppUtil.Request.isFromNative()) {
                            AppMessage.showProducts();
                        } else {
                            if (AppUtil.Request.isPC()) {
                                parent.postMessage('/newProducts', '*');
                            } else {
                                window.location.href = AppUtil.hostLink + '/#/finances/products';
                            }
                        }
                    });
                }, false);
            });
        }

        function rotaryBind () {
            document.querySelector('.go').addEventListener('click', () => {
                mianCheck([1], true, function () {
                    that.getPrize();
                });
            }, false);
        }

        // 活动点击主要逻辑 allowlist活动允许的状态 hasLogin是否登录 callback回调
        function mianCheck (allowlist, hasLogin, callback) {
            if (!allowActState(allowlist)) {
                return;
            }
            if (hasLogin) {
                if (!AppUtil.isLogin()) { // 未登录跳转
                    AppUtil.login();
                    return;
                }
            }
            callback();
        }

        // 返回填入的活动状态是否在允许的活动状态内
        function allowActState (allowlist) {
            return allowlist.includes(that.state);
        }
    }

    // 设置活动的状态和显示
    setActMode () {
        let times = this.times;
        let state = parseInt(this.state);
        let annual = this.annual;
        let vip = this.vip;
        let hasreceive = this.hasreceive;
        let swiperbox = document.querySelector('.swiper-box');
        // 0活动未开始  1活动中  2活动已结束
        if (state === 0) {
            swiperbox.innerText = '活动未开始';
            swiperbox.classList.add('before-start');
            this.times = 0;
            setBtn('活动未开始');
        } else if (state === 1) {
            swiperbox.classList.remove('before-start');
            setBtn();
            this.initPrizeList();
        } else if (state === 2) {
            swiperbox.classList.remove('before-start');
            this.times = 0;
            setBtn('活动已结束');
            this.initPrizeList();
        }

        setAnnual();
        setRotaryTimes();

        // 设置年化值
        function setAnnual () {
            if (AppUtil.isLogin()) {
                document.querySelector('#next').style.display = 'block';
                let nextlevel = 0;
                let nextlist = [1000, 50000, 500000, 5000000];
                if (vip === 4) {
                    document.querySelector('#next').style.display = 'none';
                } else {
                    nextlevel = nextlist[vip] - annual;
                    document.querySelector('#next>span').innerText = nextlevel;
                }
            } else {
                annual = '请登录查看';
                document.querySelector('#next').style.display = 'none';
            }
            document.querySelector('#annual').innerText = annual;
            document.querySelector('#vip').innerText = 'VIP' + vip;
        }

        // 设置抽奖次数
        function setRotaryTimes () {
            document.querySelector('.rotary-times>span').innerText = times;
        }

        // 设置按钮的显示
        function setBtn (str) {
            let list = [].slice.call(document.querySelectorAll('.change-btn'));
            list.forEach((item) => {
                if (str) {
                    item.innerText = str;
                }
                if (state === 1) {
                    if (hasreceive) {
                        if ([].slice.call(item.classList).includes('receive-btn')) {
                            item.innerText = '立即投资';
                        }
                    }
                }
                if (state === 2) {
                    item.classList.add('common-btn-disable');
                    if ([].slice.call(item.classList).includes('rotary-btn')) {
                        item.innerText = '查看我的奖品';
                        item.classList.remove('common-btn-disable');
                    }
                }
            });
        }
    }

    async getPrize () {
        let times = this.times;
        // 用于检测是否存在次数  不存在则不发请求
        if (times <= 0) {
            this.showPopop('notimes');
        }
        if (this.rotating || times <= 0) {
            return;
        }
        this.rotating = true;
        let num = 0;
        let allowrotate = true;
        apiLoading(true);
        await ajax.promiseAjaxPost('activity/' + this.acttitle + '/lottery', {}, (data) => {
            apiLoading(false);
            if (parseInt(data.code) === 0) {
                num = this.prizelist.indexOf(data.prizeRecord.prizeName);
                times = data.giftRecord.leftDrawTimes;
                allowrotate = true;
            } else {
                showToast(data.msg);
                allowrotate = false;
            }
        });
        if (!allowrotate) {
            return;
        }
        this.rotary.rotate(
            document.querySelector('.rotary'),
            this.prizelist,
            num,
            times,
            () => {
                document.querySelector('.rotary').classList.add('rotary-active');
            },
            (prezename) => {
                this.rotating = false;
                document.querySelector('.rotary').classList.remove('rotary-active');
                this.showPopop('prizetip', prezename);
                this.refash();
            });
    }

    // 弹窗方法
    showPopop (type, msg) {
        let mask = document.querySelector('.act-mask'); // 遮罩层
        let title = document.querySelector('.popup-title'); // 弹窗标题
        let rule = document.querySelector('.rule-box'); // 规则介绍弹窗
        let prompt = document.querySelector('.prompt-box'); // 提示弹窗
        let prize = document.querySelector('.popop-prize-box'); // 获奖
        let tip = document.querySelector('#tip'); // 通常状态的按钮
        let notimes = document.querySelector('#no-times'); // 没有次数的按钮
        let updata = document.querySelector('#updata'); // 修改地址按钮
        let poplist = [mask, rule, prompt, tip, notimes, updata, prize];
        init(); // 初始化弹窗
        if (type) {
            pageScroll.lock();
            if (type === 'prizetip') {
                mask.style.display = 'block';
                tip.style.display = 'block';
                prompt.style.display = 'block';
                prompt.innerHTML = '<div>恭喜您人品大爆发！</div><div>获得<span>' + msg + '</span></div>';
                title.innerText = '提示';
            }
            if (type === 'tip') {
                mask.style.display = 'block';
                tip.style.display = 'block';
                prompt.style.display = 'block';
                prompt.innerHTML = '<div>' + msg + '</div>';
                title.innerText = '提示';
            }
            if (type === 'rule') {
                mask.style.display = 'block';
                tip.style.display = 'block';
                rule.style.display = 'block';
                title.innerText = '活动规则';
            }
            if (type === 'prize') {
                mask.style.display = 'block';
                prize.style.display = 'block';
                if (AppUtil.Request.isPC()) {
                    tip.style.display = 'block';
                } else {
                    updata.style.display = 'block';
                }
                let html = '';
                if (msg.length <= 0) {
                    html = '<div>暂未获得奖品，快参与理财抽奖吧！</div>';
                } else {
                    msg.forEach((item) => {
                        html += '<div>' + item.prizeName + ' × ' + item.num + '</div>';
                    });
                }
                prize.querySelector('.prize-list').innerHTML = html;
                title.innerText = '中奖记录';
            }
            if (type === 'notimes') {
                mask.style.display = 'block';
                notimes.style.display = 'block';
                prompt.style.display = 'block';
                prompt.innerHTML = '<div><span>无抽奖机会</span></div><div>投资即可抽超多壕礼，100%中奖</div>';
                title.innerText = '提示';
            }
        }

        function init () {
            poplist.forEach((item) => {
                title.innerText = '';
                prompt.innerHTML = '';
                item.style.display = 'none';
                pageScroll.scroll();
            });
        }
    }

    // 初始化获奖列表
    initPrizeList () {
        let list = this.list;
        let swiperbox = document.querySelector('.swiper-box');
        swiperbox.innerHTML = '';
        swiperbox.style.transform = 'translateY(0px)';
        clearInterval(this.move);
        if (list.length > 0) {
            swiperbox.classList.remove('before-start');
            let html = '';
            if (list.length <= 5) {
                for (let i = 0; i <= list.length - 1; i++) {
                    html += makeList(list, i);
                }
                swiperbox.innerHTML = html;
            } else {
                for (let i = 0; i <= 5; i++) {
                    html += makeList(list, i);
                }
                swiperbox.innerHTML = html;
                let n = 6;
                // 定时器
                this.move = setInterval(() => {
                    // 增加新的一项
                    if (n >= list.length) {
                        n = 0;
                    }
                    swiperbox.innerHTML += makeList(list, n);
                    anime({
                        targets: swiperbox,
                        translateY: {
                            value: -swiperbox.childNodes[0].clientHeight,
                            duration: 1000,
                            easing: 'easeInOutSine',
                        },
                        begin: () => {
                        },
                        complete: () => {
                            // 去除第一项
                            swiperbox.removeChild(swiperbox.childNodes[0]);
                            swiperbox.style.transform = 'translateY(0px)';
                            n++;
                        },
                    });
                }, 2000);
            }
        } else {
            swiperbox.innerHTML = '虚位以待';
            swiperbox.classList.add('before-start');
        }

        function makeList (list, n) {
            var name = list[n].name;
            if (!name) {
                name = '幸运用户';
            }
            return '<div class=\'prize-item\'><div>' + name + '</div>' + '<div>' + list[n].phone + '</div>' + '<div>获得' + list[n].prizeName + '</div></div>';
        }
    }

};

export let Rotary = class Rotary {
    constructor () {

    }

    // 转盘滚动 滚动的dom 奖品名单 获得奖励 弹窗回调
    rotate (dom, prizelist, prize, times, beforecallback, aftercallback) {
        let returnPrize;
        let len = prizelist.length;
        let angle = 0;
        if (prizelist[prize]) {
            angle = prize / len * 360;
            returnPrize = prizelist[prize];
        } else {
            returnPrize = '出错了，请重试';
        }
        anime({
            targets: dom,
            rotate: {
                value: angle + 1080 || 1080,
                duration: 3000,
                easing: 'easeInOutSine',
            },
            begin: () => {
                beforecallback();
            },
            complete: () => {
                setTimeout(
                    () => {
                        dom.style.transform = 'rotate(' + (angle) + 'deg)';
                        aftercallback(returnPrize);
                    }, 500);
            },
        });
    }
};
