<template>
  <transition name="slide">
    <div class="artwork-detail">
      <div class="video-wrapper" v-html="video">
        {{video}}
      </div>
      <div class="tab">
        <div class="tab-item">
          <router-link :to="{path: '/artwork/' + artworkDetail._id}" replace exact>简介</router-link>
        </div>
        <div class="tab-item">
          <router-link :to="{path: '/artwork/' + artworkDetail._id + '/ratings'}" replace>评论</router-link>
        </div>
      </div>
      <router-view :artwork="artworkDetail"></router-view>
    </div>
  </transition>
</template>
<script>
import api from '../api'
export default {
  data() {
    return {
      id: '',
      video: '',
      artworkDetail: {}
    }
  },
  computed: {
  },
  created() {
    api.getArtworkDetail({
      params: {
        id: this.$route.params.id
      }
    })
      .then(res => {
        console.log(res.data.artwork)
        this.artworkDetail = res.data.artwork
        this.video = '<video width="100%" height="240" controls poster="http://192.168.0.102:3000/' + res.data.artwork.imageUrl + '" ><source src="http://192.168.0.102:3000/api/play?fn=' + res.data.artwork.videoUrl + '" type="video/mp4">您的浏览器不支持 video 标签。</video>'
      })
  },
  watch: {
    '$route' (to, from) {
      api.getArtworkDetail({
        params: {
          id: this.$route.params.id
        }
      })
        .then(res => {
          console.log(res.data.artwork)
          this.artworkDetail = res.data.artwork
          this.video = '<video width="100%" height="240" controls poster="http://192.168.0.102:3000/' + res.data.artwork.imageUrl + '" ><source src="http://192.168.0.102:3000/api/play?fn=' + res.data.artwork.videoUrl + '" type="video/mp4">您的浏览器不支持 video 标签。</video>'
        })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"
  .artwork-detail
    position: absolute
    top: 50px
    bottom: 0px
    width: 100%
    .video-wrapper
      width: 100%
      height: 250px
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height 40px
      color: #000
      box-shadow: 0px 1px 10px rgba(7, 17, 27, 0.1)
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)
    &.slide-enter-active
      transition all 0.5s
    &.slide-enter
      transform translate3d(100%, 0, 0)
</style>
