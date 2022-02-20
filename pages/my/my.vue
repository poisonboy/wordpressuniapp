<template>
	<block>



		<ui-sys tabbar>
			<ui-navbar :back="false" bg="ui-BG-Main">
			</ui-navbar>
			<!-- 用户信息 -->
			<view class="userinfo ui-BG-Main">
			</view>

			<view class="info_box ui-BG-card ui-BG">

				<view class="info_avatar">
					<image mode="aspectFill" src="../../static/images/gravatar.png" />
				</view>
				<view class="info_data">
					<view class="info_user">
						<view class="info_name ui-TC">{{webSiteName}} </view>
						<text class="info_lv ui-BG-Main radius">{{domain}}</text>


					</view>


				</view>
			</view>
			<!-- 浏览记录 -->
			<!-- <view class="  ui-BG-card ui-BG">
				<ui-title title="我的记录" depth="3">
					<text slot="icon" class="ui-TC-Main cicon-slack-square" />
				</ui-title>

				<view class="ui-grid ui-cols-4  ">
					<block v-for="(item,index) in (list)" :key="item.id">



						<navigator class="ui-item " :url="item.path">
							<view><text :class="(item.icon)+' text-xxl m-2'" :style="'color:'+(item.color)"></text>
							</view>
							<text class="ui-TC text-df">{{item.name}}</text>
						</navigator>



					</block>
				</view>
			</view> -->
			<!-- 服务列表 -->
			<view class="ui-BG-card ui-BG">

				<ui-menu ui=" radius">

					<ui-menu-item arrow title="关于我们" icon="cicon-service-fill"   @click.native="_to('/pages/about/about')">
					</ui-menu-item>

					<ui-menu-item arrow title="联系方式" icon="cicon-weixin" isAction :data-value="wechat"
						@click.native="tapCopy">

						<text slot="action" class="text-sm ui-TC-3 m-1"  >{{wechat}}</text>
					</ui-menu-item>

					<!-- 	<view style="position: relative;">
						<ui-menu-item arrow title="在线客服" icon="cicon-service" data-url="/pages/about/about"
							@tap.native="tapToUrl" /> <button class="ui-btn kefubtn  " open-type="contact"></button>
					</view> -->
					<view style="position: relative;">
						<ui-menu-item arrow title="意见反馈" icon="cicon-creative" /> <button class="ui-btn kefubtn  "
							open-type="feedback"></button>
					</view>

					<ui-menu-item arrow title="定制主题" icon="cicon-clothes" @click.native="_to('/pages/theme/theme')"/>
				</ui-menu>
			</view>

			<!-- 版权信息 -->
			<view class="copyright">
				<!-- parse <template is="tempCopyright" :data="webSiteName:webSiteName,domain:domain"/> -->
				<block name="tempCopyright">
					<view style="margin-top: 24rpx;"> © {{webSiteName}} {{domain}} </view>
				</block>
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
	import config from '../../utils/config.js';

	var Api = require('../../utils/api.js');

	var util = require('../../utils/util.js');

	var Auth = require('../../utils/auth.js');

	var wxApi = require('../../utils/wxApi.js');

	var wxRequest = require('../../utils/wxRequest.js');

	var app = getApp();
	var webSiteName = config.getWebsiteName;
	var domain = config.getDomain;
	var wechat = config.getWecat;
	export default {
		data() {
			return {
				webSiteName: webSiteName,
				domain: domain,
				wechat: wechat,

				list: [{
					name: "浏览",
					icon: "cicon-eye",
					color: "#9DCA06",
					path: "/pages/readlog/readlog?key=1"
				}, {
					name: "评论",
					icon: "cicon-popover",
					color: "#FFB300",
					path: "/pages/readlog/readlog?key=2"
				}, {
					name: "点赞",
					icon: "cicon-favorite",
					color: "#53bcf5",
					path: "/pages/readlog/readlog?key=3"
				}, {
					name: "订阅",
					color: "#F37D7D",
					icon: "cicon-notice-active",
					path: "/pages/readlog/readlog?key=5"
				}],

				selected: 0,

				dialog: {
					hidden: false,
					title: "",
					content: ""
				}
			};
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			var that = this;
	console.log(this.wechat)
		},
		onReady: function() {
			var that = this;
		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			if (typeof this.getTabBar === 'function' && this.getTabBar()) {
				this.getTabBar().setData({
					selected: 3
				});
			}
		},
		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},
		methods: {


			tapToUrl(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				});
			},
		 
			tapCopy(e) {
			
				uni.setClipboardData({
					data: this.wechat, 
					
					success() {
						uni.showToast({
							title: '复制成功！',
							icon: 'none'
						});
					},

					 

				});
			},

			confirm: function() {
				this.setData({
					"dialog.hidden": true,
					"dialog.title": '',
					"dialog.content": ''
				});
			}
		}
	};
</script>
<style>
	/* pages/my/my.wxss */
	/* 用户信息 */

	.userinfo {
		height: 200rpx;
		position: relative;
		z-index: -1;
	}

	.scan-free {
		color: var(--ui-TC) !important;
	}

	.scan-free::after {
		border: solid var(--ui-TC) !important;
	}

	.kefubtn {
		position: absolute;
		top: 0;
		left: 0;
		min-height: 4em;
		width: 100%;
		opacity: 0;
	}

	/* 用户 */
	.info_box {
		margin-top: -120rpx;
	}

	.info_scan {
		float: right;
	}

	.info_right {
		float: right;
		min-width: 80rpx;
		text-align: center;
		display: block;

	}

	.info_right .exit {
		margin-left: 10rpx;

	}

	.info_avatar {
		margin-top: -80rpx;
		height: 100rpx;
		width: 100rpx;
		overflow: hidden;
		position: relative;
		border-radius: 50%;

	}

	.info_avatar image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: #f7f7f7;
	}


	.info_user {
		display: block;
		margin: 24rpx 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

	}

	.info_name {

		display: inline-block;
		height: 45rpx;
		line-height: 45rpx;
		margin-right: 20rpx;
		color: #333333;
		font-size: 18px;
	}

	.info_lv {

		margin-top: 8rpx;

		font-size: 12px;
		height: 12px;
		line-height: 12px;
		padding: 5rpx 8rpx;
		overflow: hidden;
	}

	.info_uid {
		display: block;
		height: 22px;
		line-height: 22px;
		font-size: 12px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

		color: #999999 !important;


		font-weight: 300;
	}

	.ui-item {
		display: block;
		padding: 24rpx 0 20rpx;
		text-align: center;
	}

	.ui-menu-item {

		padding: 0;
	}

	.ui-title {

		padding-left: 10rpx;
	}

	.cicon-service-fill {
		color: #F37D7D;
	}

	.cicon-weixin {
		font-size: 15px;
		color: #FFB300;
	}

	.cicon-service {
		color: #9DCA08;
	}

	.cicon-creative {
		color: #91B9EB;
	}

	.cicon-clothes {
		font-size: 13px;
		color: #FFB300;
	}
</style>
