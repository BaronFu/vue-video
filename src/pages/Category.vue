<template>
  <div class="category">
    <cube-scroll  ref="scroll" :data="items" :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
      <artwork-list :artworkList="artworkList" class="artwork-list"></artwork-list>
    </cube-scroll>
  </div>
</template>
<script>
import bubble from '../components/bubble/bubble'
import artworkList from '../components/artworkList/artworkList'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      items: [1, 2, 3, 4, 5, 6, 7],
      options: {
        pullDownRefresh: {
          threshold: 90,
          stop: 40,
          txt: 'Refresh success'
        },
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: 'Load more',
            noMore: 'No more data'
          }
        }
      },
      bubbleY: 0,
      pullDownInitTop: -50,
      beforePullDown: true,
      isPullingDown: false,
      pullDownStyle: '',
      refreshTxt: 'refresh success'
    }
  },
  components: {
    bubble,
    artworkList
  },
  computed: {
    ...mapGetters([
      'artworkList',
      'currentPage',
      'pageNum'
    ])
  },
  created() {
  },
  methods: {
    showModal() {
      this.isModalVisible = true
    },
    closeModal() {
      this.isModalVisible = false
    },
    _reboundPullDown() {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.scroll.finishPullDown()
          this.isPullingDown = false
          resolve()
        }, 600)
      })
    },
    _afterPullDown() {
      setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px`
        this.beforePullDown = true
        this.scroll.refresh()
      }, 100000)
    },
    onPullingDown() {
      // 模拟更新数据
      setTimeout(() => {
        this.$store.dispatch('resetData')
        this._fetchData()
        this.items = this.$store.state.artwork.artworkList
      }, 1000)
    },
    onPullingUp() {
      // 更新数据
      setTimeout(() => {
        if (this.currentPage === this.pageNum) {
          // 如果有新数据
          this._fetchData()
          this.items = this.$store.state.artwork.artworkList
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    },
    _fetchData() {
      this.$store.dispatch('getArtworks')
    }
  }
}
</script>
<style  lang="stylus" rel="stylesheet/stylus">
.category
  position: absolute
  top: 50px
  bottom: 50px
  width: 100%
  background-color: rgb(243, 243, 243)

  .cube-scroll-wrapper
    height: 100%

  .mywrapper
    position: relative
    width: 100%
    height: 200px
    overflow: hidden

    .pulldown-wrapper
      position: absolute
      width: 100%
      left: 0
      display: flex
      justify-content: center
      align-items: center
      transition: all
      .after-trigger
        margin-top: 5px

    .list-wrapper
      position: relative
      z-index: 1
      li
        width: 100%
        height: 50px
        line-height: 50px
</style>
