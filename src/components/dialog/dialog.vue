<template>
<transition name="dialog">
  <div class="mc-dialog-mask">
    <div class="mc-dialog-wrapper">
      <div class="mc-dialog-container mc-dialog-container-in">
        <div class="mc-dialog-inner">
            <div class="mc-dialog-title">提示</div>
            <div class="mc-dialog-text">欢迎使用mvc-vue</div>
        </div>
        <div class="mc-dialog-buttons">
            <span class="mc-dialog-button mc-dialog-button-bold" @click="$emit('close')">
                确定
            </span>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.mc-dialog-mask
  position fixed
  z-index: 9888
  top: 0px
  left： 0px
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.7)
  transition: opacity .3s ease
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif
  -webkit-user-select: none
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0)

  .mc-dialog-wrapper
    width: 100%
    vertical-align: middle

  .mc-dialog-container
    width: 500px
    position: absolute
    top: 50%
    left: 50%
    -webkit-transform: translate3d(-50%, -50%, 0) scale(1.185);
    background-color: #fff
    border-radius: 26px
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33)
    transition: all .3s ease

    &.mc-dialog-container-in
      display: block
      transform: translate3d(-50%, -50%, 0) scale(1)
      opacity: 1

      .mc-dialog-inner
        position: relative
        padding: 30px
        border-radius: 13px 13px 0 0
        background: rgba(255, 255, 255, .95)

      .mc-dialog-inner:after
          position: absolute
          z-index: 15
          top: auto
          right: auto
          bottom: 0
          left: 0
          display: block
          width: 100%
          height: 2px
          content: ''
          transform: scaleY(.5)
          transform-origin: 50% 100%
          background-color: rgba(0, 0, 0, .2)

      .mc-dialog-title
          font-size: 36px
          font-weight: 500
          text-align: center

      .mc-dialog-title + .mc-dialog-text
          font-family: inherit
          font-size: 28px
          margin: 10px 0 0

      .mc-dialog-buttons
          position: relative
          display: flex
          height: 88px
          justify-content: center

      .mc-dialog-button
          font-size: 34px
          line-height: 88px
          position: relative
          display: block
          overflow: hidden
          box-sizing: border-box
          width: 100%
          height: 88px
          padding: 0 5px
          text-align: center
          white-space: nowrap
          text-overflow: ellipsis
          color: #007aff
          background: rgba(255, 255, 255, .95)
          letter-spacing: 0.5px
          cursor: pointer

      .mc-dialog-button:after
          position: absolute
          z-index: 15
          top: 0
          right: 0
          bottom: auto
          left: auto
          display: block
          width: 1px
          height: 100%
          content: ''
          transform: scaleX(.5)
          transform-origin: 100% 50%
          background-color: rgba(0, 0, 0, .2)

      .mc-dialog-button:first-child
        border-radius: 0 0 0 13px

      .mc-dialog-button:first-child:last-child
          border-radius: 0 0 13px 13px

      .mc-dialog-button:last-child
          border-radius: 0 0 13px 0

      .mc-dialog-button-bold
          font-weight: 600

      .mc-dialog-button:last-child:after
          display: none

.dialog-enter-active, .dialog-leave-active
  transition: opacity .5s

.dialog-enter, .dialog-leave-to
  opacity: 0

</style>
