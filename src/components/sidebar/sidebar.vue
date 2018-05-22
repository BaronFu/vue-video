<template>
      <div class="sidebar">
        <transition name="slide">
          <div class="sidebar-wrapper" v-show="sidebarShow">
              <div class="sidebar-content">
                <cube-scroll>
                    <div class="sidebar-head" v-if="loginStatus">
                      <div class="sidebar-user">
                        <div class="sidebar-avatar">
                          <router-link to="user/space" @click="hideBar">
                            <img :src="userInfo.avatar" alt="">
                          </router-link>
                        </div>
                        <div class="sidebar-function">
                          <span><i class="iconfont icon-qianbao"></i></span>
                          <span><i class="iconfont icon-erweima"></i></span>
                        </div>
                      </div>
                      <div class="sidebar-userInfo">
                          <span>{{userInfo.username}}</span>
                          <span class="grade">LV3</span>
                      </div>
                    </div>
                    <div class="sidebar-head" v-else>
                      <div class="sidebar-user">
                        <div class="sidebar-avatar">
                          <router-link to="user/login" @click="hideBar">
                            <img src="http://p4w715494.bkt.clouddn.com/default.jpg" alt="">
                          </router-link>
                        </div>
                      </div>
                      <div class="sidebar-userInfo">
                        <router-link to="user/login" @click="hideBar">
                          <span>点击头像登录</span>
                        </router-link>
                      </div>
                    </div>
                    <div class="sidebar-list">
                      <div class="sidebar-item" v-for="item in themes" :key="item.id" :class="{'current':currentThemeId===item.id}"
                      @click="goTheme(item.id, item.path)" v-if="item.show">
                        <span class="iconfont ifont" :class="[item.iconFontClass, {'current':currentThemeId===item.id}]"></span>
                        <span>{{item.name}}</span>
                      </div>
                    </div>
                </cube-scroll>
              </div>
            <div class="sidebar-footer">
              <div class="sidebar-footer-item"><span class="iconfont icon-shezhi"></span><span>设置</span></div>
              <div class="sidebar-footer-item"><span class="iconfont icon-zhuti"></span><span>主题</span></div>
              <div class="sidebar-footer-item"><span class="iconfont icon-yejianmoshi"></span><span>夜间</span></div>
            </div>
          </div>
        </transition>
        <transition name="fade">
          <div class="sidebar-mask" v-show="sidebarShow" @click="hideBar">sidebar-mask</div>
        </transition>
      </div>
</template>
<script>
import { mapGetters } from 'vuex'
import '../../assets/iconfont/iconfont.css'
export default {
  data() {
    return {
      themes: [
        {
          id: 0,
          iconFontClass: 'icon-shouye',
          name: '首页',
          path: '/home',
          show: true
        },
        {
          id: 1,
          iconFontClass: 'icon-lishijilu',
          name: '历史记录',
          path: '/home',
          show: true
        },
        {
          id: 2,
          iconFontClass: 'icon-xiazaihuancun',
          name: '离线缓存',
          path: '/home',
          show: true
        },
        {
          id: 3,
          iconFontClass: 'icon-wodeshoucang',
          name: '我的收藏',
          path: '/user/collection',
          show: true
        },
        {
          id: 4,
          iconFontClass: 'icon-wodeguanzhu',
          name: '我的关注',
          path: '/home',
          show: true
        },
        {
          id: 5,
          iconFontClass: 'icon-shaohouzaikan',
          name: '稍后再看',
          path: '/home',
          show: true
        },
        {
          id: 6,
          iconFontClass: 'icon-chuangzuozhongxin',
          name: '创作中心',
          path: '/user/create',
          show: true
        },
        {
          id: 9,
          iconFontClass: 'icon-bangzhu',
          name: '帮助',
          path: '/home',
          show: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'loginStatus',
      'userInfo'
    ]),
    sidebarShow() {
      return this.$store.state.common.leftNavStatus
    },
    currentThemeId() {
      return this.$store.state.common.currentThemeId
    }
  },
  created () {
    console.log(this.loginStatus)
  },
  methods: {
    hideBar() {
      this.$store.dispatch('setNavState', false)
    },
    logout () {
      this.$store.dispatch('setSignOut')
      alert('成功退出')
      setTimeout(() => {
        this.$router.replace('/user')
      }, 500)
    },
    goTheme(id, path) {
      this.$store.dispatch('changeCurrentThemeId', id)
      this.hideBar()
      if (this.loginStatus) {
        this.$router.push(path)
      } else {
        switch (id) {
          case 1:
            this.$router.push('/user/login')
            break
          case 3:
            this.$router.push('/user/login')
            break
          case 4:
            this.$router.push('/user/login')
            break
          case 5:
            this.$router.push('/user/login')
            break
          case 6:
            this.$router.push('/user/login')
            break
        }
      }
    }
  }

}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.sidebar
  position: fixed
  top: 0
  bottom: 0
  z-index: 50
  .sidebar-wrapper
    position: fixed
    top: 0
    bottom: 0
    width: 280px
    z-index: 50
    background: #fff
    overflow: auto
    &.slide-enter-active, &.slide-leave-active
      transition all 0.5s
    &.slide-enter, &.slide-leave-active
      transform translate3d(-100%, 0, 0)
    .sidebar-content
      position: absolute
      top: 0
      bottom: 50px
      overflow: hidden
      .sidebar-head
        padding: 32px 17px 0
        color: #fff
        background: #76D49B

        .sidebar-user
          display: flex
          height: 60px
          .sidebar-avatar
            flex: 0 0 50px
            height: 50px
            img
              width: 50px
              height: 50px
              border-radius: 50%

          .sidebar-function
            flex: 1
            text-align: right
            span
              width: 50px
              height: 50px
              margin: 5px
              padding: 5px
              border: 1px solid #ffffff
              border-radius: 50%

        .sidebar-userInfo
          text-align: left
          padding-bottom: 30px
          font-size: 16px
          span
            display: inline-block
            vertical-align: top
          .grade
            width: 30px
            height: 12px
            line-height: 12px
            border: 1px solid #ffffff
            border-radius: 3px
            font-size: 8px
            text-align: center
          a
            display: block
            color: #fff
            text-align: top
            font-size: 16px

      .sidebar-list
        width: 280px
        margin-top: 20px
        .sidebar-item
          width: 100%
          height: 50px
          line-height: 50px
          text-align: left
          color: #000000
          &.current
            background-color: rgb(233, 233, 233)
            color: #76D49B
          span
            display: inline-block
            vertical-align: top
            font-size: 16px
            width: 100px
            &.current
              color: #76D49B
          .ifont
            width: 65px
            font-size: 28px
            color: #7E7E7E
            text-align: center
    .sidebar-footer
      position: absolute
      bottom: 0
      width: 100%
      display: flex
      border-top: 1px solid rgba(7, 17, 27, 0.1);
      .sidebar-footer-item
        flex: 1
        display: inline-block
        height: 50px
        line-height: 50px
        span
          font-size: 12px
          color: #7E7E7E
        .iconfont
          border: 1px solid #7E7E7E
          padding: 8px
          margin-right: 5px
          border-radius: 50%

  .sidebar-mask
    position: fixed
    width: 100%
    margin: 0 auto
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 40
    background: rgba(0,0,0,.7)

    &.fade-enter-active, &.fade-leave-active
      transition: opacity .5s

    &.fade-enter, &.fade-leave-active
      opacity: 0
</style>
