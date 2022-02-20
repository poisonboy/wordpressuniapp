<template>
    <block>
        <ui-sys title="主题">
            <view class="ui-container">
                <ui-title title="主题" depth="2" isIcon />
                <ui-change-theme ui="radius border" />

                <ui-title title="字号" depth="2" isIcon />
                <ui-text-size ui="radius border" />
            </view>
        </ui-sys>
    </block>
</template>

<script>
const app = getApp();
export default {
    data() {
        return {};
    },
    onLoad() {},
    methods: {}
};
</script>
<style lang="scss">
.change-theme {
    .item {
        padding: 10rpx;
        .ui-BG {
            border-radius: 10rpx;
            display: flex;
            padding: 20rpx;
            flex-direction: column;
        }
    }
}
</style>
