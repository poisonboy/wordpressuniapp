<template>
	<block>
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



		<ui-sys title="最新评论">


			<view class="">
				<view class="showerror" :style="'display:'+(showerror)">
					<text class="cicon-wifi-off text-xsl"></text>
					<view class="errortext">
						暂时无法访问网络
						<view class="">
							<button class="more-button" @tap="reload" size="mini">重新加载</button>
						</view>
					</view>
				</view>

				<view :style="'display:'+(showallDisplay)">
					<view class="log-list">
						<block v-for="(item,index) in readLogs" :key="item.id">



							<view class="log-items ui-BG-card ui-BG" :index="index" :id="item[0]"
								:data-itemtype="item[2]" @tap.stop.prevent="redictDetail">
								<view class="log-items_tx">
									<image :src="item.author_url" />
								</view>
								<view class="log-items_top">
									<text class="flr ui-TC-3 text-sm ">{{item[2]}}</text>
									<text class="name ui-TC text-df">{{item.author_name}}</text>
								</view>
								<view class="log-items_nr ui-TC text-df">{{item[1]}}
									<text class="ui-TC-Main-2 text-sm flr"> 查看原文</text>
								</view>

							</view>




						</block>
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
	</block>
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
	 * 
	 *  *Copyright (c) 2017 https://www.minapper.com All rights reserved.
	 */
	var Api = require('../../utils/api.js');

	var util = require('../../utils/util.js');

	var wxApi = require('../../utils/wxApi.js');

	var wxRequest = require('../../utils/wxRequest.js');

	const Adapter = require('../../utils/adapter.js');

	import config from '../../utils/config.js';
	var pageCount = config.getPageCount;
	var webSiteName = config.getWebsiteName;
	var domain = config.getDomain;
	export default {
		data() {
			return {
				title: '最新评论列表',
				showerror: "none",
				showallDisplay: "block",
				readLogs: [],
				webSiteName: webSiteName,
				domain: domain,
				floatDisplay: ""
			};
		},
		onShareAppMessage: function() {
			var title = "分享" + config.getWebsiteName + "的最新评论";
			var path = "pages/comments/comments";
			return {
				title: title,
				path: path,
				success: function(res) { // 转发成功
				},
				fail: function(res) { // 转发失败
				}
			};
		},
		// 自定义分享朋友圈
		onShareTimeline: function() {
			return {
				title: '“' + config.getWebsiteName + '”最新评论',
				path: 'pages/comments/comments'
			};
		},
		onLoad: function(options) {
			var that = this;
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline'],
				success: function(e) { //console.log(e);
				}
			});
			Adapter.setInterstitialAd("enable_comments_interstitial_ad");
			that.fetchCommentsData();
		},
		onPullDownRefresh: function() {
			var that = this;
			this.setData({
				readLogs: []
			});
			that.setData({
				showallDisplay: "none",
				showerror: "none"
			});
			that.fetchCommentsData(); //消除下刷新出现空白矩形的问题。

			uni.stopPullDownRefresh();
		},
		methods: {
			reload: function(e) {
				var that = this;
				this.setData({
					readLogs: []
				});
				that.setData({
					showallDisplay: "none",
					showerror: "none"
				});
				that.fetchCommentsData();
			},

			//获取文章列表数据
			fetchCommentsData: function() {
				var that = this;
				uni.showLoading({
					title: '正在加载',
					mask: true
				});
				var getNewComments = wxRequest.getRequest(Api.getNewComments());
				getNewComments.then(response => {
					if (response.statusCode == 200) {
						this.setData({
							readLogs: response.data.map(function(item) {
								item[0] = item.post; //  item[1] = util.removeHTML(item.content.rendered + '(' + item.author_name + ')');

								item[1] = util.removeHTML(item.content.rendered);
								item[2] = util.cutstr(item.date, 10, 1);
								return item;
							})
						});
						that.setData({
							showallDisplay: "block"
						});
					} else {
						console.log(response);
						this.setData({
							showerror: 'block'
						});
					}
				}).catch(function() {
					that.setData({
						showerror: "block",
						floatDisplay: "none"
					});
				}).finally(function() {
					uni.hideLoading();
				});
			},

			// 跳转至查看文章详情
			redictDetail: function(e) {
				var id = e.currentTarget.id;
				var url = '../detail/detail?id=' + id;
				// console.log('查看文章');
				;
				uni.navigateTo({
					url: url
				});
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
 * 开源协议：MIT
 * Copyright (c) 2017  微慕 https://www.minapper.com All rights reserved.
 */

	.list-header {
		padding: 50rpx 0;
		text-align: left;
		font-weight: normal;
		font-size: 40rpx;
		line-height: 40rpx;
		color: #21759b;
		border-bottom: 2rpx solid #ededed;
		margin-bottom: 48rpx;
	}

	/*topic list*/



	.topic-list-item {
		position: relative;
		overflow: hidden;
		clear: both;

		background: #fff;
	}

	.topic-list-item image.cover {
		width: 100%;
		height: 200rpx;
		/*filter: blur(4px);*/
	}


	.log-list {
		display: flex;
		flex-direction: column;

	}

	.log-items {
		padding: 24rpx 24rpx 24rpx 100rpx;
		position: relative;
	}

	.log-items_tx {
		position: absolute;
		top: 24rpx;
		left: 24rpx;
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		background: #f8f8f8 !important;
	}

	.log-items_tx image {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
	}

	.log-items_top {
		height: 50rpx;
		line-height: 50rpx;
		overflow: hidden;
	}

	.flr {
		float: right;
	}

	.log-items_nr {
		margin: 8rpx 0;

	}
</style>
