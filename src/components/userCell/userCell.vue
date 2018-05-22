<template>
  <div class="cell">
    <router-link :to="link">
      <div class="cell-l">
        <img :src="iconUrl" class="cell-icon" v-show="iconUrl" alt="">
        <span class="text">{{text}}</span>
      </div>
      <div class="cell-r">
        <span class="text" v-show="desc" style="vertical-align: sub;">{{desc}}</span>
        <span class="badg" v-show="badg" style="vertical-align: middle;">{{badg}}</span>
        <span class="avatar" v-show="avatar"><img :src="avatar" alt=""></span>
        <img v-show="more" src="./more.png" class="more" alt="">
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    link: String,
    iconUrl: String,
    text: String,
    desc: String,
    badg: String,
    avatar: String,
    more: Boolean
  },
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cell
  background: #fff
  position: relative
  a
    display: flex
    justify-content: space-between
    height: 48px
    line-height: 48px
    margin: 0 10px
    border-bottom: 1px solid #f5f5f5
    .cell-l
      color: #555
      .cell-icon
        width: 21px
        height: 21px
        vertical-align: middle
      span
        font-size: 14px
        margin-left: 10px
    .cell-r
      .badg
        display: inline-block
        color: #fff
        width: 18px
        height: 18px
        line-height: 19px
        text-align: center
        background: red
        border-radius: 50%
      .avatar
        position: absolute
        top: 5px
        right: 28px
        width: 40px
        height: 40px
        border-radius: 50%
        overflow: hidden
        img
          width: 100%
      .more
        width: 18px
        height: 18px
        vertical-align: middle
</style>
