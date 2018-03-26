<template>
  <div class="category">
    <button
    type="button"
    class="btn"
    @click="showModal">
      Open Modal!
    </button>
    <cube-button @click="showAlert">Dialog - type</cube-button>
    <modal class="popup"
      v-show="isModalVisible"
      @close="closeModal"
      >
      </modal>
  </div>
</template>
<script>
import modal from '../components/dialog/dialog'
export default {
  data () {
    return {
      isModalVisible: false
    }
  },
  components: {
    modal
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
    }
  }
}
</script>
<style  lang="stylus" rel="stylesheet/stylus">
.category
  position: absolute
  top: 100px
  bottom: 0px
  width: 100%
  .popup
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, .4)
</style>
