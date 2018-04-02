<template>
  <div class="introduction">
    <cube-scroll>
      <div class="introduction-wrapper">
        <userHeader :user="artwork.user"></userHeader>
        <div class="fold-wrapper" @click="fold">
          <div class="title" :class="{ isflod: isFlod }">{{artwork.name}}</div>
          <span class="icon-fold iconfont icon-jiantou_down" v-if="isFlod"></span>
          <span class="icon-fold iconfont icon-jiantou_up" v-else></span>
          <div class="record">
            <div class="record-item">
              <span class="iconfont icon-bofangshu"></span>
              <span class="num">{{artwork.pv}}</span>
            </div>
            <div class="record-item">
              <span class="iconfont icon-yuanfucengpinglun"></span>
              <span class="num">50</span>
            </div>
            <div class="record-item">
              <span class="num">
                {{artwork.created_at | formatDate}}
              </span>
            </div>
          </div>
          <div class="desc" :class="{ isflod: isFlod }">{{artwork.description}}</div>
        </div>
      </div>
      <div class="function border-1px">
        <div class="block">
          <i class="iconfont" :class="likeClass" @click="like"></i>
          <div class="name">{{artwork.likeNum}}</div>
        </div>
        <div class="block">
          <i class="iconfont" :class="collectionClass" @click="collection"></i>
          <div class="name">{{collectionNum}}</div>
        </div>
        <div class="block">
          <i class="iconfont icon-huangcun"></i>
          <div>缓存</div>
        </div>
        <div class="block">
          <i class="iconfont icon-fengxiang1" @click="share"></i>
          <div class="name">23</div>
        </div>
      </div>
      <recommend v-for="item in recommend" :artwork="item" :key="item.id"></recommend>
    </cube-scroll>
    <popup ref="extendPopup" :content="message"></popup>
    <share ref="share"></share>
  </div>
</template>
<script>
import '../assets/iconfont/iconfont.css'
import api from '../api'
import popup from '../components/popup/popup'
import share from '../components/share/share'
import userHeader from '../components/userHeader/userHeader'
import recommend from '../components/recommend/recommend'
import {formatDate} from '../common/js/date'
export default {
  props: {
    artwork: {
      type: Object
    }
  },
  data() {
    return {
      isCollection: false,
      collectionNum: 103,
      collectionClass: 'icon-shoucang1',
      message: '',
      isFlod: true,
      recommend: []
    }
  },
  created() {
  },
  mounted() {
    this._recomList()
    console.log(this.recommend)
  },
  components: {
    popup,
    share,
    userHeader,
    recommend
  },
  computed: {
    likeClass() {
      return this.artwork.isLike ? 'icon-zan' : 'icon-zan1'
    }
  },
  methods: {
    like() {
      if (!this.artwork.isLike) {
        // 推荐
        api.like({
          userId: this.artwork.user._id,
          artId: this.artwork._id
        })
          .then((res) => {
            if (res.status === 200) {
              this.artwork.isLike = true
              this.artwork.likeNum++
              this.message = '成功推荐'
              this.$refs.extendPopup.show()
            }
            console.log(res)
          })
      } else {
        // 取消推荐
        api.cancelLike({
          userId: this.artwork.user._id,
          artId: this.artwork._id
        })
          .then((res) => {
            if (res.status === 200) {
              this.artwork.isLike = false
              this.artwork.likeNum--
              this.message = '取消推荐'
              this.$refs.extendPopup.show()
            }
            console.log(res)
          })
      }
    },
    collection() {
      if (!this.isCollection) {
        this.isCollection = true
        this.collectionNum++
      } else {
        this.isCollection = false
        this.collectionNum--
      }

      if (this.isCollection) {
        this.collectionClass = 'icon-shoucang'
      } else {
        this.collectionClass = 'icon-shoucang1'
      }
    },
    share() {
      this.$refs.share.showShare()
    },
    fold() {
      if (this.isFlod) {
        this.isFlod = false
      } else {
        this.isFlod = true
      }
    },
    _recomList() {
      let arr = JSON.parse(localStorage.getItem('artworkList'))
      let ret = arr.findIndex((value, index, arr) => {
        return value._id === this.$route.params.id
      })
      this.recommend = arr.slice((ret + 1), (ret + 4))
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../common/stylus/index.styl";
  .introduction
    position: absolute
    width: 100%
    top: 295px
    bottom: 0px

    .introduction-wrapper
      width: 100%
      font-size: 0

      .fold-wrapper
        width: 100%
        .title
          display: inline-block
          width: 90%
          line-height: 20px
          margin: 10px 0px
          font-size: 16px
          color: #000000
          text-align: left
          vertical-align: top
          &.isflod
            height: 20px
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
        .icon-fold
          display: inline-block
          height: 20px
          line-height: 20px
          vertical-align: top
        .record
          height: 20px
          margin-left: 10px
          text-align: left
          .record-item
            display: inline-block
            height: 20px
            line-height: 20px
            margin-right: 16px
            font-size: 8px
            color: #999999
            .num
              font-size: 12px
        .desc
          display: inline-block
          width: 95%
          line-height: 20px
          margin: 10px 0px
          font-size: 12px
          color: #999999
          text-align: left
          vertical-align: top
          &.isflod
            height: 20px
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
    .function
      width: 100%
      height: 50px
      display: flex
      border-1px(rgba(7, 17, 27, 0.1))
      padding-bottom: 10px

      .block
        flex: 1
        width: 100%
        height: 50px
        line-height: 25px
        color: #757575

        .iconfont
          font-size: 22px
        .name
          font-size: 12px
</style>
