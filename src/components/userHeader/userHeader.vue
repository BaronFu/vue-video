<template>
    <div class="userHeader">
        <div class="userHeader-avatar"><img src="http://p4w715494.bkt.clouddn.com/avatar.jpg" width="30" height="30"></div>
        <span v-if="user">{{user.username}}</span>
        <div class="userHeader-subscribe"><i class="iconfont icon-jia"></i>关注</div>
      </div>
</template>
<script>
export default {
  props: {
    user: {
      type: Object
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.userHeader
  width: 100%
  height: 50px
  font-size: 12px
  color: #000000
  text-align: left
  .userHeader-avatar
    display: inline-block
    vertical-align: top
    width: 30px
    height: 30px
    margin: 10px
    img
      border-radius: 50%
  span
    display: inline-block
    height: 30px
    line-height: 30px
    vertical-align: top
  .userHeader-subscribe
    position: absolute
    right: 0px
    display: inline-block
    width: 60px
    height: 30px
    line-height: 30px
    margin: 10px
    background: #76D49B
    border-radius: 5px
    font-size: 14px
    color: #ffffff
    text-align: center

</style>