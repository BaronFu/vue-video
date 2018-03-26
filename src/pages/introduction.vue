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
        <i class="iconfont icon-down"></i>
        <div>缓存</div>
      </div>
      <div class="block">
        <i class="iconfont icon-fenxiang"></i>
        <div class="name">23</div>
      </div>
    </div>
  </div>
</template>
<script>
import '../assets/iconfont/iconfont.css'
import api from '../api'
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
      collectionClass: 'icon-shoucang1'
    }
  },
  computed: {
    likeClass() {
      return this.artwork.isLike ? 'icon-zan' : 'icon-zan1'
    }
  },
  methods: {
    like() {
      if (!this.artwork.isLike) {
        api.like({
          userId: this.artwork.user_id,
          artId: this.artwork._id
        })
          .then((res) => {
            console.log(res)
          })
        this.artwork.isLike = true
        this.artwork.likeNum++
      } else {
        api.cancelLike({
          userId: this.artwork.user_id,
          artId: this.artwork._id
        })
          .then((res) => {
            console.log(res)
          })
        this.artwork.isLike = false
        this.artwork.likeNum--
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
          font-size: 25px
        .name
          font-size: 12px
</style>
