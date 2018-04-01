<template>
  <div id="app">
    <v-header :title="title" :menu-display="menuDisplay" :back-display="backDisplay"></v-header>
    <div class="content">
        <router-view></router-view>
    </div>
    <v-tabar></v-tabar>
    <v-sidebar></v-sidebar>
  </div>
</template>

<script>
import tabar from './components/tabar/tabar'
import header from './components/header/header'
import sidebar from './components/sidebar/sidebar'

import { mapActions } from 'vuex'

export default {
  name: 'App',
  data() {
    return {}
  },
  components: {
    'v-tabar': tabar,
    'v-header': header,
    'v-sidebar': sidebar
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'hideMenuSlide'
  },
  methods: {
    ...mapActions({ setNavState: 'setNavState' }),
    // 隐藏MenuSlide
    hideMenuSlide() {
      this.setNavState(false)
    }
  },
  computed: {
    title () {
      switch (this.$route.path.split('/')[1]) {
        case '':
          return 'CV Sharing'
        case 'home':
          return 'CV Sharing'
        case 'category':
          return '分类'
        case 'dynamic':
          return '动态'
        case 'user':
          return '我的'
      }
    },
    menuDisplay () {
      if (this.$route.path.split('/')[1] === 'home') {
        return true
      }
      return this.$route.path.split('/').length > 2 ? false : true
    },
    backDisplay () {
      return this.$route.path.split('/').length > 2 ? true : false
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@font-face {
  font-family: 'icon';  /* project id 172436 */
  src: url('//at.alicdn.com/t/font_w71lovnj7adobt9.eot');
  src: url('//at.alicdn.com/t/font_w71lovnj7adobt9.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_w71lovnj7adobt9.woff') format('woff'),
    url('//at.alicdn.com/t/font_w71lovnj7adobt9.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_w71lovnj7adobt9.svg#iconfont') format('svg');
}
.icon {
  font-family:"icon" !important;
  font-size:18px;
  font-style:normal;
  color: #ffffff;
}

html,body {
  height: 100%;
}
a.active {
  text-decoration: none;
}
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  height: 100%
  .content
    background: #F5F5F5
</style>
