<template>
    <div class="tabar" v-show="isShowTabbar">
        <div class="tab">
            <div class="tab-item">
                <router-link to="/home">
                    <div class="tab-icon"><img src="./tab_home.png" alt=""></div>
                    <div class="tab-text">首页</div>
                </router-link>
            </div>
            <div class="tab-item">
                <router-link to="/category">
                    <div class="tab-icon"><img src="./tab_running.png" alt=""></div>
                    <div class="tab-text">分类</div>
                </router-link>
            </div>
            <div class="tab-item">
                <router-link to="/dynamic">
                    <div class="tab-icon"><img src="./tab_travel.png" alt=""></div>
                    <div class="tab-text">动态</div>
                </router-link>
            </div>
            <div class="tab-item">
                <router-link to="/user">
                    <div class="tab-icon"><img src="./tab_user.png" alt=""></div>
                    <div class="tab-text">我的</div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    isShowTabbar () {
      let routeLength = this.$route.path.split('/').length
      return routeLength > 2 ? 0 : 1
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .tabar
    height: 60px
    .tab
      position: fixed
      z-index: 4
      bottom: 0
      left: 0
      display: flex
      width: 100%
      height: 60px
      line-height: 60px
      background: #fff
      box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2)

      &:after
        display: block
        position: absolute
        left: 0
        top: 0
        width: 100%
        border-top: 1px solid rgba(7, 17, 27, 0.1)
        content: ''

      .tab-item
        flex: 1
        text-align: center

        a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)

        &.active
          color: #76D49B
          text-decoration: none

        .tab-icon
          width: 25px
          height: 25px
          margin: 0 auto

          img
            width: 100%

        .tab-text
          height: 40px
          line-height: 40px

</style>
