<template>
<block>
<!--
/*
 * 
 * 微慕小程序
 * author: jianbo
 * organization:  微慕 www.minapper.com 
 * 技术支持微信号：Jianbo
 * Copyright (c) 2018 https://www.minapper.com All rights reserved.
 *
 */-->


<ui-sys> 
<view :style="'display:'+(isArticlesList?'block':'none')">
 <form @submit.stop.prevent="formSubmit" @reset.stop.prevent="formReset" id="search-form">
      <view class="search-box">
        <input value="" id="search-input" name="input" confirm-type="search" class="search-input" placeholder="守望轩" @confirm="formSubmit"/>
        <button class="search-button" form-type="submit" size="mini" :plain="true">
          <icon type="search" color="#959595" size="16"/>
        </button>
      </view>
    </form> 
  <view class="list-container">
    <!-- <template is="tempCommonList" />
    <view style='display:{{isLoading?"block":"none"}}'>
      <template is="threepoint" />
    </view> -->
    <!-- <view class="no-more" style="display:{{isLastPage?'block':'none'}}">- 到底啦 -</view> -->
    <view class="copyright">
       <!-- parse <template is="tempCopyright" :data="webSiteName:webSiteName,domain:domain"/> --><block name="tempCopyright">
<view style="margin-top: 24rpx;">  © {{webSiteName}} {{domain}} </view>
</block>
    </view>
  </view>
</view></ui-sys>
</block>
</template>

<script>
/*
 * 
 * 微慕小程序
 * author: jianbo
 * organization:  微慕 www.minapper.com 
 * 技术支持微信号：Jianbo
 * Copyright (c) 2018 https://www.minapper.com All rights reserved.
 */
var Api = require('../../utils/api.js');

var util = require('../../utils/util.js');

var wxApi = require('../../utils/wxApi.js');

var wxRequest = require('../../utils/wxRequest.js');

import config from '../../utils/config.js';
var pageCount = config.getPageCount;
var webSiteName = config.getWebsiteName;
var domain = config.getDomain;
const app = getApp();
export default {data() {
            return {
              isArticlesList: true,
              listStyle: config.getListStyle,
              shareTitle: config.getWebsiteName,
              pageTitle: '搜索',
              articlesList: [],
              postype: "post",
              webSiteName: webSiteName,
              domain: domain,
              isPull: false,
              isError: false,
              page: ""
            };
        },onShow: function () {
  this.setData({
    listStyle: uni.getStorageSync('listStyle')
  });
}, 
/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
  var postype = 'post';

  if (options.postype) {
    postype = options.postype;
  }

  this.setData({
    postype: postype
  });
}, 
onReady: function () {
  uni.setNavigationBarTitle({
    title: this.data.pageTitle
  });
}, 
onPullDownRefresh: function () {
  this.setData({
    isPull: true,
    isError: false,
    isArticlesList: false,
    articlesList: []
  });
  let args = {};
  args.page = 1;
  args.pageCount = pageCount;

  if (this.data.isSearch) {
    args.isSearch = true;
    args.isCategory = false;
    args.isTag = false;
    args.searchKey = this.data.searchKey;
  }

  if (this.data.isCategory) {
    args.isSearch = false;
    args.isCategory = true;
    args.isTag = false;
    args.categoryIds = this.data.categoryIds;
  }

  if (this.data.isTag) {
    args.isSearch = false;
    args.isCategory = false;
    args.isTag = true;
    args.tag = this.data.tag;
  }

  Adapter.loadArticles(args, this, API, true);
}, 
onReachBottom: function () {
  let args = {};
  args.pageCount = pageCount;

  if (!this.data.isLastPage) {
    args.page = this.data.page + 1;

    if (this.data.isSearch) {
      args.isSearch = true;
      args.isCategory = false;
      args.isTag = false;
      args.searchKey = this.data.searchKey;
    }

    if (this.data.isCategory) {
      args.isSearch = false;
      args.isCategory = true;
      args.isTag = false;
      args.categoryIds = this.data.categoryIds;
    }

    if (this.data.isTag) {
      args.isSearch = false;
      args.isCategory = false;
      args.isTag = true;
      args.tag = this.data.tag;
    }

    this.setData({
      page: args.page
    });
    Adapter.loadArticles(args, this, API);
  } else {
    console.log("最后一页了"); // wx.showToast({
    //     title: '没有更多内容',
    //     mask: false,
    //     duration: 1000
    // });
  }
}, 
methods: {
  formSubmit: function (e) {
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

  //   formSubmit: function (e) {
  //         var url = '../list/list'
  //         var key = '';
  //         if (e.currentTarget.id == "search-input") {
  //             key = e.detail.value;
  //         }
  //         else {
  //             key = e.detail.value.input;
  //         }
  //         var postype = this.data.postype;
  //         var args={};
  //         if (key != '') {
  //         if(postype=="topic")
  //         {
  //             var url = '../sociallist/sociallist?searchKey='+key;
  //             wx.navigateTo({
  //               url: url
  //             })
  //         }else{
  //             args.isSearch=true;
  //             args.page=1;
  //             args.pageCount=pageCount;
  //             args.isCategory=false;
  //             args.searchKey = key;            
  //             this.setData({
  //                 searchKey: key,
  //                 isSearch:true,
  //                 isCategory:false,
  //                 isTag:false,
  //                 articlesList:[]
  //             }); 
  //             Adapter.loadArticles(args, this, API); 
  //         }
  //         }
  //         else {
  //             wx.showModal({
  //                 title: '提示',
  //                 content: '请输入搜索内容',
  //                 showCancel: false,
  //             });
  //         }
  //     },
  // 跳转至查看文章详情
  redictDetail: function (e) {
    Adapter.redictDetail(e, "post");
  },

  formReset() {
    console.log("占位：函数 formReset 未声明");
  }
}};
</script>
<style >
/*
 * 
 * 微慕小程序
 * author: jianbo
 * organization:  微慕 www.minapper.com 
 * 技术支持微信号：Jianbo
 * Copyright (c) 2018 https://www.minapper.com All rights reserved.
 */



.list-container {
  height: 100%;
  margin-top:20rpx;
}

/* 搜索 */
.search-box {
  display: flex;
  flex-direction: row;
  background-color: #f5f7f7;
  padding: 24rpx;
  overflow: hidden;
}

.search-box image {
  width: 50rpx;
  height: 50rpx;
  margin-left: 20rpx;
  vertical-align: middle;
}

.search-button {
  width: 20%;
  border-left: 0 !important;
  border-top: 1px solid #fff !important;
  border-right: 1px solid #fff !important;
  border-bottom: 1px solid #fff !important;
  background-color: #fff !important;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  margin: 0;
}

.search-button icon {
  margin-top: 40rpx;
  margin-left: 40rpx;
}

.search-input {
  width: 80%;
  background-color: #fff;
  padding: 32rpx 0 32rpx 32rpx;
  min-height: 1rem;
  font-size: 30rpx;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 0;
}
</style>