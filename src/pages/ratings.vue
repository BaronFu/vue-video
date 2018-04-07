<template>
  <div class="ratings" ref="ratings">
    <rating :ratings="ratings"></rating>
    <comments v-on:rating="handleRating"></comments>
  </div>
</template>
<script>
import comments from '../components/comments/comments'
import rating from '../components/rating/rating'
import BScroll from 'better-scroll'
import api from '../api'
export default {
  data() {
    return {
      ratings: []
    }
  },
  created() {
    api.getRatings({
      params: {
        artId: this.$route.params.id
      }
    })
      .then((res) => {
        if (res.status === 200) {
          this.ratings = res.data.data.ratings
          console.log(res.data.data.ratings)
        }
      })
      .catch((err) => {
        console.log(err)
      })
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
    },
    handleRating(payload) {
      this.ratings.push(payload)
      this.$nextTick(() => {
        this.scroll.refresh()
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
