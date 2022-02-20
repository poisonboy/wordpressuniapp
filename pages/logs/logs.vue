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
 *  * Copyright (c) 2017  微慕 https://www.minapper.com All rights reserved.
 *
 */-->
<view class="container log-list">
  <block v-for="(log,index) in (logs)" :key="index">
    



<text class="log-item">{{index + 1}}. {{log}}</text>




  </block>
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
var util = require('../../utils/util.js');

export default {data() {
            return {
              logs: [],
              log: ""
            };
        },onLoad: function () {
  this.setData({
    logs: (uni.getStorageSync('logs') || []).map(function (log) {
      return util.formatTime(new Date(log));
    })
  });
}, 
methods: {}};
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

.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}
.log-item {
  margin: 10rpx;
}

</style>