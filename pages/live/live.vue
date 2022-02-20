<template>
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
<view class="HomePage">
  <view class="HomeLive">
    <view class="HomeLive-title">
      <view class="HomeLive-titleLive">全部直播</view>
      <view class="HomeLive-titleNum">
        <text class="HomeLive-titleNumText">当前</text>
        <text class="HomeLive-titleNumText mark">{{getliveinfo.total}}</text>
        <text class="HomeLive-titleNumText">个直播</text>
        <text class="HomeLive-titleNumIcon"></text>
      </view>
    </view>

    <view class="HomeLive-content">
      <block v-for="(item,index) in (room_info)" :key="item.id">

        


<view class="NormalRoomItem">
          <view class="NormalRoomItem-show" @tap.stop.prevent="redictLive" :data-livestatus="item.live_status" :data-roomid="item.roomid" :data-livestatusname="item.live_status_name">
            <view class="NormalRoomItem-showImg">
              <image mode="aspectFill" :src="item.cover_img"/>
            </view>
            <view class="NormalRoomItem-showHot">
              <view class="NormalRoomItem-item">
                <!-- <text class="NormalRoomItem-showHotNum">观看 366.3万</text>
                <text class="NormalRoomItem-showHotNum">点赞 366.3万</text> -->
              </view>
              <view class="NormalRoomItem-item">
                <!-- <text class="NormalRoomItem-showHotNum">评论 366.3万</text>
                <text class="NormalRoomItem-showHotNum">分享 366.3万</text> -->
              </view>
            </view>
            <view class="NormalRoomItem-showAnchor">
              <text class="NormalRoomItem-showAnchorIcon"></text>
              <text class="NormalRoomItem-showAnchorName">{{item.anchor_name}}</text>
            </view>
          </view>

          <view class="NormalRoomItem-title">{{item.name}}</view>
          <view class="NormalRoomItem-title1">时间：{{item.start_time_name}}</view>
          <view class="NormalRoomItem-footer">
            <text>{{item.live_status_name}}</text>
            <text v-if="item.live_status_name === '已结束'" class="btn">看回放</text>
            <text v-if="item.live_status_name === '还没开始'" class="btn">订阅提醒</text>
          </view>



          <subscribe :room-id="item.roomid"></subscribe>

        </view>



      </block>
    </view>

  </view>
</view>
</template>

<script>
import subscribe from "plugin-private://wx2b03c6e691cd7370/components/subscribe/subscribe";
/*
 * 微慕小程序
 * author: jianbo
 * organization:  微慕 www.minapper.com
 * 技术支持微信号：Jianbo
 * Copyright (c) 2018 https://www.minapper.com All rights reserved.
 */
var Api = require('../../utils/api.js');

var util = require('../../utils/util.js');

var wxRequest = require('../../utils/wxRequest.js');

import config from '../../utils/config.js';
var webSiteName = config.getWebsiteName;

const Adapter = require('../../utils/adapter.js');

export default {
                    components: {
                      subscribe
                    },
                    data() {
            return {
  room_info: [],
  getliveinfo: {
    total: ""
  },
  shareTitle: webSiteName + "-直播"
};
        }, 
onLoad: function (options) {
  // 设置系统分享菜单
  uni.showShareMenu({
    withShareTicket: true,
    menus: ["shareAppMessage", "shareTimeline"]
  });
  Adapter.setInterstitialAd("enable_live_interstitial_ad");
}, 
// 自定义分享朋友圈
onShareTimeline: function () {
  return {
    title: this.data.shareTitle
  };
}, 
// 分享
onShareAppMessage: function () {
  return {
    title: this.data.shareTitle,
    path: '/pages/live/live'
  };
}, 
onShow: function () {
  var that = this;
  that.setData({
    room_info: [],
    getliveinfo: {}
  });
  var getLiveRequest = wxRequest.getRequest(Api.getliveinfo());
  getLiveRequest.then(res => {
    var room_info = res.data.room_info;
    var getliveinfo = res.data;
    that.setData({
      getliveinfo: getliveinfo,
      room_info: that.data.room_info.concat(room_info.map(function (item) {
        switch (item.live_status) {
          case 101:
            item.live_status_name = "直播中";
            break;

          case 102:
            item.live_status_name = "未开始";
            break;

          case 103:
            item.live_status_name = "已结束";
            break;

          case 104:
            item.live_status_name = "禁播";
            break;

          case 105:
            item.live_status_name = "暂停中";
            break;

          case 106:
            item.live_status_name = "异常";
            break;

          case 107:
            item.live_status_name = "已过期";
            break;
        }

        item.start_time_name = util.datefomate(item.start_time, "yyyy-MM-dd HH:mm:ss");
        item.end_time_name = util.datefomate(item.end_time, "yyyy-MM-dd HH:mm:ss");
        return item;
      }))
    });
  });
}, 
methods: {
    // 跳转
    redictLive(e) {
      var live_status = e.currentTarget.dataset.livestatus;
      var roomid = e.currentTarget.dataset.roomid;
      var livestatusname = e.currentTarget.dataset.livestatusname; //../../__plugin__/wx2b03c6e691cd7370/pages/live-player-plugin

      if (live_status == "101" || live_status == "102" || live_status == "103") {
        var url = "plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=" + roomid;
        uni.navigateTo({
          url: url
        });
      } else {
        uni.showToast({
          title: "直播" + livestatusname,
          mask: false,
          icon: "none",
          duration: 1000
        });
      }
    }
}
                };
</script>
<style >
.HomePage {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
}

.HomePage .HomePage-top {
  width: 100%;
  height: 100px;
  background: #fff;
}

.HomePage .HomePage-bottom {
  position: absolute;
  top: 100px;
  left: 0;
  bottom: 0;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #fff;
}

.HomeLive {
  margin-top: 10px;
  width: 100%;
  background: #fff;
}

.HomeLive .HomeLive-title {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -moz-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0 5px;
  width: 100%;
  height: 42px;
}

.HomeLive .HomeLive-title .HomeLive-titleLive {
  padding-left: 30px;
  height: 100%;
  line-height: 42px;
  color: #333;
  font-size: 15px;
  background: url("https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/icon-live_88adc06.png") no-repeat;
  -webkit-background-size: 20px 12px;
  -moz-background-size: 20px 12px;
  background-size: 20px 12px;
  background-position: 0;
}

.HomeLive .HomeLive-title .HomeLive-titleNum {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100%;
  line-height: 42px;
}

.HomeLive .HomeLive-title .HomeLive-titleNum .HomeLive-titleNumText {
  display: block;
  height: 100%;
  font-size: 13px;
  color: #999;
}

.HomeLive .HomeLive-title .HomeLive-titleNum .HomeLive-titleNumText.mark {
  color: #f36;
}

.HomeLive .HomeLive-title .HomeLive-titleNum .HomeLive-titleNumIcon {
  display: block;
  margin-left: 5px;
  width: 13px;
  height: 13px;
  background: url("https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/icon-more_6c08756.png") no-repeat;
  background-size: 100% 100%;
}

.HomeLive .HomeLive-content {
  box-sizing: border-box;
  padding-left: 30rpx;
  width: 100%;
  overflow: hidden;
}

.NormalRoomItem {
  position: relative;
  float: left;
  box-sizing: border-box;
  margin: 0 30rpx 30rpx 0;
  width: 330rpx;
  box-shadow: 0 5px 7px 5px #f6f6f6;
  border-radius: 9px;
}

.NormalRoomItem .NormalRoomItem-show {
  position: relative;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
  height: 590rpx;
}

.NormalRoomItem .NormalRoomItem-show:after {
  display: block;
  content: "";
  padding-top: 56.25%;
}

.NormalRoomItem .NormalRoomItem-show .NormalRoomItem-showImg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: hidden;
}

.NormalRoomItem .NormalRoomItem-show .NormalRoomItem-showImg,
.NormalRoomItem .NormalRoomItem-show .NormalRoomItem-showImg image {
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  width: 100%;
  height: 100%;
}

.NormalRoomItem .NormalRoomItem-show .NormalRoomItem-showLive {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 20;
  width: 56px;
  height: 16px;
  background-image: url("https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/playing_9f3b01a.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.NormalRoomItem .NormalRoomItem-show .NormalRoomItem-showLive.phone {
  background-image: url("https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/e-playing_ade1373.png");
}

.NormalRoomItem .NormalRoomItem-show .NormalRoomItem-showHot {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding: 5px 0 10px;
  background: linear-gradient( rgba(0, 0, 0, 0.8), transparent);
  font-size: 10px;
  color: #fff;
}

.NormalRoomItem .NormalRoomItem-show .NormalRoomItem-showHot .NormalRoomItem-item {
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
}

.NormalRoomItem .NormalRoomItem-show .NormalRoomItem-showAnchor {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding: 0 5px;
  border-radius: 0 0 4px 4px;
  width: 100%;
  height: 80rpx;
  overflow: hidden;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
}

.NormalRoomItem .NormalRoomItem-show .NormalRoomItem-showAnchor .NormalRoomItem-showAnchorIcon {
  display: block;
  width: 11px;
  height: 12px;
  margin-right: 3px;
  background: url("https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/iconfont-wo_fdcada2.png") no-repeat;
  background-size: 100% 100%;
}

.NormalRoomItem .NormalRoomItem-show .NormalRoomItem-showAnchor .NormalRoomItem-showAnchorName {
  display: block;
  flex: 1;
  height: 18px;
  line-height: 18px;
  font-size: 10px;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.NormalRoomItem .NormalRoomItem-title {
  width: 100%;
  height: 27px;
  line-height: 27px;
  font-size: 15px;
  color: #333;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  padding: 0 10rpx;
}

.NormalRoomItem .NormalRoomItem-title1 {
  width: 100%;
  height: 27px;
  line-height: 27px;
  font-size: 12px;
  color: rgb(88, 86, 86);
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 10rpx;
}

.subscribe--live-player-subscribe__btn {
  width: 60px !important;
  height: 20px !important;
  line-height: 20px !important;
  font-weight: 450 !important;
  text-align: center !important;
  font-size: 12px !important;
  color: #fff !important;
  background: #f36 !important;
  border-radius: 50px !important;
  pointer-events: auto !important;
  margin: 0 auto;
  position: absolute !important;
  right: 10rpx !important;
  bottom: 10rpx !important;
}

.NormalRoomItem-footer {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  padding: 0 10rpx 20rpx;
}

.NormalRoomItem-footer .btn {
  font-size: 10px;
  color: #fff;
  line-height: 40rpx;
  background: #f36;
  padding: 0 20rpx;
  height: 40rpx;
  border-radius: 20rpx;
}

</style>