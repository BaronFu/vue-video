<template>
    <div class="recommend">
        <router-link :to="{path: '/artwork/' + artwork._id}" replace>
            <div class="recommend-wrapper border-1px">
                <div class="recommend-left">
                    <img :src="imageUrl" width="100%">
                </div>
                <div class="recommend-right">
                    <div class="recommend-title"><span>{{artwork.name}}</span></div>
                    <div class="recommend-username"><i class="iconfont icon-UPzhu"></i><span>PeteFu</span></div>
                    <div class="recommend-function">
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
.recommend
  width: 100%
  .recommend-wrapper
    display: flex
    height: 100px
    padding: 10px 0px
    border-1px(rgba(7, 17, 27, 0.1))
    .recommend-left
      flex: 0 0 35%
      padding-left: 10px
      padding: 0px 0px 10px 10px
      img
        height:100%
        border-radius: 5px
    .recommend-right
      flex: 1
      padding: 0px 10px
      text-align: left
      .recommend-title
        height: 40px
        line-height: 20px
        margin: 5px 0px
        color: #000000
        overflow: hidden
        text-overflow:ellipsis
        display: -webkit-box
        -webkit-box-orient: vertical
        -webkit-line-clamp: 2
      .recommend-username
        height: 20px
        font-size: 12px
        color: #999999
      .recommend-function
        display: flex
        font-size: 12px
        color: #999999
        height: 20px
        span
          flex: 1
</style>