<template>
    <div class="share-wrapper">
      <transition name="fold">
          <div class="share" v-show="shareshow">
            <div class="shareTitle">分享到</div>
            <div class="shareMenus">
                <mt-swipe :auto="0" :showIndicators="false" style="height: 180px;">
                    <mt-swipe-item>
                        <div class="shareMenu">
                            <i class="iconfont icon-gongzhonghao"></i><br>
                            <span class="name">微信</span>
                        </div>
                        <div class="shareMenu">
                            <i class="iconfont icon-pengyouquan"></i><br>
                            <span class="name">朋友圈</span>
                        </div>
                        <div class="shareMenu">
                            <i class="iconfont icon-qq"></i><br>
                            <span class="name">QQ</span>
                        </div>
                        <div class="shareMenu">
                            <i class="iconfont icon-qqkongjian"></i><br>
                            <span class="name">QQ空间</span>
                        </div>
                        <div class="shareMenu">
                            <i class="iconfont icon-weibo"></i><br>
                            <span class="name">微博</span>
                        </div>
                         <div class="shareMenu">
                            <i class="iconfont icon-youdaoyunbiji"></i><br>
                            <span class="name">有道云</span>
                        </div>
                        <div class="shareMenu">
                            <i class="iconfont icon-yinxiangbiji"></i><br>
                            <span class="name">印象笔记</span>
                        </div>
                        <div class="shareMenu">
                            <i class="iconfont icon-tencent-weibo"></i><br>
                            <span class="name">腾讯微博</span>
                        </div>
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <div class="shareMenu">
                            <i class="iconfont icon-fuzhilianjie"></i><br>
                            <span class="name">复制链接</span>
                        </div>
                        <div class="shareMenu">
                            <i class="iconfont icon-androidgengduo"></i><br>
                            <span class="name">更多</span>
                        </div>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="button" @click="hideShare">取消</div>
          </div>
      </transition>
      <transition name="fade">
        <div class="mask" v-show="shareshow" @click="hideShare"></div>
      </transition>
    </div>
</template>

<script>
export default {
  data() {
    return {
      shareshow: false
    }
  },
  methods: {
    showShare() {
      this.shareshow = true
    },
    hideShare() {
      this.shareshow = false
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.share-wrapper
  width: 100%
  .share
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 300px
    background: #FAFAFA
    z-index: 50
    border-radius: 3px
    transform: translate3d(0, 0, 0)
    &.fold-enter-active, &.fold-leave-active
      transition: all 0.5s
    &.fold-enter, &.fold-leave-active
      transform translate3d(0, 100%, 0)
    .shareTitle
      width: 100%
      height: 25px
      text-align: center
      font-size: 16px
      margin: 10px auto
    .shareMenus
      position: relative
      top: 5px
      width: 100%
      font-size: 0
      text-align: left
      .shareMenu
        display: inline-block
        padding-top: 15px
        z-index: 50
        width: 25%
        margin-bottom: 30px
        text-align: center
        i
          font-size: 24px
          padding: 10px
          border-radius: 50%
          color: #ffffff
          &.icon-gongzhonghao
            background: #64c654
          &.icon-pengyouquan
            background: #5BC1A3
          &.icon-qq
            background: #286bc4
          &.icon-qqkongjian
            background: #F4BD43
          &.icon-weibo
            background: #DA4436
          &.icon-youdaoyunbiji
            background: #38A3EA
          &.icon-yinxiangbiji
            background: #5DB346
          &.icon-tencent-weibo
            background: #3EA1D9
          &.icon-fuzhilianjie
            background: #EF974D
          &.icon-androidgengduo
            background: #AEB7C0
        .name
          display: block
          position: relative
          top: 20px
          font-size: 16px
          text-align: center
    .button
      position: relative
      height: 40px
      width: 80%
      bottom: 5px
      margin: 15px auto
      text-align: center
      line-height: 40px
      font-size: 16px
  .mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, 0.6)
    z-index: 40
    opacity: 1
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-active
      opacity: 0
</style>
