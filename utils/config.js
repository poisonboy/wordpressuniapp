/*
 * 
 * 微慕小程序开源版
 * author: jianbo
 * organization: 微慕  www.minapper.com
 * github:    https://github.com/iamxjb/winxin-app-watch-life.net
 * 技术支持微信号：iamxjb
 * 开源协议：MIT
 * Copyright (c) 2017  微慕 https://www.minapper.com All rights reserved.
 */
//配置域名,域名只修改此处。
//如果wordpress没有安装在网站根目录请加上目录路径,例如："www.watch-life.net/blog"
var DOMAIN = "www.watch-life.net";
var WEBSITENAME = "守望轩"; //网站名称

var PAGECOUNT = '10'; //每页文章数目

var WECHAT = '微信号：poisonkid'; //联系方式如：微信号：iamxjb 邮箱：468909765@qq.com
//是否启用小程序扫描二维码登录网站  true 启用  false  不启用
//未安装微慕登录插件不要启用

const enableScanLogin = true; //////////////////////////////////////////////////////
//微慕小程序端版本,请勿修改

const minapperVersion = 4.2;
const minapperSource = "free"; //////////////////////////////////////////////////////

export default {
	data() {
		return {}
	},
	getDomain: DOMAIN,
	getWebsiteName: WEBSITENAME,
	getPageCount: PAGECOUNT,
	getWecat: WECHAT,
	enableScanLogin,
	minapperVersion,
	minapperSource
}
