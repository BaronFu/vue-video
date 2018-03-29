<template>
    <div class="comments">
        <div class="comments-mask" v-show="isShow" @click="hiddenMask"></div>
        <div class="comments-wrapper">
        <div class="comments-input">
            <cube-input
            v-model="value"
            :autofocus="autofocus"
            :autocomplete="autocomplete"
            :clearable="clearable" @focus="showMask"></cube-input>
        </div>
        <div class="comments-btn">
            <span class="iconfont icon-fasong" @click="comment"></span>
        </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      autofocus: false,
      autocomplete: true,
      clearable: true,
      isShow: false
    }
  },
  methods: {
    showMask () {
      this.isShow = true
    },
    hiddenMask () {
      this.isShow = false
    },
    comment() {
      console.log(this.value)
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.comments
  width: 100%
  .comments-wrapper
    position: fixed
    width: 100%
    height: 50px
    bottom: 0
    left: 0
    z-index: 50
    background-color: #E6E6E6
    .comments-input
      display: inline-block
      width: 70%
      height: 50px
      margin-left: 30px
      background-color: #E6E6E6

    .comments-btn
      display: inline-block
      width: 20%
      height: 50px
      vertical-align: middle
      span
        font-size: 32px
        line-height: 50px
  .comments-mask
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    width: 100%
    z-index: 49
    background: rgba(0, 0, 0, .8)
</style>