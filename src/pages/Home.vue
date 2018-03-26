<template>
  <div class="artwork-wrapper" ref="wrapper">
    <div class="artwork-content">
      <div class="alert" :class="{'alert-hook':alert}">刷新成功</div>
      <div class="top-tip">
        <span class="refresh-hook" >{{topTip}}</span>
      </div>
      <artwork-list :artworkList="artworkList" class="artwork-list"></artwork-list>
      <div class="bottom-tip">
        <span class="loading-hook">{{bottomTip}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import artworkList from '../components/artworkList/artworkList'
import { mapGetters } from 'vuex'
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      data: [],
      topTip: '下拉刷新',
      bottomTip: '查看更多',
      alert: false,
      bottomTipShow: true
    }
  },
  components: {
    artworkList
  },
  computed: {
    ...mapGetters([
      'artworkList',
      'currentPage',
      'pageNum',
      'dataStatus'
    ])
  },
  created() {
    if (this.currentPage <= this.pageNum) {
      console.log(this.currentPage)
      console.log(this.pageNum)
      this.bottomTip = '查看更多'
    } else {
      this.bottomTip = '暂无更多数据'
    }
    this._fetchData()
  },
  methods: {
    _fetchData() {
      this.$store.dispatch('getArtworks')
      this.$nextTick(() => {
        if (!this.scroll) {
          this._initScroll()
          // 滑动中
          this.scroll.on('scroll', (pos) => {
            if (pos.y > 30) {
              this.topTip = '释放立即刷新'
            }
          })
          // 滑动结束
          this.scroll.on('touchEnd', (pos) => {
            // 下拉动作
            if (pos.y > 30) {
              setTimeout(() => {
                // 清除数据
                this.$store.dispatch('resetData')
                // 重新加载数据并计算滚动区域高度
                this._fetchData()
                this.bottomTip = '查看更多'
                // 刷新成功后的提示
                this._refreshAlert()
                this.topTip = '下拉刷新'
              }, 1000)
            } else if (pos.y < (this.scroll.maxScrollY - 30)) {
              this.bottomTip = '加载中...'
              setTimeout(() => {
                // 判断是否有更多数据
                if (this.currentPage === this.pageNum) {
                  // 恢复文本值
                  this.bottomTip = '查看更多'
                  // 向列表添加数据
                  this._fetchData()
                  // 加载更多后,重新计算滚动区域高度
                } else {
                  this.bottomTip = '暂无更多数据'
                }
              }, 1000)
            }
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    _initScroll() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: 1
      })
    },
    // 刷新成功提示方法
    _refreshAlert() {
      this.alert = true
      setTimeout(() => {
        this.alert = false
      }, 1000)
    }
  }
}
</script>
<style  lang="stylus" rel="stylesheet/stylus">
  .artwork-wrapper
    position: absolute
    top: 100px
    bottom: 0px
    width: 100%
    overflow: hidden
    background-color: rgb(243, 243, 243)
    .artwork-content
      padding-top: 50px
      padding-bottom: 120px
    .top-tip
      position: absolute
      top: -40px
      left: 0
      z-index: 1
      width: 100%
      height:40px
      line-height:40px
      text-align:center
      color: #555
    .bottom-tip
      position: fixed
      bottom: 120px
      left: 0px
      width: 100%
      height: 40px
      line-height: 35px
      text-align: center
      color: #777
      background: #f2f2f2
    .alert
      display: none
      position: fixed
      top: 0px
      left: 0
      z-index: 2
      width: 100%
      height: 60px
      line-height: 60px
      text-align: center
      color: #fff
      font-size: 24px
      background: rgba(7, 17, 27, 0.7)
      &.alert-hook
        display: block
</style>
