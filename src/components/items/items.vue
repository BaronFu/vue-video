<template>
    <div class="items">
        <router-link :to="{path: '/artwork/' + artwork._id}">
            <div class="items-wrapper border-1px">
                <div class="items-left">
                    <img :src="imageUrl" width="100%">
                </div>
                <div class="items-right">
                    <div class="items-title"><span>{{artwork.name}}</span></div>
                    <div class="items-username"><i class="iconfont icon-UPzhu"></i><span>PeteFu</span></div>
                    <div class="items-function">
                        <span><i class="iconfont icon-bofangshu"></i>{{artwork.pv}}</span>
                        <span><i class="iconfont icon-yuanfucengpinglun"></i>71</span>
                        <span style="text-align: right"><i class="iconfont icon-androidgengduo"></i></span>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>
<script>
import '../../assets/iconfont/iconfont.css'
import { Option } from '../../config/option'
export default {
  props: {
    artwork: {
      type: Object
    }
  },
  created() {
    console.log(this.artwork)
  },
  computed: {
    imageUrl() {
      return Option.ImgServer + this.artwork.imageUrl
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/index.styl";
.items
  width: 100%
  .items-wrapper
    display: flex
    height: 100px
    padding: 10px 0px
    border-1px(rgba(7, 17, 27, 0.1))
    .items-left
      flex: 0 0 35%
      padding-left: 10px
      padding: 0px 0px 10px 10px
      img
        height:100%
        border-radius: 5px
    .items-right
      flex: 1
      padding: 0px 10px
      text-align: left
      .items-title
        height: 40px
        line-height: 20px
        margin: 5px 0px
        color: #000000
        overflow: hidden
        text-overflow:ellipsis
        display: -webkit-box
        -webkit-box-orient: vertical
        -webkit-line-clamp: 2
      .items-username
        height: 20px
        font-size: 12px
        color: #999999
      .items-function
        display: flex
        font-size: 12px
        color: #999999
        height: 20px
        span
          flex: 1
</style>