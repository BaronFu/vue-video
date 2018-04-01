<template>
  <div class="artwork">
    <router-link :to="{path: '/artwork/' + artwork._id}">
      <div class="content-wrapper">
        <div class="poster">
          <img v-lazy="imageUrl" width="100%" height=""/>
        </div>
        <div class="title">{{artwork.name}}</div>
        <div class="sort">
          <span class="sort-name" v-if="artwork.categoryID">{{artwork.categoryID.name}}</span>
          <span class="sort-more iconfont icon-androidgengduo" @click.prevent="$refs.tip.show()">
            <cube-tip ref="tip" direction="bottom" style="left: 0px; top: 0px">Tip</cube-tip>
          </span>
        </div>
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
  created() {
    console.log(this.artwork)
  },
  data () {
    return {}
  }
}
</script>
<style  lang="stylus" rel="stylesheet/stylus">
  .artwork
    flex: 0 1 auto
    width: 45%
    margin: 9px
    height: 190px
    background-color: rgb(255, 255, 255)
    border-radius: 6px
    font-size: 0
    .poster
      width: 100%
      height: 100px
      img
        width:100%
        height:100%
        border-top-left-radius: 6px
        border-top-right-radius: 6px
        padding: 0
    .title
      height: 40px
      text-align: left
      padding: 10px 10px 0px 10px
      font-size: 15px
      color: #000
      line-height: 20px
      overflow: hidden
      display: box
      text-overflow: ellipsis
      display: -webkit-box
      -webkit-box-orient: vertical
      -webkit-line-clamp: 2
    .sort
      height: 35px
      padding: 5px 10px 0px 10px
      span
        display: inline-block
        height: 35px
        font-size: 14px
        line-height: 35px
        color: #7e8c8d
      .sort-name
        width: 85%
        text-align: left
      .sort-more
        width: 15%
        font-size: 16px
        text-align: right
</style>
