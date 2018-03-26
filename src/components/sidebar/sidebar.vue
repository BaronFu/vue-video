<template>
      <div class="sidebar">
        <transition name="slide">
          <div class="sidebar-con" v-show="sidebarShow">
            <div>
              <div class="sidebar-head" v-if="loginStatus">
                <div class="user">
                  <img :src="userInfo.avatar" alt="">
                  <span>{{userInfo.username}}</span>
                </div>
                <div class="function">
                  <div class="function-sub">
                    <router-link to="">
                    <i class="icon">&#xe626;</i>
                    <span>我的参加</span>
                    </router-link>
                  </div>
                  <div class="function-sub">
                    <a href="javascript:;" @click="logout">
                    <i class="icon">&#xe674;</i>
                    <span>退出登录</span>
                    </a>
                  </div>
                </div>
              </div>
              <div class="sidebar-head" v-else>
                <div class="user">
                  <img src="http://p4w715494.bkt.clouddn.com/default.jpg" alt="">
                  <span>请登录</span>
                </div>
                <div class="function">
                  <div class="function-sub">
                    <router-link to="">
                      <i class="icon">&#xe626;</i>
                      <span>我的参加</span>
                    </router-link>
                  </div>
                  <div class="function-sub">
                    <router-link to="user/login" @click="hideBar">
                      <i class="icon">&#xe601;</i>
                      <span>去登录</span>
                    </router-link>
                  </div>
                </div>
              </div>
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
export default {
  computed: {
    ...mapGetters([
      'loginStatus',
      'userInfo'
    ]),
    sidebarShow() {
      return this.$store.state.common.leftNavStatus
    }
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
    }
  }

}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.sidebar
  .sidebar-con
    position: fixed
    top: 0
    width: 600px
    height: 100%
    z-index: 50
    background: #fff
    overflow: auto
    &.slide-enter-active, &.slide-leave-active
      transition all 0.5s
    &.slide-enter, &.slide-leave-active
      transform translate3d(-100%, 0, 0)
    .sidebar-head
      padding: 35px 35px 0
      color: #fff
      background: #76D49B
      .user
        img
          width: 100px
          height: 100px
          border-radius: 50%
          vertical-align: middle
        span
          padding-left: 15px
          font-size: 22px
      .function
        display: flex
        margin-top: 20px
        .function-sub
          flex: 1
          padding-left: 30px
          height: 100px
          line-height: 100px
          a
            display: block
            color: #fff
            font-size: 32px
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
