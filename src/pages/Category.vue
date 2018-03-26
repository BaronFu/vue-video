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
  </div>
</template>
<script>
import modal from '../components/popup/popup'
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
