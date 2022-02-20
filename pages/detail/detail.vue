<template>

	<!--/*
 * 
 * 微慕小程序开源版
 * author: jianbo
 * organization: 微慕  www.minapper.com
 * github:    https://github.com/iamxjb/winxin-app-watch-life.net
 * 技术支持微信号：iamxjb
 * 开源协议：MIT
 *Copyright (c) 2017 https://www.minapper.com All rights reserved.
 * 
 */-->






	<ui-sys :title="detail.category_name">
		<view>
			<!-- 小程序广告 -->
			<!-- #ifdef MP -->


			<view class="ad-box" v-if="detail.detailAdId !='' && detail.detailAd=='1' && detailTopAdsuccess">
				<ad :unit-id="detail.detailAdId" ad-intervals="30" ad-type="video" @error="adTopbinderror"></ad>
			</view>
			<!-- #endif -->
			<!-- 文章 -->
			<view class="detail-content ui-BG-card ui-BG" :style="'display:'+(display)">
				<!-- 标题 -->
				<view class="entry-title text-xxl ui-TC">
					<text class="entry-title text-xxl ui-TC">{{detail.title.rendered}}</text>
				</view>
				<!-- 文章互动数据 -->
				<view class="entry-data ui-TC-3 text-xs">
					<text>{{detailDate}}</text>
					<!-- 	<text class="cicon-popover-o"> {{total_comments}}</text> -->
					<text class="cicon-eye-o"> {{detail.pageviews}}</text>
					<!-- 	<text class="cicon-favorite-o"> {{likeCount}}</text> -->
				</view>
				<!-- 文章正文 -->
				<view class="entry-summary" id="entry-summary">

					<mp-html :content="detail.content.rendered" @linktap="wxParseTagATap" :copy-link="true"
						:selectable="true" :lazy-load="true" :markdown="true" />
					<!-- 阅读更多 -->
					<!-- 	<view class="detail-read-more" v-if="detailSummaryHeight != ''">
							<view class="detail-readmore-mask">
								<view class="detail-readmore-btn" @tap="readMore">点此观看视频，查看隐藏内容</view>
							</view>
						</view> -->

				</view>

				<!-- 版权声明 -->


				<!-- 点个赞 -->

				<view class="bottomlink text-sm   bg-grey-thin" :style="'display:'+(display)">
					<view>
						<text style="margin-top: 10rpx;">文章ID：</text>{{postID}}
					</view>

					<text style="">声明：</text>
					本站所有内容来自网友投稿发布。如若本站内容侵犯了原著者的合法权益，可联系{{wechat}}进行处理。



				</view>

			</view>


			<!-- 上下文 -->
			<view v-if="detail.previous_post_id || detail.next_post_id" class="up-down-post ui-BG-card ui-BG">
				<!-- 上一篇 -->
				<view v-if="detail.previous_post_id" class="up-post">
					<navigator :url="'../detail/detail?id='+(detail.previous_post_id)" open-type="redirect"
						hover-class="relatedNavigator">上一篇：{{detail.previous_post_title}}</navigator>
				</view>
				<!-- 下一篇 -->
				<view v-if="detail.next_post_id" class="down-post">
					<navigator :url="'../detail/detail?id='+(detail.next_post_id)" open-type="redirect"
						hover-class="relatedNavigator">{{detail.next_post_title}}：下一篇</navigator>
				</view>
			</view>

			<!-- 小程序广告 -->
			<!-- #ifdef MP -->
			<view class="ad-box-video " v-if="detail.videoAdId !='' && detail.detailAd=='1' && detailAdsuccess">
				<ad :unit-id="detail.videoAdId" ad-intervals="30" ad-type="video" @error="adbinderror"></ad>
			</view>
			<!-- #endif -->

			<!-- 猜你喜欢 -->
			<view v-if="postList.length != 0" class="relatedPost ui-BG-card ui-BG" :style="'display:'+(display)">
				<view class="subTitle ui-TC">猜你喜欢</view>
				<view class="subTitle_line"></view>
				<block v-for="(item,index) in postList" :key="item.id">



					<navigator :url="'../detail/detail?id='+(item.id)" open-type="redirect"
						hover-class="relatedNavigator">
						<view class="relatedText ui-TC-1  "> <text class="dot ui-BG-Main"></text>
							{{item.title.rendered}}
						</view>
					</navigator>



				</block>
			</view>

			<view class="ditail-copyright" :style="'display:'+(display)">
				<!-- parse <template is="tempCopyright" :data="webSiteName:webSiteName,domain:domain"/> -->
				<block name="tempCopyright">
					<view style="margin-top: 24rpx;"> © {{webSiteName}} {{domain}} </view>
				</block>
			</view>

			<!-- 评论区 -->
			<!-- <view :style="'display:'+(enableComment?'block':'none')">
					<view class="foot ui-BG" :style="'display:'+(display)">
						<view class="foot_memu" :style="'margin-bottom: '+(sys_info.safeArea.top)+'rpx;'">
							<view class=" comment ui-BG-2 ui-TC-2" @tap="showCustomizeModal" data-key="drawer">
								<text class="cicon-popover-o "> 说点什么吧...</text>
							</view>

							<view class="icon" @tap.stop.prevent="praise">
								<text class="cicon-sponsor ui-TC-2"> </text>
							</view>
							<view class="icon" @tap.stop.prevent="onCreatePoster">
								<text class="cicon-camera-lens ui-TC-2"> </text>
							</view>
							<view class="icon">
								<text class="cicon-weixin ui-TC-2" style=" font-size: 32px;"> </text>
								<button class="ui-btn" open-type="share"></button>
							</view>


						</view>
					</view>
				</view>
 -->

			<!-- 无法访问网络时 -->
			<view class="showerror" :style="'display:'+(showerror)">
				<text class="cicon-wifi-off text-xsl"></text>
				<view class="errortext">{{errMessage}}</view>
			</view>

		</view>
		<!-- <form @submit.stop.prevent="formSubmit" :report-submit="true">
				<ui-modal :show="target === 'drawer'" mask="40" align="bottom" :showCancel="false">

					<view class="comment-respond radius">
						<input class="comment-input radius" maxlength="200" name="inputPostID" :value="detail.id"
							style="display:none" />

						<view class="comment-box">


						 
			<view class="comment_input_box">
				<textarea class="comment-input radius ui-BG-2 ui-TC-2" type="text" confirm-type="send"
					cursor-spacing="10" maxlength="100" name="inputComment" :value="content" :placeholder="placeholder"
					@blur="onReplyBlur" @focus="onRepleyFocus" auto-height />

			</view>
			<view class="comment_btn ui-BG-Main text-sm"> 发送 </view>
			<button class=" comment_btn_button  ui-btn " formType="submit"> </button>

			</view>

			</view>

			</ui-modal>
			</form>
			-->
	</ui-sys>

</template>

<script>
	/*
	 * 微慕小程序开源版
	 * author: jianbo
	 * organization: 微慕  www.minapper.com
	 * github:    https://github.com/iamxjb/winxin-app-watch-life.net
	 * 技术支持微信号：iamxjb
	 * 开源协议：MIT
	 *  *Copyright (c) 2017 https://www.minapper.com All rights reserved.
	 */
	import config from '../../utils/config.js';

	var Api = require('../../utils/api.js');

	var util = require('../../utils/util.js');

	var Auth = require('../../utils/auth.js');

	var wxApi = require('../../utils/wxApi.js');

	var wxRequest = require('../../utils/wxRequest.js');

	const Adapter = require('../../utils/adapter.js');

	const innerAudioContext = uni.createInnerAudioContext();
	let ctx = uni.createCanvasContext('mycanvas');
	var app = getApp();
	let isFocusing = false;
	const pageCount = config.getPageCount;
	var webSiteName = config.getWebsiteName;
	var domain = config.getDomain;

	var wechat = config.getWecat;
	let rewardedVideoAd = null;
	export default {
		data() {
			return {
				target: '',
				title: '文章内容',
				webSiteName: webSiteName,
				wechat: wechat,
				detail: {
					category_name: "",
					detailAdId: "",
					detailAd: "",

					title: {
						rendered: ""
					},

					pageviews: "",

					content: {
						rendered: ""
					},

					previous_post_id: "",
					next_post_id: "",
					previous_post_title: "",
					next_post_title: "",
					videoAdId: "",
					id: ""
				},

				commentsList: [],
				ChildrenCommentsList: [],
				commentCount: '',
				detailDate: '',
				commentValue: '',
				display: 'none',
				showerror: 'none',
				page: 1,
				isLastPage: false,
				parentID: "0",
				focus: false,
				placeholder: "请写下您想说的话...",
				postID: null,
				scrollHeight: 0,
				postList: [],
				link: '',

				dialog: {
					title: '',
					content: '',
					hidden: true
				},

				content: '',
				isShow: true,

				//控制menubox是否显示
				isLoad: true,

				//解决menubox执行一次  
				menuBackgroup: false,

				likeImag: "/static/pages/detail/like.png",
				likeList: [],
				likeCount: 0,
				displayLike: 'none',
				userid: "",
				toFromId: "",
				commentdate: "",
				flag: 1,
				logo: uni.getStorageSync('logoImageurl'),
				enableComment: true,
				isLoading: false,
				system: '',
				downloadFileDomain: uni.getStorageSync('downloadfileDomain'),
				businessDomain: uni.getStorageSync('businessDomain'),
				isPlayAudio: false,
				audioSeek: 0,
				audioDuration: 0,
				showTime1: '00:00',
				showTime2: '00:00',
				audioTime: 0,
				displayAudio: 'none',
				shareImagePath: '',
				detailSummaryHeight: '',
				detailAdsuccess: true,
				detailTopAdsuccess: true,
				fristOpen: false,
				domain: domain,
				detailSummaryHeight: '',
				platform: '',
				errMessage: "",
				postImageUrl: "",
				posterConfig: "",


			};
		},

		onLoad: function(options) {
			var that = this;
			uni.showShareMenu({
				withShareTicket: true,
				menus: ["shareAppMessage", "shareTimeline"],
				success: function(e) {}
			});

			that.fetchDetailData(options.id);
			uni.getSystemInfo({
				success: function(t) {
					var system = t.system.indexOf("iOS") != -1 ? "iOS" : "Android";
					that.setData({
						system: system,
						platform: t.platform
					});
				}
			});

		},
		onUnload: function() {
			//卸载页面，清除计步器


			if (rewardedVideoAd && rewardedVideoAd.destroy) {
				rewardedVideoAd.destroy();
			}

			innerAudioContext.destroy();
			ctx = null;
		},
		onShareAppMessage: function(res) {

			console.log(res);
			return {
				title: '分享"' + webSiteName + '"的文章：' + this.data.detail.title.rendered,
				path: 'pages/detail/detail?id=' + this.data.detail.id,
				imageUrl: this.data.detail.post_full_image,
				success: function(res) {
					// 转发成功
					console.log(res);
				},
				fail: function(res) {
					console.log(res); // 转发失败
				}
			};
		},
		// 自定义分享朋友圈
		onShareTimeline: function() {
			let imageUrl = this.data.detail.post_full_image;
			return {
				title: this.data.detail.title.rendered,
				query: {
					id: this.data.detail.id
				},
				imageUrl
			};
		},
		methods: {
			onLoadClone3389: function(options) {},

			showLikeImg: function() {
				var that = this;
				var flag = false;
				var _likes = that.data.detail.avatarurls;

				if (!_likes) {
					return;
				}

				var likes = [];

				for (var i = 0; i < _likes.length; i++) {
					var avatarurl = "/static/images/gravatar.png";

					if (_likes[i].avatarurl.indexOf('wx.qlogo.cn') != -1) {
						avatarurl = _likes[i].avatarurl;
					}

					likes[i] = avatarurl;
				}

				var temp = likes;
				that.setData({
					likeList: likes
				});
			},

			// 首次加载评论
			fristOpenComment() {
				this.setData({
					page: 1,
					commentsList: [],
					isLastPage: false
				});
				this.fetchCommentData();
				this.setData({
					page: this.data.page + 1
				});
			},

			gotowebpage: function() {
				var that = this;


				var url = '';

				if (enterpriseMinapp == "1") {
					var url = '../webpage/webpage';
					uni.navigateTo({
						url: url + '?url=' + self.link
					});
				} else {
					that.copyLink(self.link);
				}
			},

			copyLink: function(url) {
				uni.setClipboardData({
					data: url,
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: '链接已复制',
									duration: 2000
								});
							}
						});
					}
				});
			},


			goHome: function() {
				uni.switchTab({
					url: '../index/index'
				});
			},

			//获取文章内容
			fetchDetailData: function(id) {
				var self = this;
				var getPostDetailRequest = wxRequest.getRequest(Api.getPostByID(id));
				var res;
				getPostDetailRequest.then(response => {
					res = response;

					if (response.data.code && response.data.data.status == "404") {
						self.setData({
							showerror: 'block',
							display: 'none',
							errMessage: response.data.message
						});
						return false;
					} // 设置页面标题：文章分类


					uni.setNavigationBarTitle({
						title: res.data.category_name
					});
					//WxParse.wxParse('article', 'html', response.data.content.rendered, self, 5)
					setTimeout(() => {
						self.article_article = response.data.content.rendered;
					}, 200);


					// 如果超过指定数量




					self.setData({
						detail: response.data,
						postID: id,
						link: response.data.link,
						detailDate: util.cutstr(response.data.date, 10, 1),
						display: 'block',
					});
					return response.data;
				}).then(response => {
					var tagsArr = [];
					tagsArr = res.data.tags;

					if (!tagsArr) {
						return false;
					}

					var tags = "";

					for (var i = 0; i < tagsArr.length; i++) {
						if (i == 0) {
							tags += tagsArr[i];
						} else {
							tags += "," + tagsArr[i];
						}
					}

					if (tags != "") {
						var getPostTagsRequest = wxRequest.getRequest(Api.getPostsByTags(id, tags));
						getPostTagsRequest.then(response => {
							self.setData({
								postList: response.data
							});
						});
					}
				}).catch(function(error) {
					console.log('error: ' + error);
				});
			},

			//拖动进度条事件
			sliderChange: function(e) {
				var that = this;
				innerAudioContext.src = this.data.detail.audios[0].src; //获取进度条百分比

				var value = e.detail.value;
				this.setData({
					audioTime: value
				});
				var duration = this.data.audioDuration; //根据进度条百分比及歌曲总时间，计算拖动位置的时间

				value = parseInt(value * duration / 100); //更改状态

				this.setData({
					audioSeek: value,
					isPlayAudio: true
				}); //调用seek方法跳转歌曲时间

				innerAudioContext.seek(value); //播放歌曲

				innerAudioContext.play();
			},

			//初始化播放器，获取duration
			InitializationAudio: function(audiosrc) {
				var that = this; //设置src

				innerAudioContext.src = audiosrc; //运行一次
				//innerAudioContext.play();

				innerAudioContext.autoplay = false;
				innerAudioContext.pause();
				innerAudioContext.onCanplay(() => {
					//初始化duration
					innerAudioContext.duration;
					setTimeout(function() {
						//延时获取音频真正的duration
						var duration = innerAudioContext.duration;
						var min = parseInt(duration / 60);
						var sec = parseInt(duration % 60);

						if (min.toString().length == 1) {
							min = `0${min}`;
						}

						if (sec.toString().length == 1) {
							sec = `0${sec}`;
						}

						that.setData({
							audioDuration: innerAudioContext.duration,
							showTime2: `${min}:${sec}`
						});
					}, 1000);
				});
			},

			loadAudio: function() {
				var that = this; //设置一个计步器

			},

			playAudio: function() {
				//获取播放状态和当前播放时间  
				var that = this;
				var isPlayAudio = that.data.isPlayAudio;
				var seek = that.data.audioSeek;
				innerAudioContext.pause(); //更改播放状态

				that.setData({
					isPlayAudio: !isPlayAudio
				});

				if (isPlayAudio) {
					//如果在播放则记录播放的时间seek，暂停
					that.setData({
						audioSeek: innerAudioContext.currentTime
					});
				} else {
					//如果在暂停，获取播放时间并继续播放
					innerAudioContext.src = that.data.detail.audios[0].src;

					if (innerAudioContext.duration != 0) {
						that.setData({
							audioDuration: innerAudioContext.duration
						});
					} //跳转到指定时间播放


					innerAudioContext.seek(seek);
					innerAudioContext.play();
				}
			},

			//给a标签添加跳转和复制链接事件
			wxParseTagATap: function(e) {
				let that = this;
				let href = e.detail.src || e.detail.href;
				let domain = config.getDomain;
				let appid = e.detail.appid;
				let redirectype = e.detail.redirectype;
				let path = e.detail.path; // 判断a标签src里是不是插入的文档链接

				let isDoc = /\.(doc|docx|xls|xlsx|ppt|pptx|pdf)$/.test(href);

				if (isDoc) {
					this.openLinkDoc(e);
					return;
				}

				if (redirectype) {
					if (redirectype == 'apppage') {
						//跳转到小程序内部页面         
						uni.navigateTo({
							url: path
						});
					} else {
						if (redirectype == 'webpage') //跳转到web-view内嵌的页面
						{
							href = '../webpage/webpage?url=' + href;
							uni.navigateTo({
								url: href
							});
						} else {
							if (redirectype == 'miniapp') //跳转其他小程序
							{
								uni.navigateToMiniProgram({
									appId: appid,
									path: path
								});
							}
						}
					}

					return;
				}

				var enterpriseMinapp = that.data.detail.enterpriseMinapp; //可以在这里进行一些路由处理

				if (href.indexOf(domain) == -1) {
					var n = 0;

					for (var i = 0; i < that.data.businessDomain.length; i++) {
						if (href.indexOf(that.data.businessDomain[i].domain) != -1) {
							n++;
							break;
						}
					}

					if (n > 0) {
						var url = '../webpage/webpage';

						if (enterpriseMinapp == "1") {
							url = '../webpage/webpage';
							uni.navigateTo({
								url: url + '?url=' + href
							});
						} else {
							that.copyLink(href);
						}
					} else {
						that.copyLink(href);
					}
				} else {
					var slug = util.GetUrlFileName(href, domain);

					if (slug == "") {
						var url = '../webpage/webpage';

						if (enterpriseMinapp == "1") {
							url = '../webpage/webpage';
							uni.navigateTo({
								url: url + '?url=' + href
							});
						} else {
							that.copyLink(href);
						}

						return;
					}

					if (slug == 'index') {
						uni.switchTab({
							url: '../index/index'
						});
					} else {
						var getPostSlugRequest = wxRequest.getRequest(Api.getPostBySlug(slug));
						getPostSlugRequest.then(res => {
							if (res.statusCode == 200) {
								if (res.data.length != 0) {
									var postID = res.data[0].id;
									var openLinkCount = uni.getStorageSync('openLinkCount') || 0;

									if (openLinkCount > 4) {
										uni.redirectTo({
											url: '../detail/detail?id=' + postID
										});
									} else {
										uni.navigateTo({
											url: '../detail/detail?id=' + postID
										});
										openLinkCount++;
										uni.setStorageSync('openLinkCount', openLinkCount);
									}
								} else {
									var url = '../webpage/webpage';

									if (enterpriseMinapp == "1") {
										url = '../webpage/webpage';
										uni.navigateTo({
											url: url + '?url=' + href
										});
									} else {
										that.copyLink(href);
									}
								}
							}
						}).catch(res => {
							console.log(response.data.message);
						});
					}
				}
			},

			// 打开文档
			openLinkDoc(e) {
				let self = this;
				let url;
				let fileType; // 如果是a标签href中插入的文档

				let src = e.currentTarget.dataset.src;
				var n = 0;

				for (var i = 0; i < self.data.downloadFileDomain.length; i++) {
					if (src.indexOf(self.data.downloadFileDomain[i]) != -1) {
						n++;
						break;
					}
				}

				if (n == 0) {
					self.copyLink(src);
					return;
				}

				let docType;
				let isDoc = /\.(doc|docx|xls|xlsx|ppt|pptx|pdf)$/.test(src);

				if (src && isDoc) {
					url = src;
					fileType = /doc|docx|xls|xlsx|ppt|pptx|pdf$/.exec(src)[0];
				} else {
					url = e.currentTarget.dataset.filelink;
					fileType = e.currentTarget.dataset.filetype;
				}

				uni.downloadFile({
					url: url,
					success: function(res) {
						const filePath = res.tempFilePath;
						uni.openDocument({
							filePath: filePath,
							fieldType: fileType
						});
					},
					fail: function(error) {
						console.log('下载文档失败:' + error);
					}
				});
			},

			success(res) {
				const {
					detail
				} = res;
				console.log(detail);
			},

			showCustomizeModal(e) {
				this.setData({
					target: e.currentTarget.dataset.key
				});
			},



			//底部刷新
			loadMore: function(e) {
				var that = this;

				if (!that.data.isLastPage) {
					that.setData({
						page: that.data.page + 1
					});
					console.log('当前页' + that.data.page);
					this.fetchCommentData();
				} else {
					uni.showToast({
						title: '没有更多内容',
						mask: false,
						duration: 1000
					});
				}
			},

			confirm: function() {
				this.setData({
					"dialog.hidden": true,
					"dialog.title": '',
					"dialog.content": ''
				});
			},






			adbinderror: function(e) {
				var that = this;
				console.log(e.detail.errCode);
				console.log(e.detail.errMsg);

				if (e.detail.errCode) {
					that.setData({
						detailAdsuccess: false
					});
				}
			},

			adTopbinderror: function(e) {
				var that = this;
				console.log(e.detail.errCode);
				console.log(e.detail.errMsg);

				if (e.detail.errCode) {
					that.setData({
						detailTopAdsuccess: false
					});
				}
			},

			// 阅读更多
			readMore: function() {
				var that = this;
				var platform = that.data.platform;

				if (platform == 'devtools') {
					uni.showToast({
						title: "开发工具无法显示激励视频",
						icon: "none",
						duration: 2000
					});
					that.setData({
						detailSummaryHeight: ''
					});
				} else {
					rewardedVideoAd.show().catch(() => {
						rewardedVideoAd.load().then(() => rewardedVideoAd.show()).catch(err => {
							console.log('激励视频 广告显示失败');
							that.setData({
								detailSummaryHeight: ''
							});
						});
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
 * 
 */






	/* 文章正文样式 */

	.entry-summary {
		font-size: 32rpx;
		line-height: 64rpx;
		overflow: hidden;
		overflow-x: hidden;
		position: relative;
	}

	.entry-summary image {
		width: 100%
	}

	/* 标题 */

	.entry-title {


		font-weight: 600;
		outline: none;

		margin-bottom: 24rpx;
	}

	/* 文章互动数据 */

	.entry-data {
		display: flex;
		align-items: center;

		margin-bottom: 30rpx;
	}

	.entry-data text {
		margin-right: 32rpx;
	}

	.entry-data>image {
		width: 24rpx;
		height: 24rpx;
	}

	.entry-data>image:not(:first-child) {
		margin-left: 32rpx;
	}

	/* 上下文 */


	.up-post {
		text-align: left;
		width: 90%;

	}

	.down-post {
		text-align: right;
		margin-top: 16rpx;
		width: 100%;
	}

	/* 猜你喜欢、评论标题下的横线 */
	navigator {
		display: block;
	}

	.subTitle {
		margin: 0 0 20rpx;

		font-weight: 500;

		position: relative;
		display: flex;
		justify-content: space-between;
	}

	.subTitle_line {
		width: 100%;
		height: 1rpx;
		background-color: #eee;
		margin-bottom: 32rpx;
		position: relative;
		overflow: visible;
	}

	.subTitle_line::before {
		content: "";
		display: block;
		width: 100rpx;
		height: 4rpx;
		background: #959595;
		position: absolute;
		left: 0;
		top: -2rpx;
	}

	.subTitle_line_comment {
		margin-bottom: 40rpx;
	}

	/* 猜你喜欢 */


	.relatedText {

		overflow: hidden;
		display: block;
		height: 52rpx !important;
		line-height: 52rpx;
		padding: 4rpx 0;
	}

	/* 点赞 */

	.likePost {
		position: relative;
		text-align: left;
		margin-top: 30rpx;
	}

	.likePost_title {

		padding: 12px 0 6px;
		font-size: 14px;
		overflow: hidden;
		justify-content: center;
		font-weight: 300;
	}

	.likePost_title .left {
		float: left;
		height: 30px;
		padding: 0 8px;

		border-radius: var(--radius);
	}

	.likePost_title .left text {

		line-height: 30px;

	}

	.likePost_title .right {
		float: right;
		line-height: 30px;
		font-size: 12px;
		color: #bbbbbb !important;
	}

	.likePost_img {

		margin-top: 5px;
		margin-bottom: 5px;
		overflow: hidden;

	}

	.likePost_img .right {
		float: right;
		margin-right: 0;

		overflow: hidden;
		display: block;
		text-align: center;
		font-size: 12px;
		padding: 0 10rpx;
		min-width: 80rpx;
		height: 50rpx;
		line-height: 50rpx;
		margin: 6rpx;
		border-radius: var(--radius);
		color: #f7f7f7 !important;
		font-weight: 300;
	}



	.like-gravatar {
		margin-top: 4px;
		height: 50rpx;
		width: 50rpx;
		margin-right: -10rpx;
		border-radius: 50px;
	}

	/* 评论 */

	.comment-container {

		overflow: visible;
	}

	.comment-num {
		font-size: 28rpx;
		font-weight: 400;
		color: #959595;
	}

	.comment {
		margin: 24rpx 0;
		padding: 24rpx 0;
	}

	.comment-children {
		border-top: 1px solid var(--ui-Border);
		margin-left: 40rpx;
	}

	.comment-user {
		display: flex;
		align-items: center;


		font-weight: 500;
		margin-bottom: 10rpx;
	}

	.comment-username {

		font-weight: 500;
	}

	.comment-gravatar {
		width: 50rpx;
		height: 50rpx;
		display: block;
		border-radius: 50px;
		background-color: #ccc;
	}

	.comment-user-right {
		flex: 1;
		display: flex;
		justify-content: space-between;
	}


	.replay-user {

		margin: 10rpx 0;
		margin-left: 86rpx;
	}

	.comment-user image {
		margin-right: 16rpx;
	}

	.comment-summary {

		margin-left: 86rpx;
	}

	.comment-repaly {
		color: #757575;
		font-size: 30rpx;
		line-height: 1.6rem;
		margin-bottom: 10rpx;
	}

	.comment-post {
		color: #757575;
		font-size: 30rpx;
		line-height: 1.6rem;
		margin-bottom: 50rpx;
		text-align: center;
		display: flex;
		flex-direction: row;
	}

	.comment-reply-title {
		font-size: 40rpx;
		line-height: 1.5;
		color: #21759b;
	}

	.foot {
		position: fixed;
		display: block;
		z-index: 90;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0 24rpx;
		overflow: hidden;
	}

	.foot_memu {

		display: flex;
		align-items: center;
	}



	.foot_memu .icon {
		display: block;

		height: 64rpx;
		line-height: 64rpx;

		padding: 0 0 0 24rpx;
		margin: 18rpx 0 0 22rpx;

		overflow: hidden;
		position: relative;
	}

	.foot_memu .icon text {

		font-size: 28px;
	}

	.foot_memu .comment {
		display: block;
		width: 340rpx;
		height: 64rpx;
		line-height: 64rpx;
		font-size: 14px;
		padding: 0 24rpx;
		margin: 18rpx 33rpx 0 10rpx;
		border-radius: 30px;
		overflow: hidden;
		position: relative;
	}







	.ui-modal-btn {

		padding: 24rpx 48rpx !important;
		text-align: right !important;
	}

	.comment-box {
		width: 750rpx;
		min-height: 100rpx;
	}

	.comment_input_box {

		display: flex;
		align-items: center;
	}

	.comment_btn {

		padding: 12rpx 24rpx;
		border-radius: 50px;
		float: right;
		margin: 0 24rpx 24rpx 0;
	}

	.comment_btn_button {
		position: absolute;
		bottom: 24rpx !important;
		right: 24rpx !important;
		width: 64rpx;
		height: 64rpx;
		opacity: 0;
	}

	.comment-input {
		margin: 24rpx;
		width: 702rpx;
		min-height: 60rpx;

		padding: 24rpx;
	}


	.ui-btn {

		position: absolute;
		bottom: 0;
		right: 0;
		width: 64rpx;
		height: 64rpx;
		opacity: 0;
	}

	.bottomlink {
		margin-top: 48rpx;
		width: 100%;
		padding: 12px;
		border-radius: var(--radius);
		box-shadow: rgba(12, 12, 12, 0.03) 0px 2px 15px -5px;


	}

	.bottomlink .left {

		float: left;

	}

	.bottomlink .right {

		float: right;

	}

	/* tab栏更多图标 */



	.gravatarImg {
		height: 50rpx;
		width: 50rpx;
	}

	.more-comment {
		font-size: 30rpx;
		line-height: 1.8rem;
		margin-bottom: 50rpx;
		text-align: center;
		margin-top: 20rpx;
	}

	.img-plus {
		width: 48rpx !important;
		height: 48rpx !important;
		margin-right: 10px;
		margin-top: 10rpx;
	}

	/*  comment end  */

	.relatedNavigator {
		color: #21759b !important;
	}

	.sharedetail {
		position: relative;
		text-align: center;
		margin-top: 30rpx;
	}

	.share-button {
		opacity: 0;
		position: absolute;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		top: 0;
		left: 0;
	}

	.share-title {
		color: #333;
		font-size: 30rpx;
		padding-top: 20rpx;
	}

	.copy-button {
		color: #296fd0 !important;
	}

	.showMessage {
		text-align: center;
		font-weight: normal;
		font-size: 26rpx;
		line-height: 40rpx;
		color: sandybrown;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}

	.ditail-copyright {
		font-size: 26rpx;
		line-height: 1.2;
		font-weight: normal;
		text-align: center;
		color: #999;
		margin-top: 20rpx;
		margin-bottom: 180rpx;
	}

	.wxParse-a {
		color: #21759b;
	}

	.wxParse-code {
		padding: 2px 4px !important;
		font-size: 90% !important;
		border-radius: 3px !important;
		color: #eb2226 !important;
		background-color: #f9f2f4 !important;
		font-family: Source Code Pro, Consolas, Menlo, Monaco, Courier New, monospace !important;
	}

	/*   menu-box      */

	.menu-box {
		position: relative;
		height: 80px;
		padding: 5px 0;
		box-sizing: border-box;
		margin-bottom: -80px;
	}

	.menuBackground {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: transparent;
		z-index: 99;
	}

	.iconList {
		text-align: center;
		border-top: 1px solid #eee;
	}

	.iconLine {
		margin-top: 20rpx;
	}

	.iconLine text {
		font-size: 24rpx;
		text-align: center;
		color: #959595;
	}

	.iconLine view {
		text-align: center;
	}

	.text-center {
		text-align: center;
	}

	.img-menu {
		width: 50rpx;
		height: 50rpx;
		display: inline-block;
		text-align: center;
	}

	.img-menu2 {
		width: 60rpx;
		height: 60rpx;
		display: inline-block;
		text-align: center;
	}

	.emoji-move-in {
		-webkit-animation: emoji-move-in 0.3s forwards;
		animation: emoji-move-in 0.3s forwards;
	}

	.emoji-move-out {
		-webkit-animation: emoji-move-out 0.3s forwards;
		animation: emoji-move-out 0.3s forwards;
		display: none;
	}

	.no-emoji-move {
		-webkit-animation: none;
		animation: none;
	}

	@-webkit-keyframes emoji-move-in {
		0% {
			margin-bottom: -80px;
		}

		100% {
			margin-bottom: 0;
		}
	}

	@keyframes emoji-move-in {
		0% {
			margin-bottom: -80px;
		}

		100% {
			margin-bottom: 0;
		}
	}

	@-webkit-keyframes emoji-move-out {
		0% {
			margin-bottom: 0;
		}

		100% {
			margin-bottom: -80px;
		}
	}

	@keyframes emoji-move-out {
		0% {
			margin-bottom: 0;
		}

		100% {
			margin-bottom: -80px;
		}
	}

	/*   end menu-box  */

	.canvas-box {
		position: fixed;
		top: 999999rpx;
		left: 0;
	}


	/* 音频 */

	.flex {
		display: flex;
		justify-content: space-between;
	}

	.audioPlayer {
		width: 100%;
		margin-bottom: 32rpx;
		box-sizing: border-box;
	}

	.player {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.audioControls {
		width: 100%;
		height: 184rpx;
		background: #fdfdfd;
		border-radius: 4rpx;
		border: 2rpx solid #eee;
		box-sizing: border-box;
	}

	.audio_left {
		width: 180rpx;
		height: 180rpx;
		position: relative;
	}

	.audio_img {
		width: 180rpx !important;
		height: 180rpx !important;
		border-top-left-radius: 4rpx;
		border-bottom-left-radius: 4rpx;
		display: block;
	}

	.audio_btn {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 999;
	}

	.audio_btn_icon {
		width: 80rpx !important;
		height: 80rpx !important;
		display: block;
	}

	.audio_right {
		padding: 0 36rpx 0 16rpx;
		width: 340rpx;
		height: 180rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.audio_title {
		font-size: 15px;
		font-weight: 600;
		line-height: 1;
		width: 340rpx;
		text-align: left;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.audio_singer {
		font-size: 12px;
		color: #959595;
		line-height: 1;
		width: 340rpx;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		margin: 12rpx 0 -16rpx;
	}

	.slider slider {
		width: 336rpx;
	}

	.time_box {
		width: 340rpx;
		display: flex;
		justify-content: space-between;
		line-height: 1;
		color: #959595;
		font-size: 12px;
		margin-top: -20rpx;
		overflow: hidden;
	}

	.wxParse-audio {
		display: none;
	}

	/* 音频 */



	/* 小程序广告 */
	.ad-box {
		margin: 24rpx;

		overflow: hidden;
		border-radius: 12rpx;
	}

	.ad-box-video {
		/* padding: 40rpx 40rpx 0;*/
		margin: 24rpx;

		overflow: hidden;
		position: relative;
		z-index: 1;
		border-radius: 12rpx;
	}

	ad {
		z-index: 1 !important;

	}

	video {
		z-index: 1 !important;

	}


	/* “阅读更多”样式 */

	.detail-read-more {
		width: 100%;
		position: absolute;
		bottom: 0;
	}

	.detail-readmore-mask {
		height: 200rpx;
		width: 100%;
		border-radius: var(--radius);
		box-sizing: border-box;
		background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 80%);
	}

	.detail-readmore-btn {
		width: 100%;
		height: 64rpx;
		font-size: 30rpx;
		font-weight: 500;
		line-height: 1;
		text-align: center;
		color: var(--ui-BG-Main) !important;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	.detail-readmore-btn::after {
		content: "";
		display: inline-block;
		border: solid rgb(75, 75, 75);
		border-width: 0 0 2px 2px;
		padding: 3px;
		position: absolute;
		right: 50%;
		bottom: 6rpx;
		transform: translateX(4px) rotate(-45deg);
		opacity: 0.6;
	}
</style>
