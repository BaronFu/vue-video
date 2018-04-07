<template>
  <div class="home">
    <cube-scroll  ref="scroll" :data="$store.state.artwork.artworkList" :options="options" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
      <artwork-list :artworkList="artworkList" class="artwork-list"></artwork-list>
    </cube-scroll>
  </div>
</template>
<script>
import artworkList from '../components/artworkList/artworkList'
import { mapGetters } from 'vuex'
import api from '../api'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      options: {
        // 滚动条设置为隐藏,不用滚动条就去掉scrollbar
        scrollbar: {
          fade: true
        },
        pullDownRefresh: {
          threshold: 90,
          stop: 40,
          txt: '刷新成功'
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
      'artworkList'
    ])
  },
  created() {
  },
  mounted() {
    if (this.$store.state.artwork.artworkList.length === 0) {
      this._fetchData()
    }
  },
  methods: {
    _fetchData() {
      this.$store.dispatch('getArtworks', {
        limit: 6,
        operating: 'Loading',
        lastTime: this.$store.state.artwork.lastTime,
        nextTime: this.$store.state.artwork.nextTime
      })
    },
    onPullingDown() {
      setTimeout(() => {
        api.getArtworks({
          params: {
            limit: 6,
            operating: 'Refresh',
            lastTime: this.$store.state.artwork.lastTime,
            nextTime: this.$store.state.artwork.nextTime
          }
        })
          .then(res => {
            if (res.data.data.artworks.length !== 0) {
              // 如果有新数据
              this.$store.commit('UNSHIFT_ARTWORKS_DATA', res.data.data.artworks)
              this.$store.commit('SET_LAST_TIME')
              this.$store.commit('SET_NEXT_TIME')
            } else {
              // 如果没有新数据
              this.$refs.scroll.forceUpdate()
              let instance = Toast({
                message: '已是最新',
                position: 'middle',
                duration: 5000
              })
              setTimeout(() => {
                instance.close()
              }, 2000)
            }
          })
      }, 1000)
    },
    onPullingUp() {
      setTimeout(() => {
        api.getArtworks({
          params: {
            limit: 6,
            operating: 'Loading',
            lastTime: this.$store.state.artwork.lastTime,
            nextTime: this.$store.state.artwork.nextTime
          }
        })
          .then(res => {
            if (res.data.data.artworks.length !== 0) {
              // 如果有新数据
              this.$store.commit('CONCAT_ARTWORKS_DATA', res.data.data.artworks)
              this.$store.commit('SET_LAST_TIME')
              this.$store.commit('SET_NEXT_TIME')
            } else {
              // 如果没有新数据
              this.$refs.scroll.forceUpdate()
              let instance = Toast({
                message: '暂无更多数据',
                position: 'middle',
                duration: 5000
              })
              setTimeout(() => {
                instance.close()
              }, 2000)
            }
          })
      }, 1000)
    }
  }
}
</script>
<style  lang="stylus" rel="stylesheet/stylus">
.home
  position: absolute
  top: 50px
  bottom: 50px
  width: 100%
  background-color: rgb(243, 243, 243)
</style>
