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



		<ui-sys tabbar>
			<ui-navbar :back="false" isSlot>
				<view class="flex-center flex-sub">排行榜</view>
			</ui-navbar>
			<!-- <view class="tab-bar ui-BG">
				<block v-for="(item,index) in topBarItems" :key="item.id">
					<view :class="'tab-item '+(item.selected ? 'tab-Selected': '')" @tap.stop.prevent="onTapTag"
						:id="item.id">{{item.name}}</view>
				</block>
			</view> -->

			<view class="container">
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

					<view class="post-list">
						<block v-for="(item,index) in (postsList)" :key="item.id">



							<view class="post-item ui-BG ui-BG-card" :index="index" :id="item.post_id"
								@tap="redictDetail">

								<view class="post-desc">
									<view class="post-title text-lg ui-TC">
										<text>{{item.post_title}}</text>
									</view>
									<view class="post-data ui-TC-3 text-xs">

										<text>{{item.post_date}}</text>
										<text class="cicon-popover-o  "> {{item.comment_total}}</text>
										<text class="cicon-favorite-o "> {{item.like_count}}</text>
										<text class="cicon-eye-o "> {{item.pageviews}}</text>
									</view>
								</view>

								<image :src="item.post_thumbnail_image" mode="aspectFill" class="post-img"></image>
							</view>



						</block>
					</view>

				</view>

				<view class="copyright" :style="'display:'+(floatDisplay)">
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
var Api = require("../../utils/api.js");
var util = require("../../utils/util.js");

var wxApi = require("../../utils/wxApi.js");
var wxRequest = require("../../utils/wxRequest.js");
const Adapter = require("../../utils/adapter.js");
var webSiteName = config.getWebsiteName;
var domain = config.getDomain;
import config from "../../utils/config";

export default {
  data() {
    return {
      title: '文章列表',
      postsList: {},
      pagesList: {},
      categoriesList: {},
      postsShowSwiperList: {},
      isLastPage: false,
      page: 1,
      search: '',
      categories: 0,
      categoriesName: '',
      categoriesImage: "",
      showerror: "none",
      isCategoryPage: "none",
      isSearchPage: "none",
      showallDisplay: "block",
      displaySwiper: "block",
      floatDisplay: "none",
      searchKey: "",
      topBarItems: [// id name selected 选中状态
      {
        id: '2',
        name: '浏览数',
        selected: true
      }],
      tab: '2',
      webSiteName: webSiteName,
      domain: domain
    };
  },

  components: {},
  props: {},
  onShareAppMessage: function () {
    var title = "分享“" + webSiteName + "”的文章排行。";
    var path = "pages/hot/hot";
    return {
      title: title,
      path: path,
      success: function (res) {// 转发成功
      },
      fail: function (res) {// 转发失败
      }
    };
  },
  onLoad: function (options) {
    this.fetchPostsData("2");
    Adapter.setInterstitialAd("enable_hot_interstitial_ad");
  },
  methods: {
    formSubmit: function (e) {
      var url = '../list/list';

      if (e.detail.value.input != '') {
        url = url + '?search=' + e.detail.value.input;
      }

      uni.navigateTo({
        url: url
      });
    },
    // 自定义分享朋友圈
    onShareTimeline: function () {
      return {
        title: "“" + webSiteName + "”的文章排行",
        path: 'pages/hot/hot'
      };
    },
    reload: function (e) {
      var self = this;
      self.fetchPostsData(self);
    },
    onTapTag: function (e) {
      var self = this;
      var tab = e.currentTarget.id;
      var topBarItems = self.topBarItems; // 切换topBarItem 

      for (var i = 0; i < topBarItems.length; i++) {
        if (tab == topBarItems[i].id) {
          topBarItems[i].selected = true;
        } else {
          topBarItems[i].selected = false;
        }
      }

      self.setData({
        topBarItems: topBarItems,
        tab: tab
      });

      if (tab !== 0) {
        this.fetchPostsData(tab);
      } else {
        this.fetchPostsData("2");
      }
    },
    //获取文章列表数据
    fetchPostsData: function (tab) {
      var self = this;
      self.setData({
        postsList: []
      });
      uni.showLoading({
        title: '正在加载',
        mask: true
      });
      var getTopHotPostsRequest = wxRequest.getRequest(Api.getTopHotPosts(tab));
      getTopHotPostsRequest.then(response => {
        if (response.statusCode === 200) {
          self.setData({
            showallDisplay: "block",
            floatDisplay: "block",
            postsList: self.postsList.concat(response.data.map(function (item) {
              var strdate = item.post_date;

              if (item.post_thumbnail_image == null || item.post_thumbnail_image == '') {
                item.post_thumbnail_image = "/static/images/logo700.png";
              }

              item.post_date = util.cutstr(strdate, 10, 1);
              return item;
            }))
          });
        } else if (response.statusCode === 404) {
          console.log('加载数据失败,可能缺少相应的数据');
        }
      }).catch(function () {
        uni.hideLoading();
        self.setData({
          showerror: "block",
          floatDisplay: "block"
        });
      }).finally(function () {
        setTimeout(function () {
          uni.hideLoading();
        }, 1500);
      });
    },
    // 跳转至查看文章详情
    redictDetail: function (e) {
      // console.log('查看文章');
      var id = e.currentTarget.id,
          url = '../detail/detail?id=' + id;
      uni.navigateTo({
        url: url
      });
    }
  }
};
</script>
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

	.topic-common-list {
		padding: 30rpx 30rpx;
	}

	.topic-list-item {
		position: relative;
		border-bottom: 1px solid #eee;
		overflow: hidden;
		clear: both;
		border: 1px solid #ccc;

		margin-bottom: 30rpx;
		background: #fff;
	}

	.topic-list-item image.cover {
		width: 100%;
		height: 300rpx;
	}

	.topic-content-title {
		padding: 10rpx 30rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.topic-content-title text {
		font-size: 36rpx;
		line-height: 36rpx;
		font-weight: bold;
		color: #121b23;
	}

	.topic-content-brief {
		padding: 0rpx 30rpx 30rpx;
		font-size: 32rpx;
		line-height: 40rpx;
		font-weight: 400;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #989ebb;
	}

	.searchKey {
		color: #121b23;
	}

	/* tab选项卡 */

	.tab-bar {
		height: 100rpx;
		display: flex;
		margin-bottom: 24rpx;
	}

	.tab-item {
		flex: 1;
		display: inline-block;

		text-align: center;
		line-height: 100rpx;
		font-size: 30rpx;
	}

	/* 选中样式 */

	.tab-Selected {
		position: relative;
		color: var(--ui-BG-Main) !important;
		font-weight: 500;
	}

	.tab-Selected::after {
		content: '';
		height: 4rpx;
		width: 40rpx;
		background-color: var(--ui-BG-Main) !important;
		position: absolute;
		left: 50%;
		bottom: 0;
		margin-left: -20rpx;
	}
</style>
