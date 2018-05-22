<template>
  <div class="upload-wrapper" ref="wrapper">
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style  lang="stylus" rel="stylesheet/stylus">
.upload-wrapper
  position: absolute
  top: 50px
  bottom: 0px
  width: 100%
  background: #e5e5e5
  overflow: hidden
  .upload-content
    padding-bottom: 75px
    .btn
      margin: 1em 1em
      height: 3em
      border-radius: .3em
      background-color: green
      color: #fff
      font-size: 16px
      display: flex
      justify-content: center
      align-items: center
    .title
      width: 100%
      height: 40px
      margin: 10px 10px
      vertical-align: middle
      text-align: left
      span
        display: inline-block
        width: 50px
        height: 40px
        line-height: 40px
        font-size: 16px
      .title-inp
        display: inline-block
        width: 250px
        line-height: 16px
        font-size: 16px
    .sort
      width: 100%
      height: 40px
      margin: 10px 10px
      vertical-align: middle
      text-align: left
      span
        display: inline-block
        width: 50px
        height: 40px
        line-height: 40px
        font-size: 16px
      .sort-inp
        display: inline-block
        width: 250px
        line-height: 16px
        font-size: 16px
    .desc
      width: 100%
      margin: 10px 10px
      text-align: left
      vertical-align: middle
      span
        display: inline-block
        width: 50px
        height: 40px
        line-height: 40px
        font-size: 16px
      .desc-inp
        display: inline-block
        width: 250px
        line-height: 16px
        font-size: 16px
</style>
