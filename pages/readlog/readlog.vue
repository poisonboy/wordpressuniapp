<template>
<block>

 


<ui-sys :title="'我的'+(pagetitle)">
<view class=" ui-BG-card ui-BG">

 
	<view class=" ">
		<view class="showerror" :style="'display:'+(showerror)">
			<text class=" cuIcon-warn lg text-grey" style="height:50px;width:50px;font-size:48px;" @tap.stop.prevent="exit"></text>
			<view class="errortext">
				暂时无法访问网络

			</view>
		</view>
		<!-- parse <template is="login-popup" :data="show: isLoginPopup, userInfo: userInfo"></template> --><block name="login-popup">
    <view :class="'zan-popup zan-popup--center login-popup '+(isLoginPopup ? 'zan-popup--show' : '')">
        <!-- 遮罩层 -->
        <view class="zan-popup__mask" @tap="closeLoginPopup"></view>
        <!-- 弹出层内容 -->
        <view class="zan-popup__container">
            <view class="login-popup-wrapper ui-BG">
				<!-- parse <template is="login" :data="userInfo: userInfo"></template> --><block name="login">
  <block v-if="(!userInfo.isLogin)">

    <view class="login-inner ">
      <image class="avatar" src="/static/images/gravatar.png"></image>
      <view class="username ui-TC-Main">
        <text>立即登录，体验更多功能</text>
      </view>
    </view>

    <view class="login-btn-box">
      <button class="login-btn ui-BG" @tap="closeLoginPopup">取消</button>
      <!-- <button class="login-btn" open-type="getUserInfo" bindgetuserinfo="agreeGetUser">确定</button> -->
        <button class="login-btn ui-BG" @tap="agreeGetUser">确定</button>
    </view>

  </block>
  <block v-else>
    <view class="login-inner">
      <image class="avatar" :src="userInfo.avatarUrl"></image>
      <view class="username">
        <text>{{userInfo.nickName}}</text>
      </view>
    </view>
  </block>
</block>
            </view>
        </view>
    </view>
</block>

		<view class="log-list">
			<view v-for="(item,index) in (readLogs)" :key="item.id">
				


<view class="log-items" :index="index" :id="item[0]" :data-itemtype="item[2]" @tap.stop.prevent="redictDetail">
					<text class="ren_mtie_xx text-lg ui-TC"> <text :class="'ren_mtie'+(index + 1)">{{index + 1}}</text> {{item[1]}}</text>
				</view>



			</view>
			<view class="log-items" v-if="readLogs.length<1">
				<text class="log_tips">没有相关文章！</text>
			</view>
		</view>

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
import config from '../../utils/config.js';

var Api = require('../../utils/api.js');

var util = require('../../utils/util.js');

var Auth = require('../../utils/auth.js');

var wxApi = require('../../utils/wxApi.js');

var wxRequest = require('../../utils/wxRequest.js');

var app = getApp();
var webSiteName = config.getWebsiteName;
var domain = config.getDomain;
export default {data() {
            return {
              pagetitle: '记录',
              readLogs: [],

              topBarItems: [// id name selected 选中状态
              {
                id: '1',
                name: '浏览',
                selected: true
              }, {
                id: '2',
                name: '评论',
                selected: false
              }, {
                id: '3',
                name: '点赞',
                selected: false
              }, {
                id: '4',
                name: '鼓励',
                selected: false
              }, {
                id: '5',
                name: '订阅',
                selected: false
              } // { id: '6', name: '言论', selected: false }
              ],

              tab: '1',
              showerror: "none",
              shownodata: "none",
              subscription: "",

              userInfo: {
                isLogin: "",
                avatarUrl: "",
                nickName: ""
              },

              userLevel: {},
              openid: '',
              isLoginPopup: false,
              webSiteName: webSiteName,
              domain: domain,

              dialog: {
                hidden: false,
                title: "",
                content: ""
              }
            };
        },/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
  var that = this; //self.fetchPostsData('1');

  Auth.setUserInfoData(that);
  Auth.checkLogin(that);
  var id = options.key;
  this.onLoadTag(id);
}, 
onReady: function () {
  var that = this;
  Auth.checkSession(that, 'isLoginNow');
}, 
onShareAppMessage: function () {
  var title = "分享我在“" + config.getWebsiteName + "浏览、评论、点赞、鼓励的文章";
  var path = "pages/readlog/readlog";
  return {
    title: title,
    path: path,
    success: function (res) {// 转发成功
    },
    fail: function (res) {// 转发失败
    }
  };
}, 
methods: {
    agreeGetUser: function (e) {
      let that = this;
      Auth.checkAgreeGetUser(e, app, that, '0');
    },

    refresh: function (e) {
      var that = this;

      if (that.data.openid) {
        var args = {};
        var userInfo = e.detail.userInfo;
        args.openid = that.data.openid;
        args.avatarUrl = userInfo.avatarUrl;
        args.nickname = userInfo.nickName;
        var url = Api.getUpdateUserInfo();
        var postUpdateUserInfoRequest = wxRequest.postRequest(url, args);
        postUpdateUserInfoRequest.then(res => {
          if (res.data.status == '200') {
            var userLevel = res.data.userLevel;
            uni.setStorageSync('userInfo', userInfo);
            uni.setStorageSync('userLevel', userLevel);
            that.setData({
              userInfo: userInfo
            });
            that.setData({
              userLevel: userLevel
            });
            uni.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 900,
              success: function () {}
            });
          } else {
            uni.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 900,
              success: function () {}
            });
          }
        });
      } else {
        Auth.checkSession(that, 'isLoginNow');
      }
    },

    onLoadTag: function (tab) {
      var that = this;
      var topBarItems = that.data.topBarItems; // 切换topBarItem 

      for (var i = 0; i < topBarItems.length; i++) {
        if (tab == topBarItems[i].id) {
          topBarItems[i].selected = true;
        } else {
          topBarItems[i].selected = false;
        }
      }

      that.setData({
        topBarItems: topBarItems,
        tab: tab
      });

      if (tab !== 0) {
        this.fetchPostsData(tab);
      } else {
        this.fetchPostsData("1");
      }
    },

    refreshlive: function () {
      let openid = this.data.openid;
      var getliveinfo = wxRequest.getRequest(Api.refreshliveinfo(openid));
      getliveinfo.then(res => {
        uni.showToast({
          title: res.data.message,
          mask: false,
          icon: "none",
          duration: 3000
        });
      });
    },

    exit: function (e) {
      Auth.logout(this);
      uni.reLaunch({
        url: '../index/index'
      });
    },

    clear: function (e) {
      Auth.logout(this);
    },

    // 跳转至查看文章详情
    redictDetail: function (e) {
      // console.log('查看文章');
      var id = e.currentTarget.id;
      var itemtype = e.currentTarget.dataset.itemtype;
      var url = "";

      if (itemtype == "1") {
        url = '../list/list?categoryID=' + id;
      } else {
        url = '../detail/detail?id=' + id;
      }

      uni.navigateTo({
        url: url
      });
    },

    onTapTag: function (e) {
      var that = this;
      var tab = e.currentTarget.id;
      var topBarItems = that.data.topBarItems; // 切换topBarItem 

      for (var i = 0; i < topBarItems.length; i++) {
        if (tab == topBarItems[i].id) {
          topBarItems[i].selected = true;
        } else {
          topBarItems[i].selected = false;
        }
      }

      that.setData({
        topBarItems: topBarItems,
        tab: tab
      });

      if (tab !== 0) {
        this.fetchPostsData(tab);
      } else {
        this.fetchPostsData("1");
      }
    },

    fetchPostsData: function (tab) {
      self = this;
      self.setData({
        showerror: 'none',
        shownodata: 'none'
      });
      var count = 0;
      var openid = "";

      if (tab != '1') {
        if (self.data.openid) {
          var openid = self.data.openid;
        } else {
          Auth.checkSession(self, 'isLoginNow');
          return;
        }
      }

      if (tab == '1') {
        self.setData({
          pagetitle: "浏览",
          readLogs: (uni.getStorageSync('readLogs') || []).map(function (log) {
            count++;
            return log;
          })
        });

        if (count == 0) {
          self.setData({
            shownodata: 'block'
          });
        }
      } else {
        if (tab == '2') {
          self.setData({
            pagetitle: "评论",
            readLogs: []
          });
          var getMyCommentsPosts = wxRequest.getRequest(Api.getWeixinComment(openid));
          getMyCommentsPosts.then(response => {
            if (response.statusCode == 200) {
              self.setData({
                readLogs: self.data.readLogs.concat(response.data.data.map(function (item) {
                  count++;
                  item[0] = item.post_id;
                  item[1] = item.post_title;
                  return item;
                }))
              });

              if (count == 0) {
                self.setData({
                  shownodata: 'block'
                });
              }
            } else {
              console.log(response);
              self.setData({
                showerror: 'block'
              });
            }
          });
        } else {
          if (tab == '3') {
            self.setData({
              pagetitle: "点赞",
              readLogs: []
            });
            var getMylikePosts = wxRequest.getRequest(Api.getMyLikeUrl(openid));
            getMylikePosts.then(response => {
              if (response.statusCode == 200) {
                self.setData({
                  readLogs: self.data.readLogs.concat(response.data.data.map(function (item) {
                    count++;
                    item[0] = item.post_id;
                    item[1] = item.post_title;
                    item[2] = "0";
                    return item;
                  }))
                });

                if (count == 0) {
                  self.setData({
                    shownodata: 'block'
                  });
                }
              } else {
                console.log(response);
                self.setData({
                  showerror: 'block'
                });
              }
            });
          } else {
            if (tab == '4') {
              self.setData({
                readLogs: []
              });
              var getMyPraisePosts = wxRequest.getRequest(Api.getMyPraiseUrl(openid));
              getMyPraisePosts.then(response => {
                if (response.statusCode == 200) {
                  self.setData({
                    readLogs: self.data.readLogs.concat(response.data.data.map(function (item) {
                      count++;
                      item[0] = item.post_id;
                      item[1] = item.post_title;
                      item[2] = "0";
                      return item;
                    }))
                  });

                  if (count == 0) {
                    self.setData({
                      shownodata: 'block'
                    });
                  }
                } else {
                  console.log(response);
                  this.setData({
                    showerror: 'block'
                  });
                }
              });
            } else {
              if (tab == '5') {
                self.setData({
                  pagetitle: "订阅",
                  readLogs: []
                });
                var url = Api.getSubscription() + '?openid=' + openid;
                var getMysubPost = wxRequest.getRequest(url);
                getMysubPost.then(response => {
                  if (response.statusCode == 200) {
                    var usermetaList = response.data.usermetaList;

                    if (usermetaList) {
                      self.setData({
                        readLogs: self.data.readLogs.concat(usermetaList.map(function (item) {
                          count++;
                          item[0] = item.ID;
                          item[1] = item.post_title;
                          item[2] = "0";
                          return item;
                        }))
                      });
                    }

                    if (count == 0) {
                      self.setData({
                        shownodata: 'block'
                      });
                    }
                  } else {
                    console.log(response);
                    this.setData({
                      showerror: 'block'
                    });
                  }
                });
              } else {
                if (tab == '6') {
                  self.setData({
                    readLogs: []
                  });
                  var getNewComments = wxRequest.getRequest(Api.getNewComments());
                  getNewComments.then(response => {
                    if (response.statusCode == 200) {
                      self.setData({
                        readLogs: self.data.readLogs.concat(response.data.map(function (item) {
                          count++;
                          item[0] = item.post;
                          item[1] = util.removeHTML(item.content.rendered + '(' + item.author_name + ')');
                          item[2] = "0";
                          return item;
                        }))
                      });

                      if (count == 0) {
                        self.setData({
                          shownodata: 'block'
                        });
                      }
                    } else {
                      console.log(response);
                      self.setData({
                        showerror: 'block'
                      });
                    }
                  }).catch(function () {
                    console.log(response);
                    self.setData({
                      showerror: 'block'
                    });
                  });
                }
              }
            }
          }
        }
      }
    },

    closeLoginPopup() {
      this.setData({
        isLoginPopup: false
      });
    },

    openLoginPopup() {
      this.setData({
        isLoginPopup: true
      });
    },

    confirm: function () {
      this.setData({
        "dialog.hidden": true,
        "dialog.title": '',
        "dialog.content": ''
      });
    }
}};
</script>
<style >
/**app.wxss**/

.readlog-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}

/*波浪*/
 
.ren_mtie_xx {
  width: 100%;
  display: block;
 
  padding: 10rpx 0;
  /*border-bottom: 1px solid #f0f0f0;*/
  overflow: hidden;
}

.ren_mtie_xx text {
  float: left;
  margin-right: 7px;
 width: 20px;
  height: 20px;
  line-height: 20px;
  background: #ccc;
  font-size: 12px;
  color: #fff;
  text-align: center;
  border-radius: var(--radius);
}

.ren_mtie_xx .ren_mtie1 {
  background: #fa6567;
}

.ren_mtie_xx .ren_mtie2 {
  background: #ffa800;
}

.ren_mtie_xx .ren_mtie3 {
  background: #7bbf1e;
}

.userinfo {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  
  height: 348rpx;
  width: 100%;
}

.userinfo_text_box {
  margin-left: 40rpx;
  color: #fff;
}

.userinfo_nickname {
  font-size: 48rpx;
  font-weight: 800;
  line-height: 1;
  display: block;
}

.userinfo_des_box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10rpx;
}

.userinfo_des {
  display: block;
  font-size: 28rpx;
  font-weight: 300;
  line-height: 1;
}

.update_btn_box {
  margin-left: 20rpx;
}

.usertool {
  background-color: #0081ff;
  height: 60rpx;
  text-align: right;
  position: absolute;
  top: 30rpx;
  right: 0;
}

.usertool-img {
  width: 40rpx;
  height: 40rpx;
  margin-right: 32rpx;
  opacity: 0.6;
}

.userinfo-avatar {
  width: 148rpx;
  height: 148rpx;
  margin-left: 48rpx;
  /* border-radius: 50%; */
}

.userinfo-img {
  width: 40rpx;
  height: 40rpx;
}

.update_btn_box {
  font-size: 20rpx;
  color: #fff;
}

.update-button {
  border-radius: 24rpx;
  line-height: 42rpx;
  background-color: rgba(0, 0, 0, 0.2);

  padding: 0 16rpx;
 
  font-size: 24rpx;
  font-weight: 500;
  color: #fff;
}

.update-button::after {
  border: none;
}

.top-bar {
  height: 100rpx;
  background: #fff;
  width: 100%;
  z-index: 1;
  box-shadow: 0px 4px 8px #f7f7f7;
  display: flex;
}

.top-bar-item {
  flex: 1;
  display: inline-block;
  background: #fff;
  color: #777;
  text-align: center;
  line-height: 100rpx;
  font-size: 30rpx;
}

.top-bar-item-Selected {
  border-bottom: 1px solid #0081ff;
  font-weight: bold;
  color: #0081ff;
}

/* 文章列表样式 */

.list_container {
  margin: 10rpx;
  padding: 20rpx;
  
}

.dec {
  margin-top: 50rpx;
}

.dec-text {
  font-size: 25rpx;
  color: #757575;
}

.log-list {
  display: flex;
  flex-direction: column;
  /* margin-top: 5rpx; */
}

/*.log-items {
  margin-top: 20rpx;
}
*/
.log-text {
  font-size: 30rpx;
  font-weight: 500;
  color: #777;
  text-align: left;
  word-wrap: break-word;
  word-break: break-all;
}

.log_tips {
  text-align: center;
  color: #c4c4c4;
  font-size: 30rpx;
  display: block;
  margin: 0 auto;
}

</style>