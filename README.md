## WordPress多端应用
后端使用开源博客建站系统wordpress和微慕小程序开源版插件，前端使用uniapp+colorui。
 
本项目可以直接同步wordpress的内容并生成H5、微信小程序、QQ小程序、支付宝小程序、百度小程序、头条抖音小程序、安卓APP、苹果APP及快应用。
<img src="https://blogminapp.oss-accelerate.aliyuncs.com/wp-content/uploads/2022/05/1651638004-20220504122004322.png" alt="" style="max-width:100%;" width="748">
目前的模板是资讯模板，后期会看下载和使用情况增加企业官网等模板

## 注意事项
因为没有用到互动功能，所以wordpress后台的微慕小程序插件只起到同步内容的作用，appid和密钥及赞赏相关的设置不需要设置。

如果需要互动和激励广告等功能，可以使用微慕开源版原生微信小程序。

不要因为没有百度等小程序的设置就给差评，也不要因为自己不会使用就给差评，**有问题留言**。

## 问答交流
**请不要以差评的方式提问，非常感谢**

1. 直接在dcloud插件市场评论提问，有问题直接留言即可 
2. 在ask论坛提问：[点此提问](https://ask.dcloud.net.cn "点此提问") 
3. 付费咨询及远程服务加微信：poisonkid

【微信仅提供付费服务，有问题尽量使用1、2方式提问，也方便后边的人】

## 案例演示
演示的不一定是最新版，以dcloud插件市场发布为准

多端H5：https://www.watch-life.net/h5/index.html

安卓APP：https://wwi.lanzoul.com/iRUlq00d5m4f

苹果APP： 暂未上线

小程序：守望轩LIVE（原生小程序,有互动支付相关功能）

快应用： 暂未上线

 如果你有多端小程序账号，且为企业主体，可以联系我搭建作为案例演示

## 使用方法
### 网站后端
**建议先看看[微慕小程序开源版安装文档](https://docs.minapper.com/minfree/2304123 "微慕小程序开源版安装文档")**
1. 搭建wordpress网站，推荐使用nginx+php7.4+mysql5.7
2. 在wordpress插件市场搜索“REST API TO MiniProgram”安装并启用微慕小程序开源版插件
3. 设置wordpress固定连接及伪静态规则，推荐使用/%post_id%.html
    - 在浏览器输入https://xxx.com/wp-json/wp/v2/posts
	- 如果有数据输出则说明设置没有问题，如果出现404或者其他问题则说明伪静态没有设置好
4. 发布一些文章，发布一个关于我们的页面
    - 在微慕小程序—扩展设置—设置轮播图及精选栏目
	- 在微慕小程序—基础设置—设置显示的文章分类id 和"关于我们"页面
5. 小程序后台还需要设置授权域名，必须支持https
 
### 前端
1. 将本项目导入HbuilerX
2. 安装[SaaS插件](https://ext.dcloud.net.cn/plugin?name=compile-node-sass "SaaS插件")
3. 设置/utils/config.js下的域名及其他信息
 ```html
var DOMAIN = "www.watch-life.net";  //网站域名
var WEBSITENAME = "守望轩"; //网站名称
var PAGECOUNT = '10'; //每页文章数目
var WECHAT = '微信号：poisonkid'; //联系方式如：微信号：iamxjb 邮箱：468909765@qq.com
```
4. 运行到各端体验即可

## 常见问题
摘录一些留言及付费解决的问题到这里，如果你遇到同样问题可以尝试一下

Q: **打包了app安装好了，但是打开白屏**

A: 之前的版本没有设置轮播图就会导致所有内容不显示，新版已经解决此问题

另外如果伪静态没有做好，api没有内容输出也会白屏
还有一种情况就是模拟器打开白屏，但是真机没有问题，是因为manifest.json设置里没有勾选x86



Q: **怎么设置默认主题色**

A: 在app/store/index.js中设置
 ```
    themeAuto: false, // 深色模式跟随系统
	theme: 'light', // 设置默认模式，dark深色 light浅色
	main: 'blue', // 设置默认主题色
```

 ## 感谢
 专业的WordPress生成小程序解决方案 —— [微慕](https://blog.minapper.com/)
 
 界面精美专注视觉的小程序css组件库  ——[color-ui](https://github.com/Color-UI/MP-CU) 
 
 color-ui的UNIAPP版本  ——[ColorUI-UniApp](https://ext.dcloud.net.cn/plugin?id=239)
 
