<template>
  <div class="home">
    <cube-scroll  ref="scroll" :data="items" :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
      <artwork-list :artworkList="artworkList" class="artwork-list"></artwork-list>
    </cube-scroll>
  </div>
</template>
<script>
import artworkList from '../components/artworkList/artworkList'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      items: [],
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
      }
    }
  },
  components: {
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
  mounted() {
    this._fetchData()
    this.items = this.$store.state.artwork.artworkList
  },
  methods: {
    _fetchData() {
      this.$store.dispatch('getArtworks')
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
    }
  }
}
</script>
<style  lang="stylus" rel="stylesheet/stylus">
.home
  position: absolute
  top: 50px
  bottom: 60px
  width: 100%
  background-color: rgb(243, 243, 243)
</style>
