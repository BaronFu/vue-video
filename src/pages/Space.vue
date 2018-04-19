<template>
    <div class="space">
        <div class="space-banner">
            <img width="100%" src="https://s1.hdslb.com/bfs/static/mult/images/bannerTop.png">
        </div>
        <div class="space-info">
            <div class="space-info-face">
                <img :src="user.avatar">
            </div>
            <router-link to="/user/profile">
                <div class="space-info-myInfo">
                    <p>账号资料</p>
                </div>
            </router-link>
            <div class="space-info-nameField">
                <div class="space-name"><p>{{user.username}}</p></div>
                <div class="space-sex"></div>
            </div>
            <div class="space-info-details">
                <div class="space-line">
                    <div class="space-following">
                        <p><span>84 </span>关注</p>
                    </div>
                    <div class="space-follower">
                        <p><span>5 </span>粉丝</p>
                    </div>
                    <div class="space-clear"></div>
                </div>
                <div class="space-intro">
                    <div class="space-whatup">
                        <p>bilibili</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="space-tabs">
            <div class="space-tab" @click="switchTab(0)">
                <p>我的收藏</p>
                <div class="space-tab-line" v-if="tabAtive"></div>
            </div>
            <div class="space-tab" @click="switchTab(1)">
                <p>我的投稿</p>
                <div class="space-tab-line" v-if="!tabAtive"></div>
            </div>
            <div class="space-tab-clear"></div>
        </div>
        <div class="space-content" v-if="tabAtive">
            <cube-scroll>
                <items v-for="item in collections" :artwork="item" :key="item.id"></items>
            </cube-scroll>
        </div>
        <div class="space-content" v-else>
            <cube-scroll>
                <cube-swipe>
                    <transition-group name="swipe" tag="ul">
                        <li v-for="(data,index) in artworks" :key="data.item._id">
                            <cube-swipe-item
                            ref="swipeItem"
                            :btns="data.btns"
                            :index="index"
                            @btn-click="onBtnClick"
                            @active="onItemActive"
                            >
                            <items @click="onItemClick(data.item, index)" :artwork="data.item"></items>
                            </cube-swipe-item>
                        </li>
                    </transition-group>
                </cube-swipe>
            </cube-scroll>
        </div>
    </div>
</template>
<script>
import api from '../api'
import items from '../components/items/items'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      user: {},
      collections: [],
      artworks: [],
      tabAtive: true
    }
  },
  components: {
    items
  },
  created() {
    api.getSpace({param: {}})
      .then(res => {
        if (res.status === 200) {
          console.log(res.data.data)
          this.user = res.data.data.user
          this.collections = res.data.data.collections
          this.artworks = res.data.data.artworks
        }
      })
    this.activeIndex = -1
  },
  methods: {
    switchTab(id) {
      if (this.tabAtive && id !== 0) {
        this.tabAtive = false
      } else {
        this.tabAtive = true
      }
    },
    onItemClick(item) {
      console.log('click item:', item)
    },
    onBtnClick(btn, index) {
      if (btn.action === 'delete') {
        this.$createActionSheet({
          title: '确认要删除吗',
          active: 0,
          data: [
            {content: '删除'}
          ],
          onSelect: () => {
            api.deleteArtwork({
              id: this.artworks[index].item._id
            })
              .then(res => {
                if (res.status === 200) {
                  this.artworks.splice(index, 1)
                  let instance = Toast({
                    message: '成功删除',
                    position: 'middle',
                    duration: 5000
                  })
                  setTimeout(() => {
                    instance.close()
                  }, 2000)
                }
              })
          }
        }).show()
      } else {
        this.$refs.swipeItem[index].shrink()
      }
    },
    onItemActive(index) {
      if (index === this.activeIndex) {
        return
      }
      if (this.activeIndex !== -1) {
        const activeItem = this.$refs.swipeItem[this.activeIndex]
        activeItem.shrink()
      }
      this.activeIndex = index
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .space
        position:fixed
        top: 50px
        bottom: 0
        width: 100%
        .space-banner
            position: relative
            width: 100%
        .space-info
            position: absolute
            width: 100%
            background-color: #fff
            padding-bottom: 15px
            .space-info-face
                position: absolute
                top: -40px
                left: 20px
                width: 80px
                height: 80px
                img
                    height: 100%
                    border-radius: 50%
            .space-info-myInfo
                position: absolute
                z-index: 2
                top: 10px
                right: 10px
                border: 1px solid #76D49B
                border-radius: 3px
                width: 70px
                height: 24px
                line-height: 24px
                text-align: center
                p
                    color: #76D49B
                    font-size: 14px
            .space-info-nameField
                position: relative
                margin-left: 20px
                padding-top: 60px
                height: 20px
                .space-name
                    float: left
                    p
                        font-size: 18px
                        color: #212121
                        line-height: 24px
                .space-sex
                    float: left
            .space-info-details
                position: relative
                margin: 10px 20px 0px
                font-size: 16px
                text-align: left
                color: #757575
                span
                    color: #212121
                .space-line
                    position: relative
                    .space-following
                        float: left
                    .space-follower
                        float: left
                        margin-left: 20px
                    .space-clear
                        clear: both
                .space-intro
                    margin-top: 10px
                    .space-whatup
                        width: 290px
                        width: 20px
                        p
                            line-height: 20px
                            color: #999
                            text-align: left
        .space-tabs
            position: absolute
            display: flex
            top: 280px
            width: 100%
            background-color: #fff
            border-top: 1px solid rgba(7, 17, 27, 0.1)
            border-bottom: 1px solid rgba(7, 17, 27, 0.1)
            .space-tab
                position: relative
                flex: 1
                p
                    color: #76D49B
                    font-size: 16px
                    line-height: 40px
                    text-align: center
                .space-tab-line
                    position: absolute
                    left: 50%
                    -webkit-transform: translateX(-50%)
                    bottom: 2px
                    width: 65px
                    height: 2px
                    background-color: #76D49B
                    border-radius: 2px
            .space-tab-clear
                clear: both
        .space-content
            position: absolute
            width: 100%
            top: 320px
            bottom: 0px
</style>