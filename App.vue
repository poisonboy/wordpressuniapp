<script>
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
	import store from '@/ui/store'
	export default {
		data() {
			return {}
		},
		onThemeChange: function(res) {
			console.log('onThemeChange', res);
			if (store.state.sys_theme == 'auto') {
				store.commit('setStatusStyle', res.theme == 'light' ? 'dark' : 'light');
			}
		},
		onLaunch: function() {

			//调用API从本地缓存中获取数据
	
		},
		globalData: {


		}
	};
</script>
<style lang="scss">
	/*每个页面公共css */
	@import '@/ui/scss/ui';
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


	page {
		--radius: 12rpx;
	}


	ad {
		border-radius: var(--radius);
	}

	image {
		border-radius: var(--radius);
	}

	.sticky-list-item {
		overflow: hidden;
		display: block;
		height: 60rpx !important;
		line-height: 60rpx;
		max-height: 60rpx;
		padding: 4rpx 0;
	}

	.dot {
		float: left;
		width: 8rpx;
		height: 8rpx;
		font-size: 0;
		margin: 22rpx 12rpx 10rpx 16rpx;
	}

	.ui-BG-card {
		margin: 24rpx;
		padding: 24rpx;
		border-radius: var(--radius);
		box-shadow: rgba(12, 12, 12, 0.03) 0px 2px 15px -5px;

	}

	.heading-3 {
		padding-top: 10rpx !important;
		margin: 0 0 10rpx !important;

	}

	.header {
		padding: 50rpx 0;
		text-align: center;
		font-weight: normal;
		font-size: 30rpx;
		line-height: 40rpx;

		border-bottom: 2rpx solid #ededed;
		margin-bottom: 8rpx;
	}

	.wxParse-p {
		margin-top: 30rpx;
	}

	.loadingmore {
		margin-top: 24rpx;
		text-align: center;
		margin-bottom: 24rpx;
	}

	.more-button {
		font-size: 0.785714286rem;
		font-weight: normal;
		color: #959595;
		background-color: #eee;
		background-repeat: repeat-x;
		margin-top: 30rpx;
		width: 240rpx;
		border-radius: 300rpx;
	}

	.more-button::after {
		border: none;
	}

	.no-more {
		color: #757575;
		font-size: 30rpx;
		line-height: 1.8rem;
		margin-bottom: 15rpx;
		text-align: center;
		margin-top: 15rpx;
	}

	/* 文章列表样式 */



	.post-item {
		display: flex;

		overflow: hidden;
	}

	.post-img {
		width: 202.5rpx;
		height: 135rpx;
		border-radius: 12rpx;
		background-color: #959595;
	}

	.post-desc {
		flex: 1;
		margin-right: 24rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.post-title {
		height: 80rpx;
		margin-bottom: 20rpx;
	}

	.post-title>text {

		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.post-data {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.post-data>image {
		width: 24rpx;
		height: 24rpx;
		margin-right: 6rpx;
	}

	.post-data>text {

		margin-right: 32rpx;

	}

	/*common list end */

	.showerror {
		text-align: center;
		font-weight: normal;
		font-size: 30rpx;
		line-height: 40rpx;
		color: #757575;
		margin-top: 100rpx;
	}

	.errortext {
		margin-top: 50rpx;
		table-layout: center;
	}

	.copyright {
		font-size: 26rpx;
		line-height: 1.6;
		font-weight: 400;
		text-align: center;
		color: #c4c4c4;
		margin-top: 48rpx;
		padding-bottom: 80rpx;
	}

	.common-gap {
		width: 100%;
		height: 24rpx;
		background-color: #f5f7f7;
	}

	/* 进度条 */

	.sk-three-bounce {
		margin: 20rpx auto;
		width: 200rpx;
		text-align: center;
	}

	.sk-three-bounce .sk-child {
		width: 30rpx;
		height: 30rpx;

		border-radius: 100%;
		display: inline-block;
		-webkit-animation: sk-three-bounce 1.4s ease-in-out 0s infinite both;
		animation: sk-three-bounce 1.4s ease-in-out 0s infinite both;
	}

	.sk-three-bounce .sk-bounce1 {
		-webkit-animation-delay: -0.32s;
		animation-delay: -0.32s;
	}

	.sk-three-bounce .sk-bounce2 {
		-webkit-animation-delay: -0.16s;
		animation-delay: -0.16s;
	}

	@-webkit-keyframes sk-three-bounce {

		0%,
		80%,
		100% {
			-webkit-transform: scale(0);
			transform: scale(0);
		}

		40% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}

	@keyframes sk-three-bounce {

		0%,
		80%,
		100% {
			-webkit-transform: scale(0);
			transform: scale(0);
		}

		40% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}

	/* 登录框 */

	.login-popup .zan-popup__container {
		background-color: transparent;
	}

	.login-popup-wrapper {
		margin: 0 60rpx;

		overflow: hidden;
		border-radius: var(--radius);
	}

	.logintips {
		color: rgb(124, 124, 124);
		font-size: 24rpx;
		padding: 0 48rpx;
	}

	.login-popup button {
		background-color: transparent;
		padding: 0;
	}

	.login-popup .login-inner {

		padding: 48rpx;
	}

	.login-inner {
		display: flex;
	}

	.login-inner .avatar {
		width: 50px;
		height: 50px;
		margin-right: 10px;
		flex-shrink: 0;
		border-radius: 500px;
	}

	.login-inner .close-btn {
		width: 20px;
		height: 20px;
	}

	.login-inner .username {

		font-size: 32rpx;
		font-weight: 500;
		display: flex;
		align-items: center;
	}

	.login-inner .username text {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 32rpx;
	}

	.login-btn-box {
		display: flex;
		border-top: 1px solid var(--ui-TC-3);
	}

	.login-btn-box button {
		width: 50%;
		border-radius: 0;
		font-size: 15px;
		line-height: 3;

	}

	.login-btn-box button:first-child {
		border-right: 1px solid var(--ui-TC-3);
	}

	.login-btn-box button::after {
		border: none;
	}

	/* 弹窗按钮 */

	.popup-btn {
		display: flex;
		width: 100%;
		height: 35px;
		line-height: 35px;
		font-size: 14px;
		text-align: left;
		border: 0;
		border-radius: 0;
		background-color: #fff;
	}

	.popup-btn .button-main {
		flex-grow: 1;
		overflow: hidden;
	}

	.popup-btn .go-popup {
		display: flex;
		align-items: center;
	}

	.popup-btn .go-popup image {
		width: 15px;
		height: 15px;
	}

	/* 弹窗 */

	.login-popup .zan-popup__mask {
		z-index: 11;
	}

	.login-popup .zan-popup__container {
		z-index: 12;
	}

	/* 弹窗按钮 */

	.popup-btn {
		display: flex;
		width: 100%;
		height: 35px;
		line-height: 35px;
		font-size: 14px;
		text-align: left;
		border: 0;
		border-radius: 0;
		background-color: #fff;
	}

	.popup-btn .button-main {
		flex-grow: 1;
		overflow: hidden;
	}

	.popup-btn .go-popup {
		display: flex;
		align-items: center;
	}

	.popup-btn .go-popup image {
		width: 15px;
		height: 15px;
	}

	/* 弹窗 */

	.login-popup .zan-popup__mask {
		z-index: 998;
	}

	.login-popup .zan-popup__container {
		z-index: 999;
	}

	.zan-popup {
		visibility: hidden
	}

	.zan-popup--show {
		visibility: visible
	}

	.zan-popup__mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
		background: rgba(0, 0, 0, .7);
		display: none
	}

	.zan-popup__container {
		position: fixed;
		left: 50%;
		top: 50%;
		background: #fff;
		transform: translate3d(-50%, -50%, 0);
		transform-origin: center;
		transition: all .4s ease;
		z-index: 11;
		opacity: 0
	}

	.zan-popup--show .zan-popup__container {
		opacity: 1
	}

	.zan-popup--show .zan-popup__mask {
		display: block
	}





	/* 清除浮动通用代码 */

	.clearfix::after {
		content: '.';
		clear: both;
		display: block;
		height: 0;
		visibility: hidden;
	}

	.clearfix {
		zoom: 1;
	}

	.ditail-copyright {
		font-size: 26rpx;
		line-height: 1.2;
		font-weight: normal;
		text-align: center;
		color: #999;
		margin-top: 20rpx;
		margin-bottom: 120rpx;
	}
</style>
