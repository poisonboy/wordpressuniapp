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
    <view class="wrapper">
        <image @tap="posterImageClick" :data-src="posterImageUrl" mode="widthFix" class="posterimage" :src="posterImageUrl"></image>
    </view>
     <view style="text-align:center">
            <button class="gotowebpage-button" formType="submit" size="mini" @tap="savePosterImage">保存图片</button>
            <modal :title="dialog.title" v-if="dialog.hidden" no-cancel @confirm="confirm">{{dialog.content}}</modal>
        </view>
        <view style="color: #888;font-size: 9pt;text-align: center;margin-top:10rpx">保存至相册后进行分享</view>

<view class="copyright">
    <!-- parse <template is="tempCopyright"/> --><block name="tempCopyright">
<view style="margin-top: 24rpx;">  © {{webSiteName}} {{domain}} </view>
</block>
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
var Api = require('../../utils/api.js');

var util = require('../../utils/util.js');

var wxApi = require('../../utils/wxApi.js');

var wxRequest = require('../../utils/wxRequest.js');

var auth = require('../../utils/auth.js');

import config from '../../utils/config.js';
var app = getApp();
export default {data() {
            return {
              posterImageUrl: "",

              dialog: {
                title: '',
                content: '',
                hidden: true
              },

              webSiteName: "",
              domain: ""
            };
        },onLoad: function (options) {
  var that = this;
  uni.setNavigationBarTitle({
    title: '海报',
    success: function (res) {// success
    }
  });
  that.setData({
    posterImageUrl: options.posterImageUrl
  });
}, 
methods: {
  savePosterImage: function () {
    var that = this;
    uni.downloadFile({
      url: that.data.posterImageUrl,
      success: function (res) {
        uni.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,

          success(result) {
            console.log(result);
            uni.showModal({
              title: '提示',
              content: '二维码海报已存入手机相册，赶快分享吧',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  uni.navigateBack({
                    delta: 1
                  });
                }
              }
            });
          }

        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },

  posterImageClick: function (e) {
    var src = e.currentTarget.dataset.src;
    uni.previewImage({
      urls: [src]
    });
  },

  confirm() {
    console.log("占位：函数 confirm 未声明");
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
 * Copyright (c) 2017  微慕 https://www.minapper.com All rights reserved.
 * 
 */


 .wrapper{
  padding: 5rpx;
  border: 2rpx solid #eee;
  margin-top: 10rpx; 
 -webkit-box-shadow: 3px 3px 3px;  
  -moz-box-shadow: 3px 3px 3px;  
  box-shadow: 3px 3px 3px #eee;  
}
.posterimage{
    width: 100%;
    height:100%
}

.gotowebpage-button {
  font-size: 0.785714286rem;
  font-weight: normal;
  color:  #fff;
  background-color: #118fff;
  background-repeat: repeat-x;
  line-height: 80rpx;
  margin-top: 40rpx;
  width: 320rpx;
  height: 60rpx;
  border-radius: 60rpx;
}

.gotowebpage-button::after{
   border: none; 
}
</style>