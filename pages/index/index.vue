<template>

	<!--
 * 微慕小程序开源版
 * author: jianbo
 * organization: 微慕  www.minapper.com
 * github:    https://github.com/iamxjb/winxin-app-watch-life.net
 * 技术支持微信号：iamxjb
 * 开源协议：MIT
 * Copyright (c) 2017  微慕 https://www.minapper.com All rights reserved.-->





	<ui-sys tabbar>

		<ui-navbar :back="false" bg="ui-BG-Main" op isSlot>
			<view class="flex-bar p-3">
				<image src="/static/images/logo.png" mode="aspectFill" style="width: 200rpx;height: 56rpx;" />
			</view>
		</ui-navbar>
		<!-- 首次进入引导添加到“我的小程序” -->
		<view class="addMyMiniapp" v-if="isFirst" @tap.stop.prevent="shutAddMyMiniapp">
			<view>点击加入我的小程序 ↑</view>
			<text>了解"{{webSiteName}}"最新文章</text>
		</view>


		<view class="index-top  ">

			<view class="indexbg ui-BG-Main" :style="'margin-top: -'+(sys_navBar+sys_statusBar+sys_capsule.top)+'rpx;'">
			</view>

			<view class="ui-BG-card ui-BG ">
				<!-- 搜索 -->
				<form @submit.stop.prevent="formSubmit" @reset.stop.prevent="formReset" id="search-form">
					<view class="ui-search-bar  ">
						<!-- <view class="ui-search-action">
            <ui-avatar slot="left" ui="round" src="/images/gravatar.png" />
          </view> -->
						<view class="ui-search-form   round">
							<text class="ui-search-icon _icon-search" />
							<input class="ui-search-input ui-search-text-left" value="" id="search-input" name="input"
								confirm-type="search" placeholder="搜索你感兴趣的内容..." @confirm="formSubmit" />

						</view>
						<view class="ui-search-action">
							<button slot="right" class="ui-btn ui-BG-Main round sm" form-type="submit">搜索</button>
						</view>
					</view>
				</form>


				<!-- 轮播图 -->
				<view class=" ">
					<ui-swiper :info="swipe_nav" v-if="swipe_nav.length > 0" dotStyle="long" dotCur="ui-BG-Main"
						height="260rpx" imgHeight="260rpx" imgName="image" swiperCss="radius"
						@uiTap="redictAppDetail" />
				</view>


			</view>


		</view>


		<!-- 图标导航 -->
		<view class="index-sticky ui-BG-card ui-BG" v-if="selected_nav.length > 0">
			<ui-title title="精选栏目" desc="热点栏目推荐" depth="3">
				<text slot="icon" class="ui-TC-Main cicon-slack-square" />
			</ui-title>
			<view :class="'ui-grid '+(selected_nav.length<5?'ui-cols-4':'ui-cols-5')">

				<block v-for="(item,index) in (selected_nav)" :key="item.id">



					<view class="ui-item  " v-if="item.enable=='yes'" @tap.stop.prevent="redictAppDetail" :id="item.id"
						:data-type="item.type" :data-url="item.url" :data-appid="item.appid" :data-path="item.path">
						<image class="round" mode="aspectFill" :src="item.image"></image>
						<text class="ui-TC text-df">{{item.title}}</text>
					</view>



				</block>
			</view>

		</view>

		<!-- 推荐文章 -->
		<view class=" ui-BG-card ui-BG" v-if="StickyList.length > 0">
			<ui-title title="推荐文章" desc="汇聚精彩文章" depth="3">
				<text slot="icon" class="ui-TC-Main cicon-whatshot" />
			</ui-title>


			<swiper class="sticky-list" :autoplay="true" interval="5000" duration="400" :circular="true"
				display-multiple-items="2" :vertical="true">
				<swiper-item class="sticky-list-item" :id="item.id" @tap="redictDetail"
					v-for="(item,index) in StickyList" :key="item.id">



					<view class="sticky-list-item-title ui-TC text-df">
						<text class="dot ui-BG-Main"></text> {{item.title.rendered}}
					</view>



				</swiper-item>
			</swiper>

		</view>


		<!-- 文章列表 -->
		<view class="container ">
			<!-- 列表template模板 -->
			<!-- parse <template is="tempCommonList" :data="postsList:postsList,listAdsuccess:listAdsuccess"/> -->
		

				<view class="post-list">
					<block v-for="(item,index) in postsList" :key="index">
 
						<view class="post-item ui-BG ui-BG-card" :index="index" :id="item.id" @tap="redictDetail">

							<view class="post-desc">
								<view class="post-title text-lg ui-TC">
									<text>{{item.title.rendered}}</text>
								</view>
								<view class="post-data ui-TC-3 text-xs">

									<text>{{item.date}}</text>
									<text class="cicon-popover-o  "> {{item.total_comments}}</text>
									<text class="cicon-favorite-o "> {{item.like_count}}</text>
									<text class="cicon-eye-o "> {{item.pageviews}}</text>
								</view>
							</view>
							<image :src="item.post_medium_image" mode="aspectFill" class="post-img"
								v-if="item.post_medium_image"></image>
						</view>



					</block>
				</view>
		
			<view :style="'display:'+(isLoading?'block':'none')+';margin-top: 48rpx;'">
				<!-- parse <template is="tempLoading"/> -->
				<block name="tempLoading">
					<view class="sk-three-bounce">
						<view class="sk-child sk-bounce1 ui-BG-Main-2"></view>
						<view class="sk-child sk-bounce2 ui-BG-Main-2"></view>
						<view class="sk-child sk-bounce3 ui-BG-Main-2"></view>
					</view>
				</block>
			</view>
			<!-- 无更多文章提示 -->
			<view class="loadingmore" :style="'display:'+(floatDisplay)">

				<view class="no-more" v-if="(isLastPage)">- 无更多文章 -</view>
			</view>
			<!-- 版权信息template模板 -->
			<view class="copyright">
				<!-- parse <template is="tempCopyright" :data="webSiteName:webSiteName,domain:domain"/> -->
				<block name="tempCopyright">
					<view style="margin-top: 24rpx;"> © {{webSiteName}} {{domain}} </view>
				</block>
			</view>
		</view>


		<!-- 无法访问网络 -->
		<view class="showerror" :style="'display:'+(showerror)">
			<text class="cicon-wifi-off text-xsl"></text>
			<view class="errortext">
				暂时无法访问网络，下拉重试...
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
	 * 
	 *  *Copyright (c) 2017 https://www.minapper.com All rights reserved.
	 */
	var Api = require("../../utils/api.js");
	var util = require("../../utils/util.js");

	var wxApi = require("../../utils/wxApi.js");
	var wxRequest = require("../../utils/wxRequest.js");
	import config from "../../utils/config";
	const Adapter = require("../../utils/adapter.js");
	var pageCount = config.getPageCount;
	var webSiteName = config.getWebsiteName;
	var domain = config.getDomain;

	export default {
		data() {
			return {
				postsList: [],
				StickyList: [],
				isLastPage: false,
				page: 1,
				search: '',
				categories: 0,
				showerror: "none",
				showCategoryName: "",
				categoryName: "",
				showallDisplay: "block",
				displayHeader: "none",
				displaySwiper: "none",
				floatDisplay: "none",
				displayfirstSwiper: "none",
				listAdsuccess: true,
				webSiteName: webSiteName,
				domain: domain,
				isFirst: false,
				// 是否第一次打开,
				isLoading: false,
				swipe_nav: [],
				selected_nav: []
			};
		},

		components: {},
		props: {},
		onShareAppMessage: function() {
			return {
				title: '“' + webSiteName + '”小程序,基于微慕WordPress版小程序构建',
				path: 'pages/index/index',
				success: function(res) { // 转发成功
				},
				fail: function(res) { // 转发失败
				}
			};
		},
		onPullDownRefresh: function() {
			var self = this;
			self.setData({
				showerror: "none",
				showallDisplay: "block",
				displaySwiper: "none",
				floatDisplay: "none",
				isLastPage: false,
				page: 1,
				postsShowSwiperList: []
			});
			this.getHomeconfig();
			this.fetchPostsData(self);
		},
		onReachBottom: function() {
			var self = this;

			if (!self.isLastPage) {
				self.setData({
					page: self.page + 1
				});
				console.log('当前页' + self.page);
				this.fetchPostsData(self);
			} else {
				console.log('最后一页');
			}
		},
		onLoad: function(options) {
			var self = this; // 设置页面标题：文章分类

			uni.setNavigationBarTitle({
				title: webSiteName
			});
		
			self.fetchPostsData(self); // 判断用户是不是第一次打开，弹出添加到我的小程序提示
			self.fetchstickyPostsData(self);
			var isFirstStorage = uni.getStorageSync('isFirst'); // console.log(isFirstStorage);

			if (!isFirstStorage) {
				self.setData({
					isFirst: true
				});
				uni.setStorageSync('isFirst', 'no'); // console.log(wx.getStorageSync('isFirst'));

				setTimeout(function() {
					self.setData({
						isFirst: false
					});
				}, 5000);
			}

			this.getHomeconfig();
		},
		onShow: function(options) {
			uni.setStorageSync('openLinkCount', 0);
			var nowDate = new Date();
			nowDate = nowDate.getFullYear() + "-" + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
			nowDate = new Date(nowDate).getTime();


		},
		methods: {
			formSubmit: function(e) {
				var url = '../list/list';
				var key = '';

				if (e.currentTarget.id == "search-input") {
					key = e.detail.value;
				} else {
					key = e.detail.value.input;
				}

				if (key != '') {
					url = url + '?search=' + key;
					uni.navigateTo({
						url: url
					});
				} else {
					uni.showModal({
						title: '提示',
						content: '请输入内容',
						showCancel: false
					});
				}
			},
			// 自定义分享朋友圈
			onShareTimeline: function() {
				return {
					title: '“' + webSiteName + '”小程序,基于微慕WordPress版小程序构建',
					path: 'pages/index/index'
				};
			},

			getHomeconfig() {
				//获取扩展设置
				var self = this;
				var getHomeconfig = wxRequest.getRequest(Api.get_homeconfig());
				getHomeconfig.then(res => {
					// console.log(res.data);
					let expand = res.data.expand;
					let swipe_nav = expand.swipe_nav;
					let selected_nav = expand.selected_nav;
					let _d = res.data.downloadfileDomain;
					let _b = res.data.businessDomain;
					let zanImageurl = res.data.zanImageurl;
					let logoImageurl = res.data.logoImageurl;
					let downloadfileDomain = _d.length ? _d.split(',') : [];
					let businessDomain = _b.length ? _b.split(',') : [];
					self.setData({
						swipe_nav: swipe_nav,
						selected_nav,
						selected_nav
					});
					uni.setStorageSync('downloadfileDomain', downloadfileDomain);
					uni.setStorageSync('businessDomain', businessDomain);
					uni.setStorageSync('zanImageurl', zanImageurl);
					uni.setStorageSync('logoImageurl', logoImageurl);
				});
			},

			//获取文章列表数据
			fetchPostsData: function(data) {
				var self = this;
				if (!data) data = {};
				if (!data.page) data.page = 1;
				if (!data.categories) data.categories = 0;
				if (!data.search) data.search = '';

				if (data.page === 1) {
					self.setData({
						postsList: []
					});
				}

				;
				self.setData({
					isLoading: true
				});
				var getCategoriesRequest = wxRequest.getRequest(Api.getCategoriesIds());
				getCategoriesRequest.then(res => {
					if (!res.data.Ids == "") {
						data.categories = res.data.Ids;
						self.setData({
							categories: res.data.Ids
						});
					}

					var getPostsRequest = wxRequest.getRequest(Api.getPosts(data));
					getPostsRequest.then(response => {
						if (response.statusCode === 200) {
							if (response.data.length) {
								if (response.data.length < pageCount) {
									self.setData({
										isLastPage: true,
										isLoading: false
									});
								}

								self.setData({
									floatDisplay: "block",
									postsList: self.postsList.concat(response
										.data.map(function(item) {
											var strdate = item.date;

											if (item.category_name !=
												null) {
												item.categoryImage =
													"/static/images/category.png";
											} else {
												item.categoryImage = "";
											}

											if (item
												.post_medium_image ==
												null || item
												.post_medium_image == ''
											) {
												item.post_medium_image =
													"/static/images/logo700.png";
											}

											item.date = util.cutstr(
												strdate, 10, 1);
											return item;
										}))
								});
							} else {
								if (response.data.code ==
									"rest_post_invalid_page_number") {
									self.setData({
										isLastPage: true,
										isLoading: false
									});
									uni.showToast({
										title: '没有更多内容',
										mask: false,
										duration: 1500
									});
								} else {
									uni.showToast({
										title: response.data.message,
										duration: 1500
									});
								}
							}
						}
					}).catch(function(response) {
						if (data.page == 1) {
							self.setData({
								showerror: "block",
								floatDisplay: "none"
							});
						} else {
							uni.showModal({
								title: '加载失败',
								content: '加载数据失败,请重试.',
								showCancel: false
							});
							self.setData({
								page: data.page - 1
							});
						}
					}).finally(function(response) {
						uni.hideLoading();
						self.setData({
							isLoading: false
						});
						uni.stopPullDownRefresh();
					});
				});
			},
			//获取置顶文章列表数据
			fetchstickyPostsData: function(data) {
				var self = this;
				if (!data) data = {};
				if (!data.categories) data.categories = 0;
				if (!data.search) data.search = '';
				self.setData({
					isLoading: true
				});
				var getCategoriesRequest = wxRequest.getRequest(Api.getCategoriesIds());
				getCategoriesRequest.then(res => {
					if (!res.data.Ids == "") {
						data.categories = res.data.Ids;
						self.setData({
							categories: res.data.Ids
						});
					}

					var getStickyPostsRequest = wxRequest.getRequest(Api.getStickyPosts(data));
					getStickyPostsRequest.then(response => {
						if (response.statusCode === 200) {
							if (response.data.length) {
								// console.log(response.data)
								self.setData({
									floatDisplay: "block",
									StickyList: response.data
								});
							} else {

							}
						}
					}).catch(function(response) {

					}).finally(function(response) {
						uni.hideLoading();
						self.setData({
							isLoading: false
						});
						uni.stopPullDownRefresh();
					});
				});
			},
			//加载分页
			loadMore: function(e) {
				var self = this;

				if (!self.isLastPage) {
					self.setData({
						page: self.page + 1
					}); //console.log('当前页' + self.data.page);

					this.fetchPostsData(self);
				} else {
					uni.showToast({
						title: '没有更多内容',
						mask: false,
						duration: 1000
					});
				}
			},
			// 跳转至查看文章详情
			redictDetail: function(e) {
				// console.log('查看文章');
				var id = e.currentTarget.id,
					url = '../detail/detail?id=' + id;
				uni.navigateTo({
					url: url
				});
			},
			//首页图标跳转
			onNavRedirect: function(e) {
				var redicttype = e.currentTarget.dataset.redicttype;
				var url = e.currentTarget.dataset.url == null ? '' : e.currentTarget.dataset.url;
				var appid = e.currentTarget.dataset.appid == null ? '' : e.currentTarget.dataset.appid;
				var extraData = e.currentTarget.dataset.extraData == null ? '' : e.currentTarget.dataset
					.extraData;

				if (redicttype == 'apppage') {
					//跳转到小程序内部页面         
					uni.navigateTo({
						url: url
					});
				} else if (redicttype == 'webpage') //跳转到web-view内嵌的页面
				{
					url = '../webpage/webpage?url=' + url;
					uni.navigateTo({
						url: url
					});
				} else if (redicttype == 'miniapp') //跳转到其他app
				{
					var n = this;
					//#ifdef APP-PLUS  
					console.log(n.sweixin);
					n.sweixin ? n.sweixin.launchMiniProgram({
						id: 'gh_17dae6107b00'
					}) : plus.nativeUI.alert('当前环境不支持微信操作!');

					//#endif  

				}
			},
			// 跳转至查看小程序列表页面或文章详情页
			redictAppDetail: function(e) {
				let {
					type,
					appid,
					url,
					path
				} = e.currentTarget.dataset;

				if (type === 'apppage') {
					// 小程序页面         
					uni.navigateTo({
						url: path
					});
				}

				if (type === 'webpage') {
					// web-view页面
					url = '../webpage/webpage?url=' + url;
					uni.navigateTo({
						url: url
					});
				}

				if (type === 'miniapp') {
					// 其他小程序
					url = '../webpage/webpage?url=' + url;
					uni.navigateTo({
						url: url
					});
				}
			},
			//返回首页
			redictHome: function(e) {
				//console.log('查看某类别下的文章');  
				var id = e.currentTarget.dataset.id,
					url = '/pages/index/index';
				uni.switchTab({
					url: url
				});
			},
			 
		}
	};
</script>
<style>
	/*
 * 微慕小程序开源版
 * author: jianbo
 * organization: 微慕  www.minapper.com
 * github:    https://github.com/iamxjb/winxin-app-watch-life.net
 * 技术支持微信号：iamxjb
 * 开源协议：MIT
 * Copyright (c) 2017  微慕 https://www.minapper.com All rights reserved.
 */
	.index-top {
		position: relative;
	}

	.indexbg {
		position: absolute;
		top: -30rpx;
		width: 750rpx;
		height: 500rpx;
		z-index: -1;

	}

	/* 轮播图 */


	/* 置顶文章 */


	.sticky-list {
		height: 130rpx;
		overflow: hidden;
	}








	.sticky-list-item-title {
		display: block;

		overflow: hidden;
	}


	/* 图标导航 */


	.ui-item {
		display: block;
		padding: 24rpx 0 20rpx;
		text-align: center;
	}

	.ui-item image {
		width: 80rpx;
		height: 80rpx;
		margin: auto;
		margin-bottom: 20rpx;
		display: block;
	}

	.ui-item text {

		color: #333;
		font-weight: 300;
	}

	/* 搜索 */
	.ui-search-bar {
		position: relative;
		display: flex;
		align-items: center;
		height: 100rpx;
		margin-bottom: 15rpx;
	}

	.ui-search-bar .ui-search-action+.ui-search-form {
		margin-left: 20rpx;
	}

	.ui-search-bar .ui-search-form {
		position: relative;
		flex: 1;
		display: flex;
		align-items: center;
		background-color: #f5f5f5;
		color: #333;
		height: 68rpx;
		font-size: 24rpx;


	}

	.ui-search-icon,
	.ui-search-close {
		height: 68rpx;
		line-height: 68rpx;
	}

	.ui-search-icon {
		margin-left: 25rpx;
		margin-right: 20rpx;
	}

	.ui-search-input {
		position: relative;
		flex: 1;
		height: 68rpx;


	}

	.ui-search-text-left {
		text-align: left;
	}

	.ui-search-text-center {
		text-align: center;
	}

	.ui-search-text-right {
		text-align: right;
	}

	.input-placeholder {
		color: inherit;
		opacity: 0.5;
	}

	.ui-search-close {
		margin-left: 20rpx;
		margin-right: 25rpx;
	}

	.ui-search-bar .ui-search-form+.ui-search-action {
		margin-left: 20rpx;
	}




	/*模块标题样式 */
	.common-subtitle {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 130rpx;
		padding: 0 24rpx;
		background: #fff;
	}

	.common-subtitle-left {
		font-size: 34rpx;
		color: #333;
		font-weight: 500;
	}

	.common-subtitle-right {
		font-size: 26rpx;
		font-weight: 400;
		color: #959595;
		margin-right: 6rpx;
	}

	/* 精选栏目菜单导航 */


	.selected-nav-list {
		display: flex;
		padding: 0 24rpx 40rpx;

		justify-content: space-between;
	}

	.selected-nav-item {
		margin-right: 16rpx;
		text-align: center;
	}

	.selected-nav-item image {
		width: 156rpx;
		height: 156rpx;
		background: #f5f7f7;
	}

	.selected-nav-item text {
		line-height: 26rpx;
		font-size: 26rpx;
		color: #333;
	}

	.list-item-ad {
		margin: 24rpx;

		overflow: hidden;
		border-radius: var(--radius);
	}

	/* 引导添加到我的小程序 */
	.addMyMiniapp {
		color: #333;
		line-height: 1.2;
		background: #fff;
		padding: 24rpx 24rpx;
		position: fixed;
		top: 20rpx;
		right: 24rpx;
		z-index: 999;
		box-shadow: 0 16rpx 30rpx -12rpx rgba(88, 88, 88, 0.2);
	}

	.addMyMiniapp>view {
		font-size: 24rpx;
		font-weight: 500;
	}

	.addMyMiniapp>text {
		font-size: 20rpx;
		font-weight: 200;
	}

	.addMyMiniapp::before {
		content: '';
		width: 20rpx;
		height: 20rpx;
		background: #fff;
		transform: rotate(45deg);
		position: absolute;
		right: 118rpx;
		top: -10rpx;
	}
</style>
