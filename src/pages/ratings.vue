<template>
  <div class="ratings" ref="ratings">
    <rating :ratings="ratings"></rating>
    <comments></comments>
  </div>
</template>
<script>
import comments from '../components/comments/comments'
import rating from '../components/rating/rating'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      ratings: [
        {
          'username': 'PeteFu',
          'rateTime': 1469281964000,
          'text': '发姐漂亮',
          'avatar': 'http://p4w715494.bkt.clouddn.com/avatar.jpg'
        },
        {
          'username': '子弹温度',
          'rateTime': 1469271264000,
          'text': '我爱你发姐',
          'avatar': 'http://p4w715494.bkt.clouddn.com/default.jpg'
        },
        {
          'username': '迪卡普里龙',
          'rateTime': 1469261964000,
          'text': '发姐我女神',
          'avatar': 'http://p4w715494.bkt.clouddn.com/default.jpg'
        },
        {
          'username': '凝视者',
          'rateTime': 1469261964000,
          'text': '发姐我女票',
          'avatar': 'http://p4w715494.bkt.clouddn.com/default.jpg'
        },
        {
          'username': '梦幻怪兽',
          'rateTime': 1469261964000,
          'text': '发姐人长得漂亮，唱歌又好听，我喜欢，很喜欢，超级喜欢',
          'avatar': 'http://p4w715494.bkt.clouddn.com/default.jpg'
        },
        {
          'username': '梦幻怪兽',
          'rateTime': 1469261964000,
          'text': '发姐人长得漂亮，唱歌又好听，我喜欢，很喜欢，超级喜欢',
          'avatar': 'http://p4w715494.bkt.clouddn.com/default.jpg'
        },
        {
          'username': '梦幻怪兽',
          'rateTime': 1469261964000,
          'text': '发姐人长得漂亮，唱歌又好听，我喜欢，很喜欢，超级喜欢',
          'avatar': 'http://p4w715494.bkt.clouddn.com/default.jpg'
        }
      ]
    }
  },
  created() {
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  components: {
    comments,
    rating
  },
  methods: {
    _initScroll() {
      this.scroll = new BScroll(this.$refs.ratings, {
        click: true,
        probeType: 1
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.ratings
  position: absolute
  top: 290px
  bottom: 60px
  width: 100%
  overflow: hidden
</style>
