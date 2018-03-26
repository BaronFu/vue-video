<template>
<transition name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container modal-container-in">
        <div class="modal-header">
          <slot name="header">
              default header
          </slot>
        </div>
        <div class="modal-body">
          <slot name="body">
            default body
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            default footer
            <button class="modal-default-button" @click="$emit('close')">
              OK
            </button>
          </slot>
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
.modal-mask
  position: fixed
  z-index: 3
  top: 0px
  left： 0px
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.7)
  transition: opacity .3s ease
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif
  -webkit-user-select: none
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0)
  .modal-wrapper
    width: 100%
    vertical-align: middle
  .modal-container
    width: 300px
    position: absolute
    top: 50%
    left: 50%
    -webkit-transform: translate3d(-50%, -50%, 0) scale(1.185);
    padding: 20px 30px
    background-color: #fff
    border-radius: 5px
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33)
    transition: all .3s ease
    font-family: Helvetica, Arial, sans-serif
    &.modal-container-in
      display: block
      transform: translate3d(-50%, -50%, 0) scale(1)
      opacity: 1
    .modal-header h3
      margin-top: 0
      color: #42b983
    .modal-body
      margin: 20px 0
    .modal-default-button
      float: right
.modal-enter
  opacity: 0
.modal-leave-active
  opacity: 0
.modal-enter .modal-container,
.modal-leave-active .modal-container
  -webkit-transform: scale(1.1)
  transform: scale(1.1)
</style>
