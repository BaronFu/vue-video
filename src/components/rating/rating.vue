<template>
    <div class="ratings-wrapper">
        <div class="rating border-1px" v-for="item in ratings" :key="item.id">
            <span class="avatar">
                <img :src="item.avatar" width="30" height="30">
            </span>
            <div class="rating-content">
                <div class="first-line">
                <span class="rating-name">{{item.username}}</span>
                <span class="rating-time">{{item.rateTime | formatDate}}</span><br>
                </div>
                <span class="rating-comment">{{item.text}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import {formatDate} from '../../common/js/date'
export default {
  props: {
    ratings: {
      type: Array
    }
  },
  data() {
    return {}
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/index.styl";
.ratings-wrapper
  width: 100%
  .rating
    display: flex
    width: 94%
    padding: 10px 10px 0 10px
    color: #000
    border-1px(rgba(7, 17, 27, 0.1))
    .avatar
      flex: 0 0 30px
      width: 30px
      height: 30px
      img
        border-radius: 50%
    .rating-content
      position: relative
      flex: 1
      margin-left: 20px
      top: -10px
      .first-line
        height: 30px
        color: rgba(0, 0, 0, 0.6)
        .rating-name
          position: absolute
          left: 0px
          width: 60px
          height: 30px
          line-height: 30px
          font-size: 12px
          text-align:left
        .rating-time
          position: absolute
          right: 5px
          height: 30px
          line-height: 30px
      .rating-comment
        width: 100%
        text-align:left
        float:left
        line-height: 22px
        font-size: 14px
</style>