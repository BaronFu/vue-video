<template>
    <div class="tabar" v-show="isShowTabbar">
        <div class="tab">
            <div class="tab-item">
                <router-link to="/home" replace>
                    <span class="iconfont" :class="{'icon-shouyeweixuanzhong': !isHome, 'icon-shouyexuanzhong': isHome}"></span>
                    <span class="tab-text">首页</span>
                </router-link>
            </div>
            <div class="tab-item">
                <router-link to="/category" replace>
                    <span class="iconfont" :class="{'icon-fenquweixuanzhong': !isCategory, 'icon-fenquxuanzhong': isCategory}"></span>
                    <span class="tab-text">分类</span>
                </router-link>
            </div>
            <div class="tab-item">
                <router-link to="/dynamic" replace>
                    <span class="iconfont" :class="{'icon-dongtaiweixuanzhong': !isDynamic, 'icon-dongtaixuanzhong': isDynamic}"></span>
                    <span class="tab-text">动态</span>
                </router-link>
            </div>
            <div class="tab-item">
                <router-link to="/user" replace>
                    <span class="iconfont" :class="{'icon-wodeweixuanzhong': !isUser, 'icon-wodexuanzhong': isUser}"></span>
                    <span class="tab-text">我的</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      isHome: true,
      isCategory: false,
      isDynamic: false,
      isUser: false
    }
  },
  computed: {
    isShowTabbar () {
      let routeLength = this.$route.path.split('/').length
      return routeLength > 2 ? 0 : 1
    }
  },
  watch: {
    '$route' (to, from) {
      // 设置from Tab为未选中
      switch (from.name) {
        case 'home':
          this.isHome = false
          break
        case 'category':
          this.isCategory = false
          break
        case 'dynamic':
          this.isDynamic = false
          break
        case 'user':
          this.isUser = false
          break
      }
      // 设置to Tab为选中
      switch (to.name) {
        case 'home':
          this.isHome = true
          break
        case 'category':
          this.isCategory = true
          break
        case 'dynamic':
          this.isDynamic = true
          break
        case 'user':
          this.isUser = true
          break
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/index.styl";
  .tabar
    height: 60px
    .tab
      position: fixed
      z-index: 4
      bottom: 0
      left: 0
      display: flex
      width: 100%
      height: 50px
      background: #fff
      box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2)

      .tab-item
        flex: 1
        text-align: center
        padding-top: 10px
        a
          display: block
          font-size: 14px
          color: #7E7E7E
          &.active
            color: #76D49B
            text-decoration: none

          span
            display: block
            height: 20px
            line-height: 20px
            font-size: 12px
          .iconfont
            font-size: 22px
          .tab-text
            height: 20px

</style>
