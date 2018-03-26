<template>
  <div class="artwork">
    <router-link :to="{path: '/artwork/' + artwork._id}">
      <div class="content-wrapper">
        <div class="poster">
          <img :src="imageUrl" width="100%" height=""/>
        </div>
        <div class="title">{{artwork.name}}</div>
        <div class="sort"><span>电影•科幻</span></div>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    artwork: Object
  },
  computed: {
    imageUrl() {
      return 'http://192.168.1.102:3000/' + this.artwork.imageUrl
    }
  },
  created() {},
  data () {
    return {}
  }
}
</script>
<style  lang="stylus" rel="stylesheet/stylus">
  .artwork
    flex: 0 1 auto
    width: 45%
    margin: 18px
    height: 380px
    background-color: rgb(255, 255, 255)
    border-radius: 12px
    font-size: 0
    .poster
      width: 100%
      height: 200px
      img
        width:100%
        height:100%
        border-top-left-radius: 12px
        border-top-right-radius: 12px
        padding: 0
    .title
      height: 80px
      text-align: left
      padding: 20px 20px 0px 20px
      font-size: 30px
      line-height: 40px
      overflow: hidden
      display: box
      text-overflow: ellipsis
      display: -webkit-box
      -webkit-box-orient: vertical
      -webkit-line-clamp: 2
    .sort
      height: 70px
      padding: 10px 20px 0px 20px
      span
        display: block
        height: 70px
        font-size: 28px
        line-height: 70px
        text-align: left
        color: #7e8c8d
</style>
