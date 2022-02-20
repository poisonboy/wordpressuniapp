<template>
    <block>
        <ui-sys :title="title" :bg="bg" :img="bgImg" :navBg="navBg" :loading="loading" :tabbar="tabbar" :footer="footer">
            <view :class="'ui-container ' + (title ? '' : 'navbar')">
                <ui-title title="简介" depth="2" isIcon />
                <view class="paragraph">
                    <text>ColorUI提供</text>
                    <ui-code :content="code" />
                    <text>组件来控制页面的表现，内嵌ColorUI的交互反馈(模态框，轻提示等)，主题样式，页面加载等，是每个页面必须有的组件。</text>
                </view>

                <ui-title title="操作" depth="2" isIcon />
                <ui-menu ui="border radius">
                    <ui-menu-item title="背景图" isAction>
                        <ui-switch slot="action" :checked="isBg" @change="isBgChange" />
                    </ui-menu-item>
                    <ui-menu-item title="标题栏背景" isAction>
                        <ui-switch slot="action" :checked="isNavBg" @change="isNavBgChange" />
                    </ui-menu-item>
                    <ui-menu-item title="底部tabbar" isAction>
                        <ui-switch slot="action" :checked="tabbar" @change="isTabBarChange" />
                    </ui-menu-item>
                    <ui-menu-item title="底部版权" isAction>
                        <ui-switch slot="action" :checked="footer" @change="isFooterChange" />
                    </ui-menu-item>
                    <ui-menu-item title="页面加载" isAction>
                        <button class="ui-btn border sm" slot="action" @tap="isLoader">
                            <text class="_icon-loader icon-spin" />
                            <text>加载</text>
                        </button>
                    </ui-menu-item>
                </ui-menu>
            </view>
        </ui-sys>
    </block>
</template>

<script>
const app = getApp();
export default {
    data() {
        return {
            title: '系统',
            bg: '',
            bgImg: '',
            navBg: 'bg-blur',
            loading: 'auto',
            tabbar: false,
            footer: true,
            isBg: false,
            isNavBg: false,
            code: '<ui-sys></ui-sys>'
        };
    },
    methods: {
        //启用背景图
        isBgChange(e) {
            let title = '系统';
            let bg = '';
            let bgImg = '';
            if (e.detail) {
                title = '';
                bg = 'bg-img';
                bgImg = '/static/static/img/4put2.png';
            }

            this.setData({
                isBg: e.detail,
                bg: bg,
                title: title,
                bgImg: bgImg
            });
        },

        // 标题栏背景色
        isNavBgChange(e) {
            let navBg = 'bg-blur';

            if (e.detail) {
                navBg = 'bg-red';
            }

            this.setData({
                isNavBg: e.detail,
                navBg: navBg
            });
        },

        //开启TabBar
        isTabBarChange(e) {
            this.setData({
                tabbar: e.detail
            });
        },

        //开启底部版权
        isFooterChange(e) {
            this.setData({
                footer: e.detail
            });
        },

        //加载
        isLoader() {
            let _this = this;

            _this.setData({
                loading: true
            });

            setTimeout(() => {
                _this.setData({
                    loading: false
                });
            }, 30000);
        }
    }
};
</script>
<style lang="scss">
.navbar {
    margin-top: 240rpx;
}
</style>
