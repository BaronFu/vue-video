<template>
  <div class="category">
    <button
    type="button"
    class="btn"
    @click="showModal">
      Open Modal!
    </button>
    <modal class="popup"
    v-show="isModalVisible"
    @close="closeModal"
    >
    </modal>
    <cube-button @click="showAlert">Dialog - type</cube-button>
    <cube-button @click="showBtn">Dialog - btn</cube-button>
    <cube-popup type="extend-popup" :mask="false" ref="myPopup">
      <div class="cube-extend-popup-content">
        成功推荐
      </div>
    </cube-popup>
    <cube-button @click="showPopup('myPopup')">
      Show Popup
    </cube-button>
    <popup ref="extendPopup" :content="message"></popup>
    <cube-button @click="$refs.extendPopup.show()">
      Show Extend Popup
    </cube-button>
    <cube-button
      :inline="true"
      :outline="true"
      :primary="true"
      @click="$refs.tip.show()">Show tip</cube-button>
    <cube-tip ref="tip" direction="top" style="position: relative;left:50px;top:50px;">Tip</cube-tip>
  </div>
</template>
<script>
import modal from '../components/dialog/dialog'
import popup from '../components/popup/popup'
export default {
  data () {
    return {
      isModalVisible: false,
      message: '成功推荐'
    }
  },
  components: {
    modal,
    popup
  },
  methods: {
    showModal() {
      this.isModalVisible = true
    },
    closeModal() {
      this.isModalVisible = false
    },
    showAlert() {
      this.$createDialog({
        type: 'alert',
        title: '我是标题',
        content: '我是内容',
        icon: 'cubeic-alert'
      }).show()
    },
    showBtn() {
      this.$createDialog({
        type: 'confirm',
        icon: 'cubeic-alert',
        title: '我是标题',
        content: '我是内容',
        confirmBtn: {
          text: '确定按钮',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消按钮',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '点击确认按钮'
          }).show()
        },
        onCancel: () => {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '点击取消按钮'
          }).show()
        }
      }).show()
    },
    showPopup(refId) {
      const component = this.$refs[refId]
      component.show()
      setTimeout(() => {
        component.hide()
      }, 1000)
    }
  }
}
</script>
<style  lang="stylus" rel="stylesheet/stylus">
.category
  position: absolute
  top: 50px
  bottom: 0px
  width: 100%
  .popup
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, .4)
   .cube-extend-popup
    .cube-extend-popup-content
      padding: 10px 20px
      border-radius: 5px
      color: #fff
      background-color: rgba(0, 0, 0, .8)
</style>
