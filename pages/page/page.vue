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

 
<view class="container">
    <view class="content-article ">
                    <view class="entry-title">
                   {{pageData.title.rendered}}
                    </view>
                    <view class="entry-summary">
                   <mp-html :content="pageData.content.rendered" @linktap="wxParseTagATap" :copy-link="false" :selectable="true" :lazy-load="true" :markdown="true"/>
                    </view>
                </view>

            <view class="ditail-copyright" :style="'display:'+(display)">
 
  </view>
</view>

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
import config from '../../utils/config.js';

var Api = require('../../utils/api.js');

var util = require('../../utils/util.js');

var webSiteName = config.getWebsiteName;
var domain = config.getDomain;
export default {data() {
            return {
              title: '页面内容',

              pageData: {
                title: {
                  rendered: ""
                },

                content: {
                  rendered: ""
                }
              },

              pagesList: {},
              hidden: false,
              webSiteName: webSiteName,
              domain: domain,
              display: ""
            };
        },onLoad: function (options) {
  this.fetchData(options.id);
  uni.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline'],
    success: function (e) {//console.log(e);
    }
  });
}, 
onShareTimeline: function () {
  let imageUrl = this.data.pageData.post_full_image;

  if (imageUrl == '') {
    imageUrl = this.data.pageData.postImageUrl;
  }

  return {
    title: this.data.pageData.title.rendered,
    query: {
      id: this.data.pageData.id
    },
    imageUrl
  };
}, 
methods: {
  fetchData: function (id) {
    var that = this;
    that.setData({
      hidden: false
    });
    uni.request({
      url: Api.getPageByID(id, {
        mdrender: false
      }),
      success: function (response) {
        console.log(response);
        that.setData({
          pageData: response.data
        });
        setTimeout(function () {
          that.setData({
            hidden: true
          });
        }, 300);
      }
    });
  },

  fetchPagesData: function () {
    var that = this;
    uni.request({
      url: Api.getPages(),
      success: function (response) {
        that.setData({
          pagesList: response.data
        });
        setTimeout(function () {
          that.setData({
            hidden: true
          });
        }, 300);
      }
    });
  },

  wxParseTagATap() {
    console.log("占位：函数 wxParseTagATap 未声明");
  }
}};
</script>
<style >
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

</style>