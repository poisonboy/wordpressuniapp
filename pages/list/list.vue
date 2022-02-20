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



		<ui-sys :title="(categoriesName||searchKey)+' '">
			<view class="topic-common-list" :style="'display:'+(isCategoryPage)">
				<view class="topic-list-item">
					<image :src="categoriesImage" class="cover" mode="aspectFill">
					</image>
					<view class="topic-content-brief">
						<text>{{categoriesList.description}}</text>
					</view>
				</view>
			</view>


			<view class="topic-common-list" :style="'display:'+(isSearchPage)">
				<view class="topic-list-item">
					<image src="/static/images/website-search.png" class="cover" mode="aspectFill"></image>
					<view class="topic-content-brief">
						<view class="topic-content-title">
							<text>搜索关键字：</text>
							<text class="searchKey">{{searchKey}}</text>
						</view>
						<text class="search-tips">* 本搜索是全文搜索</text>
					</view>
				</view>
			</view>

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
					<!-- parse <template is="tempCommonList" :data="postsList,listAdsuccess"/> -->
				

						<view class="post-list">
							<block v-for="(item,index) in (postsList)" :key="index">

	<!-- #ifdef MP -->

								<view class="list-item-ad  " :index="index"
									v-if="index%item.listAdEvery ==0  && index!=0 && item.listAd =='1' && item.listAdId !=''  && listAdsuccess">
									<block v-if="(index/item.listAdEvery)%2==0">
										<ad :unit-id="item.videoAdId" ad-type="video" ad-theme="white"
											@error="adbinderror"></ad>
									</block>
									<block v-else>
										<ad :unit-id="item.listAdId" ad-intervals="30" @error="adbinderror"></ad>
									</block>
								</view>

<!-- #endif -->




								<view class="post-item ui-BG ui-BG-card" :index="index" :id="item.id"
									@tap="redictDetail">

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
			
					<view :style="'display:'+(isLoading?'block':'none')">
						<!-- parse <template is="tempLoading"/> -->
						<block name="tempLoading">
							<view class="sk-three-bounce">
								<view class="sk-child sk-bounce1 ui-BG-Main-2"></view>
								<view class="sk-child sk-bounce2 ui-BG-Main-2"></view>
								<view class="sk-child sk-bounce3 ui-BG-Main-2"></view>
							</view>
						</block>
					</view>

					<view class="loadingmore" :style="'display:'+(floatDisplay)">
						<view class="no-more" v-if="(isLastPage)">- 无更多文章 -</view>
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
const Adapter = require("../../utils/adapter.js");
var wxRequest = require("../../utils/wxRequest.js");
import config from "../../utils/config";
var pageCount = config.getPageCount;
var webSiteName = config.getWebsiteName;
var domain = config.getDomain;

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
      webSiteName: webSiteName,
      domain: domain,
      listAdsuccess: true,
      isLoading: false
    };
  },

  components: {},
  props: {},
  onShareAppMessage: function () {
    var title = "分享“" + webSiteName + "”";
    var path = "";

    if (this.categories && this.categories != 0) {
      title += "的专题：" + this.categoriesList.name;
      path = 'pages/list/list?categoryID=' + this.categoriesList.id;
    } else {
      title += "的搜索内容：" + this.searchKey;
      path = 'pages/list/list?search=' + this.searchKey;
    }

    return {
      title: title,
      path: path,
      success: function (res) {// 转发成功
      },
      fail: function (res) {// 转发失败
      }
    };
  },
  onReachBottom: function () {
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
  onLoad: function (options) {
    var self = this; // 设置插屏广告

    Adapter.setInterstitialAd("enable_list_interstitial_ad");

    if (options.categoryID && options.categoryID != 0) {
      self.setData({
        categories: options.categoryID,
        isCategoryPage: "block"
      });
      self.fetchCategoriesData(options.categoryID);
    }

    if (options.search && options.search != '') {
      uni.setNavigationBarTitle({
        title: "搜索"
      });
      self.setData({
        search: options.search,
        isSearchPage: "block",
        searchKey: options.search
      });
      this.fetchPostsData(self);
    }
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
    onShareTimeline: function () {
      var path = "";
      var query = {};
      var title = "";

      if (this.categories && this.categories != 0) {
        title += this.categoriesList.name + "-" + this.categoriesList.description;
        query = {
          categoryID: this.categoriesList.id
        };
      } else {
        title += webSiteName + "的搜索内容：" + this.searchKey;
        query = {
          search: this.searchKey
        };
      }

      return {
        title: title,
        path: 'pages/list/list',
        query: query,
        imageUrl: this.categoriesImage
      };
    },
    reload: function (e) {
      var self = this;

      if (self.categories && self.categories != 0) {
        self.setData({
          isCategoryPage: "block",
          showallDisplay: "none",
          showerror: "none"
        });
        self.fetchCategoriesData(self.categories);
      }

      if (self.search && self.search != '') {
        self.setData({
          isSearchPage: "block",
          showallDisplay: "none",
          showerror: "none",
          searchKey: self.search
        });
      }

      self.fetchPostsData(self);
    },
    //加载分页
    loadMore: function (e) {
      var self = this;

      if (!self.isLastPage) {
        self.setData({
          page: self.page + 1
        });
        console.log('当前页' + self.page);
        this.fetchPostsData(self);
      } else {
        uni.showToast({
          title: '没有更多内容',
          mask: false,
          duration: 1000
        });
      }
    },
    //获取文章列表数据
    fetchPostsData: function (data) {
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
      var getPostsRequest = wxRequest.getRequest(Api.getPosts(data));
      getPostsRequest.then(response => {
        if (response.statusCode === 200) {
          if (response.data.length < pageCount) {
            self.setData({
              isLastPage: true,
              isLoading: false
            });
          }

          ;
          self.setData({
            floatDisplay: "block",
            showallDisplay: "block",
            postsList: self.postsList.concat(response.data.map(function (item) {
              var strdate = item.date;

              if (item.category_name != null) {
                item.categoryImage = "/static/images/topic.png";
              } else {
                item.categoryImage = "";
              }

              if (item.post_medium_image == null || item.post_medium_image == '') {
                item.post_medium_image = "/static/images/logo700.png";
              }

              item.date = util.cutstr(strdate, 10, 1);
              return item;
            }))
          }); // setTimeout(function () {
          //     wx.hideLoading();
          // }, 1500);
        } else {
          if (response.data.code == "rest_post_invalid_page_number") {
            self.setData({
              isLastPage: true,
              isLoading: false
            });
          } else {
            uni.showToast({
              title: response.data.message,
              duration: 1500
            });
          }
        }
      }).catch(function () {
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
      }).finally(function () {
        uni.hideLoading();
        self.setData({
          isLoading: false
        });
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
    },
    //获取分类列表
    fetchCategoriesData: function (id) {
      var self = this;
      self.setData({
        categoriesList: []
      });
      var getCategoryRequest = wxRequest.getRequest(Api.getCategoryByID(id));
      getCategoryRequest.then(response => {
        var catImage = "";

        if (typeof response.data.category_thumbnail_image == "undefined" || response.data.category_thumbnail_image == "") {
          catImage = "/static/images/website.png";
        } else {
          catImage = response.data.category_thumbnail_image;
        }

        self.setData({
          categoriesList: response.data,
          categoriesImage: catImage,
          categoriesName: response.data.name
        });
        uni.setNavigationBarTitle({
          title: response.data.name,
          success: function (res) {// success
          }
        });
        self.fetchPostsData(self);
      });
    },
    adbinderror: function (e) {
      var self = this;
      console.log(e.detail.errCode);
      console.log(e.detail.errMsg);

      if (e.detail.errCode) {
        self.setData({
          listAdsuccess: false
        });
      }
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

	.topic-list-item {
		height: 240rpx;
		overflow: hidden;
		position: relative;
		background-color: rgba(0, 0, 0, 0.3);

	}

	.cover {
		width: 100%;
		height: 240rpx;
		position: absolute;
		filter: saturate(180%) blur(35px);
	}

	.topic-content-brief {
		width: 80%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 2;
		text-align: center;
	}

	.topic-content-brief text {
		font-size: 16px;
		line-height: 1.6;
		color: #fff;
	}

	/* 搜索列表 */

	.topic-content-title text {
		font-size: 18px;
		font-weight: 500;
		line-height: 1.6;
		color: #fff;
	}

	.searchKey {
		color: #121b23;
	}

	.search-tips {
		font-size: 10px;
	}
</style>
