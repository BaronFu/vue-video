<template>
  <div class="introduction">
    <div class="title">{{artwork.name}}</div>
    <div class="desc"></div>
    <div class="function">
      <div class="block">
        <i class="iconfont" :class="likeClass" @click="like"></i>
        <div class="name">{{artwork.likeNum}}</div>
      </div>
      <div class="block">
        <i class="iconfont" :class="collectionClass" @click="collection"></i>
        <div class="name">{{collectionNum}}</div>
      </div>
      <div class="block">
        <i class="iconfont icon-huangcun"></i>
        <div>缓存</div>
      </div>
      <div class="block">
        <i class="iconfont icon-fengxiang1" @click="share"></i>
        <div class="name">23</div>
      </div>
    </div>
    <popup ref="extendPopup" :content="message"></popup>
    <share ref="share"></share>
  </div>
</template>
<script>
import '../assets/iconfont/iconfont.css'
import api from '../api'
import popup from '../components/popup/popup'
import share from '../components/share/share'
export default {
  props: {
    artwork: {
      type: Object
    }
  },
  data() {
    return {
      isCollection: false,
      collectionNum: 103,
      collectionClass: 'icon-shoucang1',
      message: ''
    }
  },
  components: {
    popup,
    share
  },
  computed: {
    likeClass() {
      return this.artwork.isLike ? 'icon-zan' : 'icon-zan1'
    }
  },
  methods: {
    like() {
      if (!this.artwork.isLike) {
        // 推荐
        api.like({
          userId: this.artwork.user_id,
          artId: this.artwork._id
        })
          .then((res) => {
            console.log(res)
          })
        this.artwork.isLike = true
        this.artwork.likeNum++
        this.message = '成功推荐'
        this.$refs.extendPopup.show()
      } else {
        // 取消推荐
        api.cancelLike({
          userId: this.artwork.user_id,
          artId: this.artwork._id
        })
          .then((res) => {
            console.log(res)
          })
        this.artwork.isLike = false
        this.artwork.likeNum--
        this.message = '取消推荐'
        this.$refs.extendPopup.show()
      }
    },
    collection() {
      if (!this.isCollection) {
        this.isCollection = true
        this.collectionNum++
      } else {
        this.isCollection = false
        this.collectionNum--
      }

      if (this.isCollection) {
        this.collectionClass = 'icon-shoucang'
      } else {
        this.collectionClass = 'icon-shoucang1'
      }
    },
    share() {
      this.$refs.share.showShare()
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .introduction
    position: absolute
    top: 295px
    bottom: 0px
    width: 100%
    .title
      height: 40px
      margin: 15px 15px
      line-height: 20px
      font-size: 14px
      text-align: left

    .function
      width: 100%
      height: 50px
      display: flex

      .block
        flex: 1
        width: 100%
        height: 50px
        line-height: 25px

        .iconfont
          font-size: 22px
        .name
          font-size: 12px
</style>
