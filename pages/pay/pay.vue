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
  <!-- parse <template is="tempHeader"/> --><block name="tempHeader">
  <view class="header">
    <image src="/static/images/logo700.png" style="height:200rpx;width:400rpx"></image>
    <view style="margin-top:40rpx">
      守望生活, 审视自我,宁静雅致的小轩馆.
    </view>
  </view>
</block> 

  <view class="title">请选{{praiseWord}}的金额</view>

  <view class="price-list">
    <view class="item" :data-item="item" @tap="selectItem" v-for="(item,index) in (prices)" :key="index">
      


<view :class="'price-box '+(selected==item?'active':'')">
        <em><text class="price">{{item}}</text>  元</em> 
      </view>



    </view>
  </view>

 <view style="text-align: center">
  <button class="cancel-button;margin-bottom: 40rpx" formType="submit" size="mini" @tap="cancel">取消</button>
 </view>

  <view class="ditail-copyright" :style="'display:'+(display)">
     <!-- parse <template is="tempCopyright" :data="webSiteName:webSiteName,domain:domain"/> --><block name="tempCopyright">
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
 *  *Copyright (c) 2017 https://www.minapper.com All rights reserved.
 * 
 */
var Api = require('../../utils/api.js');

var util = require('../../utils/util.js');

var auth = require('../../utils/auth.js');

var wxApi = require('../../utils/wxApi.js');

var wxRequest = require('../../utils/wxRequest.js');

import config from '../../utils/config.js';
var webSiteName = config.getWebsiteName;
var domain = config.getDomain;
var app = getApp();
var praiseWord = "鼓励";
export default {data() {
            return {
              prices: [6, 8, 18, 66, 88, 188],
              openid: '',
              postid: '',
              total_fee: '',
              flag: '1',
              webSiteName: webSiteName,
              domain: domain,
              praiseWord: "",
              selected: "",
              display: ""
            };
        },/**
 * 进入页面
 */
onLoad: function (options) {
  var that = this;
  var openid = options.openid;
  var postid = options.postid;
  var flag = options.flag;
  praiseWord = options.praiseWord;
  that.setData({
    openid: openid,
    postid: postid,
    flag: flag,
    praiseWord: praiseWord
  });
}, 
methods: {
    cancel: function () {
      uni.navigateBack({
        delta: 1
      });
    },

    /**
     * 选中鼓励金额
     */
    selectItem: function (event) {
      var totalfee = event.currentTarget.dataset.item;
      var money = totalfee;
      totalfee = totalfee;
      var that = this;
      var url = Api.postPraiseUrl();
      var data = {
        openid: that.data.openid,
        totalfee: totalfee
      };
      var postPraiseRequest = wxRequest.postRequest(url, data);
      postPraiseRequest.then(response => {
        if (response.data) {
          var temp = response.data;
          uni.requestPayment({
            'timeStamp': response.data.timeStamp,
            'nonceStr': response.data.nonceStr,
            'package': response.data.package,
            'signType': 'MD5',
            'paySign': response.data.paySign,
            'success': function (res) {
              var url = Api.updatePraiseUrl();
              var data = {
                openid: that.data.openid,
                postid: that.data.postid,
                orderid: response.data.nonceStr,
                money: totalfee
              };
              var form_id = response.data.package;
              form_id = form_id.substring(10);
              var updatePraiseRequest = wxRequest.postRequest(url, data); //更新鼓励数据

              updatePraiseRequest.then(response => {
                console.log(response.data.message);
              }).then(res => {
                uni.showToast({
                  title: '谢谢' + praiseWord + '！',
                  duration: 2000,
                  success: function () {
                    data = {
                      openid: that.data.openid,
                      postid: that.data.postid,
                      template_id: that.data.template_id,
                      form_id: form_id,
                      total_fee: money,
                      flag: that.data.flag,
                      fromUser: "None"
                    }; // url = Api.sendMessagesUrl();
                    // var sendMessageRequest = wxRequest.postRequest(url, data);
                    // sendMessageRequest.then(response => {
                    //     if (response.data.status == '200') {
                    //         console.log(response.data.message);
                    //         wx.navigateBack({
                    //             delta: 1
                    //         })
                    //     }
                    //     else {
                    //         console.log(response.data.message);
                    //     }
                    // });
                  }
                });
              });
            },
            'fail': function (res) {
              uni.showToast({
                title: res.errMsg,
                icon: 'success'
              });
            },
            complete: function (res) {
              if (res.errMsg == 'requestPayment:fail cancel') {
                uni.showToast({
                  title: '取消' + praiseWord,
                  icon: 'success'
                });
              }
            }
          });
        } else {
          console.log(response.data.message);
        }
      });
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

.container {
  width: 100%;
  margin-bottom: 10rpx;
  padding:0 0rpx
}


.title
{
  text-align: center;
  margin-bottom: 50rpx;
}

.price-list {
  padding: 0 15rpx;
  text-align: center;
  flex-direction: row;
}

.price-list .item {
  float: left;
  margin-right: 10rpx;
  margin-left: 10rpx;
  margin-bottom: 20rpx;
  width: 220rpx;
}

.price-list .price-box {
  width: 100%;
  height: 100rpx;
  border-radius: 20rpx;
  border: 1rpx solid #3366CC;
  text-align: center;
}

.price-list .price-box em {
  line-height: 100rpx;
  color: #d55a4a;
  font-size: 30rpx;
}

.price-list .price-box .price {
  font-size: 50rpx;
  display: inline-block;
}

.price-list .price-box.active {
  background-color: #3366CC;
}

.price-list .price-box.active em {
  color: #fff;
  background-color: #3366CC;
}


.cancel-button {
  font-size: 0.785714286rem;
  font-weight: normal;
  color:  #3366CC;
  background-color: #fff;
  background-repeat: repeat-x;
  margin-top: 30rpx;
  width: 300rpx;
}
</style>