<template>
  <div class="header">
    <div class="header-icon" v-show="menuDisplay" @click="showBar"><i class="icon">&#xe634;</i></div>
    <div class="header-icon" v-show="backDisplay" @click="goBack"><i class="icon">&#xe622;</i></div>
    <div class="header-cont" :class="{goBack:backDisplay}"><p>{{title}}</p></div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    menuDisplay: Boolean,
    backDisplay: Boolean
  },
  methods: {
    showBar() {
      this.$store.dispatch('setNavState', true)
    },
    goBack () {
      window.history.back()
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .header
    position: fixed
    top: 0
    z-index: 4
    height: 50px
    width: 100%
    background: #76D49B
    display: flex
    flex-direction: row

    .header-icon
      flex: 1
      text-align: left
      padding-left: 10px
      >i
        line-height: 50px

  .header-cont
    flex: 1;
    text-align: right
    padding-right: 20px
    >p
      line-height: 50px
      color: #ffffff
      font-size:17px
    &.goBack
      text-align: left
</style>
