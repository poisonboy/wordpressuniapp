<template>

	<!--
/*
 * 
 * 微慕小程序开源版
 * author: jianbo
 * organization: 微慕  www.minapper.com
 * github:    https://github.com/iamxjb/winxin-app-watch-life.net
 * 技术支持微信号：iamxjb
 * 开源协议：MIT
 * Copyright (c) 2017  微慕 https://www.minapper.com All rights reserved.
 *
 */-->



	<ui-sys title="关于我们">
		<view class="ui-BG-card ui-BG" :style="'display:'+(display)">


			<view class="wrapper">
				<view class="excerpt">
					<!-- <rich-text nodes="{{pageData.content.rendered}}"></rich-text> -->
					<mp-html :content="pageData.post_content" @linktap="wxParseTagATap" :copy-link="false"
						:selectable="true" :lazy-load="true" :markdown="true" />

				</view>

			</view>

			<view class="copyright">
				<!-- parse <template is="tempCopyright" :data="webSiteName:webSiteName,domain:domain"/> -->
				<block name="tempCopyright">
					<view style="margin-top: 24rpx;"> © {{webSiteName}} {{domain}} </view>
				</block>
			</view>

		</view>
	</ui-sys>

</template>

<script>
	/*
	 * 
	 * 微慕小程序开源版
	 * author: jianbo
	 * organization: 微慕  www.minapper.com
	 * github:    https://github.com/iamxjb/winxin-app-watch-life.net
	 * 技术支持微信号：iamxjb
	 * 开源协议：MIT
	 * Copyright (c) 2017  微慕 https://www.minapper.com All rights reserved.
	 * 
	 */
	var Api = require('../../utils/api.js');

	var util = require('../../utils/util.js');

	var wxApi = require('../../utils/wxApi.js');

	var wxRequest = require('../../utils/wxRequest.js');

	var Auth = require('../../utils/auth.js');

	import config from '../../utils/config.js';
	var app = getApp();
	var webSiteName = config.getWebsiteName;
	var domain = config.getDomain;
	export default {
		data() {
			return {
				title: '页面内容',
				pageData: {
					post_content: "",
				},
				pagesList: {},
				display: 'none',
				praiseList: [],
				dialog: {
					title: '',
					content: '',
					hidden: true
				},
				
				system: "",
				webSiteName: webSiteName,
				domain: domain,
				downloadFileDomain: config.getDownloadFileDomain,
				businessDomain: uni.getStorageSync('businessDomain')
			};
		},
		onLoad: function(options) {
			var that = this;
			this.fetchData();
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			});
		},
		onPullDownRefresh: function() {
			var that = this;
			that.setData({
				display: 'none',
				pageData: {}
			});
			this.fetchData(); //消除下刷新出现空白矩形的问题。

			uni.stopPullDownRefresh();
		},
		onShareAppMessage: function() {
			return {
				title: '关于“' + config.getWebsiteName + '”小程序',
				path: 'pages/about/about',
				success: function(res) { // 转发成功
				},
				fail: function(res) { // 转发失败
				}
			};
		},
		// 自定义分享朋友圈
		onShareTimeline: function() {
			return {
				title: '关于“' + config.getWebsiteName + '”小程序'
			};
		},
		methods: {
	
	
			copyLink: function(url) {
				//this.ShowHideMenu();
				uni.setClipboardData({
					data: url,
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: '链接已复制',
									duration: 2000
								});
							}
						});
					}
				});
			},

			//给a标签添加跳转和复制链接事件
			wxParseTagATap: function(e) {
				var that = this;
				var href = e.currentTarget.dataset.src;
				let appid = e.currentTarget.dataset.appid;
				let redirectype = e.currentTarget.dataset.redirectype;
				let path = e.currentTarget.dataset.path; // 判断a标签src里是不是插入的文档链接

				let isDoc = /\.(doc|docx|xls|xlsx|ppt|pptx|pdf)$/.test(href);

				if (isDoc) {
					this.openLinkDoc(e);
					return;
				}

				if (redirectype) {
					if (redirectype == 'apppage') {
						//跳转到小程序内部页面         
						uni.navigateTo({
							url: path
						});
					} else {
						if (redirectype == 'webpage') //跳转到web-view内嵌的页面
						{
							href = '../webpage/webpage?url=' + href;
							uni.navigateTo({
								url: href
							});
						} else {
							if (redirectype == 'miniapp') //跳转其他小程序
							{
								uni.navigateToMiniProgram({
									appId: appid,
									path: path
								});
							}
						}
					}

					return;
				}

				var enterpriseMinapp = that.data.pageData.enterpriseMinapp;
				var domain = config.getDomain; //可以在这里进行一些路由处理

				if (href.indexOf(domain) == -1) {
					var n = 0;

					for (var i = 0; i < that.data.businessDomain.length; i++) {
						if (href.indexOf(that.data.businessDomain[i].domain) != -1) {
							n++;
							break;
						}
					}

					if (n > 0) {
						var url = '../webpage/webpage';

						if (enterpriseMinapp == "1") {
							url = '../webpage/webpage';
							uni.navigateTo({
								url: url + '?url=' + href
							});
						} else {
							that.copyLink(href);
						}
					} else {
						that.copyLink(href);
					} // wx.setClipboardData({
					//   data: href,
					//   success: function (res) {
					//     wx.getClipboardData({
					//       success: function (res) {
					//         wx.showToast({
					//           title: '链接已复制',
					//           //icon: 'success',
					//           duration: 2000
					//         })
					//       }
					//     })
					//   }
					// })

				} else {
					var slug = util.GetUrlFileName(href, domain);

					if (slug == "") {
						var url = '../webpage/webpage';

						if (enterpriseMinapp == "1") {
							url = '../webpage/webpage';
							uni.navigateTo({
								url: url + '?url=' + href
							});
						} else {
							that.copyLink(href);
						}

						return;
					}

					if (slug == 'index') {
						uni.switchTab({
							url: '../index/index'
						});
					} else {
						var getPostSlugRequest = wxRequest.getRequest(Api.getPostBySlug(slug));
						getPostSlugRequest.then(res => {
							if (res.statusCode == 200) {
								if (res.data.length != 0) {
									var postID = res.data[0].id;
									var openLinkCount = uni.getStorageSync('openLinkCount') || 0;

									if (openLinkCount > 4) {
										uni.redirectTo({
											url: '../detail/detail?id=' + postID
										});
									} else {
										uni.navigateTo({
											url: '../detail/detail?id=' + postID
										});
										openLinkCount++;
										uni.setStorageSync('openLinkCount', openLinkCount);
									}
								} else {
									var url = '../webpage/webpage';

									if (enterpriseMinapp == "1") {
										url = '../webpage/webpage';
										uni.navigateTo({
											url: url + '?url=' + href
										});
									} else {
										that.copyLink(href);
									}
								}
							}
						}).catch(res => {
							console.log(response.data.message);
						});
					}
				}
			},

			// 打开文档
			openLinkDoc(e) {
				let self = this;
				let url;
				let fileType; // 如果是a标签href中插入的文档

				let src = e.currentTarget.dataset.src;
				var n = 0;

				for (var i = 0; i < self.data.downloadFileDomain.length; i++) {
					if (src.indexOf(self.data.downloadFileDomain[i].domain) != -1) {
						n++;
						break;
					}
				}

				if (n == 0) {
					self.copyLink(src);
					return;
				}

				let docType;
				let isDoc = /\.(doc|docx|xls|xlsx|ppt|pptx|pdf)$/.test(src);

				if (src && isDoc) {
					url = src;
					fileType = /doc|docx|xls|xlsx|ppt|pptx|pdf$/.exec(src)[0];
				} else {
					url = e.currentTarget.dataset.filelink;
					fileType = e.currentTarget.dataset.filetype;
				}

				uni.downloadFile({
					url: url,
					success: function(res) {
						const filePath = res.tempFilePath;
						uni.openDocument({
							filePath: filePath,
							fieldType: fileType
						});
					},
					fail: function(error) {
						console.log('下载文档失败:' + error);
					}
				});
			},

			copyLink: function(url) {
				uni.setClipboardData({
					data: url,
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: '链接已复制',
									duration: 2000
								});
							}
						});
					}
				});
			},

		

			fetchData: function() {
				var that = this;
				var getPageRequest = wxRequest.getRequest(Api.getAboutPage());
				getPageRequest.then(response => {
					console.log(response);
					uni.setNavigationBarTitle({
						title: response.data.post_title,
						success: function(res) { // success
						}
					});
					that.setData({
						pageData: response.data
					});
					that.setData({
						display: 'block'
					});
				});
			},

			confirm() {
				console.log("占位：函数 confirm 未声明");
			}
		}
	};
</script>
<style>
	/*
 * 
 * 微慕小程序开源版
 * author: jianbo
 * organization: 微慕  www.minapper.com
 * github:    https://github.com/iamxjb/winxin-app-watch-life.net
 * 技术支持微信号：iamxjb
 * Copyright (c) 2017  微慕 https://www.minapper.com All rights reserved.
 * 
 */


	.wrapper {
		padding: 5rpx;
	}

	.excerpt {

		line-height: 64rpx;
		text-align: left;
	}

	.h2 {
		clear: both;
		border-width: 1px 0;
		color: #666;
		text-align: center;
		font-size: 28rpx;
		line-height: 64rpx;
		font-weight: bold;
	}

	.clearfix {
		margin: 5px 15px;
		display: inline-block;
	}

	.wxParse-a {
		color: #21759b
	}

	.wxParse-p {
		margin-top: 0.8em;
		margin-bottom: 0.8em
	}

	.wxParse-p image {
		margin: 0 auto;
		width: 100% !important;
		box-shadow: 2rpx 4rpx 16rpx #666
	}

	.praisePost {
		position: relative;
		text-align: left;
		margin-top: 30rpx;
		margin-bottom: 30rpx;


	}

	.praiseTitle {
		text-align: center;
		font-weight: normal;
		line-height: 40rpx;
		margin-top: 50rpx;
		margin-bottom: 20rpx;
		font-size: 28rpx;
		color: #959595 !important;
		vertical-align: middle;

		height: 70rpx;
		border-radius: 30rpx;



	}

	.praiseText {
		text-align: center;
		font-weight: normal;
		font-size: 26rpx;
		line-height: 50rpx;
		color: #21759b !important;
		margin-bottom: 20rpx;

	}

	.img-like {
		width: 50rpx;
		height: 50rpx;
		display: inline-block;
		text-align: center;
		margin-right: 20rpx;
		margin-top: 8rpx;
	}


	.gravatarLikeImg {
		margin-top: 4px;

		height: 48rpx;
		width: 48rpx;
		margin-right: 20rpx;
	}

	.praise-button {
		font-size: 0.785714286rem;
		font-weight: normal;
		color: #fff;

		background-repeat: repeat-x;
		margin-top: 24rpx;
		width: 320rpx;
		height: 60rpx;
		border-radius: 60rpx;
	}

	.praise-button::after {
		border: none;
	}

	.gotowebpage-button {
		font-size: 0.785714286rem;
		font-weight: normal;
		color: #fff;

		background-repeat: repeat-x;
		line-height: 80rpx;
		margin-top: 40rpx;
		width: 320rpx;
		height: 60rpx;
		border-radius: 60rpx;
	}

	.gotowebpage-button::after {
		border: none;
	}
</style>
