<template>
	<block>


		<ui-sys tabbar>
			<ui-navbar :back="false" isSlot>
				<view class="flex-center flex-sub">分类</view>
			</ui-navbar>
			<view class="ui-grid ui-cols-2">
				<view class="ui-item " v-for="(item,index) in (categoriesList)" :key="item.id">



					<view class="ui-BG ui-BG-card">
					<!-- 	<view class="ui-card-sub radius" :data-subflag="item.subflag" :data-id="item.id"
							@tap.stop.prevent="postsub">
							<block v-if="item.subflag==0">
								<text class="cicon-toggle-o text-xs  "> 订阅</text>
							</block>
							<block v-if="item.subflag==1">
								<text class="cicon-toggle text-xs "> 已订阅</text>
							</block>
						</view> -->
						<view class="ui-card-bg " :data-item="item.name" :data-id="item.id" @tap="redictIndex"
							:style="'background-image:url('+(item.category_thumbnail_image)+') ;'">

						</view>
						<image mode="aspectFill" class="ui-card-image" :src="item.category_thumbnail_image"
							:data-item="item.name" :data-id="item.id" @tap="redictIndex"></image>
						<view class="ui-card-content ui-BG radius" :data-item="item.name" :data-id="item.id"
							@tap="redictIndex">
							<view> <text class="text-lg ui-TC">{{item.name}} </text>
							</view>
							<text class="ui-TC-3 text-xs ">{{item.count}}篇文章 </text>
							<text class="ui-TC-3 text-sm text-linecut-2 dec">{{item.description}} </text>
						</view>
					</view>



				</view>
			</view>
	 
			<!-- 版权信息 -->
			<view class="copyright" :style="'display:'+(floatDisplay)">
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
import config from "../../utils/config";
var Api = require("../../utils/api.js");
var wxRequest = require("../../utils/wxRequest.js");
const Adapter = require("../../utils/adapter.js");
var webSiteName = config.getWebsiteName;
var domain = config.getDomain;

export default {
  data() {
    return {
      text: "Page topic",
      categoriesList: {},
      floatDisplay: "none",
      webSiteName: webSiteName,
      domain: domain
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    uni.setNavigationBarTitle({
      title: '分类'
    });
    Adapter.setInterstitialAd("enable_topic_interstitial_ad");
    this.fetchCategoriesData();
  },
  onShow: function () {},
  onShareAppMessage: function () {
    return {
      title: '分享“' + config.getWebsiteName + '”的专题栏目.',
      path: 'pages/topic/topic',
      success: function (res) {// 转发成功
      },
      fail: function (res) {// 转发失败
      }
    };
  },
  methods: {
    //获取分类列表
    fetchCategoriesData: function () {
      var self = this;
      self.setData({
        categoriesList: []
      }); //console.log(Api.getCategories());

      var getCategoriesIdsRequest = wxRequest.getRequest(Api.getCategoriesIds());
      getCategoriesIdsRequest.then(res => {
        var ids = "";
        var openid = self.openid;

        if (!res.data.Ids == "") {
          ids = res.data.Ids;
        }

        var getCategoriesRequest = wxRequest.getRequest(Api.getCategories(ids, openid));
        getCategoriesRequest.then(response => {
          if (response.statusCode === 200) {
            self.setData({
              floatDisplay: "block",
              categoriesList: self.categoriesList.concat(response.data.map(function (item) {
                if (typeof item.category_thumbnail_image == "undefined" || item.category_thumbnail_image == "") {
                  item.category_thumbnail_image = "/static/images/website.png";
                } // item.subimg = "subscription.png";


                return item;
              }))
            });
          } else {
            console.log(response);
          }
        }) // .then(res=>{
        //     if (self.data.openid) {                
        //         setTimeout(function () {
        //             self.getSubscription();
        //         }, 500);  
        //     }
        // })
        .catch(function (response) {
          console.log(response);
        }).finally(function () {});
      });
    },
    // 自定义分享朋友圈
    onShareTimeline: function () {
      return {
        title: '“' + config.getWebsiteName + '”的专题栏目',
        path: 'pages/topic/topic'
      };
    },
    reloadData: function (id, subflag, subimg) {
      var self = this;
      var newCategoriesList = [];
      var categoriesList = self.categoriesList;

      for (var i = 0; i < categoriesList.length; i++) {
        if (categoriesList[i].id == id) {
          categoriesList[i].subflag = subflag;
          categoriesList[i].subimg = subimg;
        }

        newCategoriesList.push(categoriesList[i]);
      }

      if (newCategoriesList.length > 0) {
        self.setData({
          categoriesList: newCategoriesList
        });
      }
    },
    //跳转至某分类下的文章列表
    redictIndex: function (e) {
      //console.log('查看某类别下的文章');  
      var id = e.currentTarget.dataset.id;
      var name = e.currentTarget.dataset.item;
      var url = '../list/list?categoryID=' + id;
      uni.navigateTo({
        url: url
      });
    },
    confirm: function () {
      this.setData({
        'dialog.hidden': true,
        'dialog.title': '',
        'dialog.content': ''
      });
    }
  }
};
</script>
<style>
	.ui-grid {
		margin: 12rpx;
	}

	.ui-BG-card {
		margin: 12rpx;
		padding: 0;
		overflow: hidden;
	}

	.ui-item {

		text-align: center;
		position: relative;
	}


	.ui-card {
		margin: 12rpx !important;
	}

	.ui-card-bg {
		height: 160rpx;
		position: relative;
		background-size: cover;
		background-position: center;
		overflow: hidden;
		filter: saturate(160%) blur(22px);

	}

	.ui-card-image {
		position: absolute;
		width: 120rpx;
		height: 120rpx;
		display: inline-block;
		top: 100rpx;
		left: 121.5rpx;
		background-color: #fff;
		border-radius: 100%;
		border: 1px solid #fff;
	}

	.ui-card-sub {
		position: absolute;
		right: 10px;
		top: 10px;
		border: solid 1px rgba(255, 255, 255, .5);
		z-index: 1;
		color: #fff;
		padding: 2px 6px;
		background-color: rgba(0, 0, 0, 0.1);

	}

	.ui-card-sub:hover {
		background-color: rgba(0, 0, 0, 0.4);
	}

	.ui-card-content {
		padding: 60rpx 12rpx 24rpx;
		overflow: hidden;
		background-color: #fff;
		z-index: 9;
		height: 236rpx;
	}

	.ui-card-content .dec {
		margin-top: 10rpx;

	}
</style>
