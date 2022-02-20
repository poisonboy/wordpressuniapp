/*
 * 
 * 微慕小程序开源版
 * author: jianbo
 * organization: 微慕  www.minapper.com
 * github:    https://github.com/iamxjb/winxin-app-watch-life.net
 * 技术支持微信号：iamxjb
 * 开源协议：MIT
 *  *Copyright (c) 2017 https://www.minapper.com All rights reserved.
 * 
 */
function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        //成功
        resolve(res);
      };

      obj.fail = function (res) {
        //失败
        reject(res);
      };

      fn(obj);
    });
  };
} //无论promise对象最后状态如何都会执行


if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(value => P.resolve(callback()).then(() => value), reason => P.resolve(callback()).then(() => {
      throw reason;
    }));
  };
}
/**
 * 微信用户登录,获取code
 */


function wxLogin() {
  return wxPromisify(uni.login);
}
/**
 * 获取微信用户信息
 * 注意:须在登录之后调用
 */


function wxGetUserInfo() {
  return wxPromisify(uni.getUserInfo);
}
/**
 * 获取系统信息
 */


function wxGetSystemInfo() {
  return wxPromisify(uni.getSystemInfo);
}
/**
 * 保留当前页面，跳转到应用内的某个页面
 * url:'../index/index'
 * params:{key:value1}
 */


function wxNavigateTo(url, params) {
  var wxNavigateTo = wxPromisify(uni.navigateTo);
  const serializedParams = this.paramSerializer(params);

  if (serializedParams.length > 0) {
    url += (url.indexOf('?') == -1 ? '?' : '&') + serializedParams;
  }

  return wxNavigateTo({
    url: url
  });
}

module.exports = {
  wxPromisify: wxPromisify,
  wxLogin: wxLogin,
  wxGetUserInfo: wxGetUserInfo,
  wxGetSystemInfo: wxGetSystemInfo
};