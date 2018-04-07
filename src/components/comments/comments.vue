<template>
    <div class="comments">
        <div class="comments-mask" v-show="isShow" @click="hiddenMask"></div>
        <div class="comments-wrapper">
        <div class="comments-input">
            <cube-input
            v-model="value"
            :autofocus="autofocus"
            :autocomplete="autocomplete"
            :clearable="clearable" @focus="showMask"></cube-input>
        </div>
        <div class="comments-btn">
            <span class="iconfont icon-fasong" @click="comment"></span>
        </div>
        </div>
    </div>
</template>
<script>
import api from '../../api'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      value: '',
      autofocus: false,
      autocomplete: true,
      clearable: true,
      isShow: false,
      message: ''
    }
  },
  methods: {
    showMask () {
      this.isShow = true
    },
    hiddenMask () {
      this.isShow = false
    },
    comment() {
      api.comment({
        artId: this.$route.params.id,
        content: this.value
      })
        .then((res) => {
          if (res.status === 200) {
            // 清除内容
            this.value = ''
            this.$emit('rating', res.data.data.rating)
            let instance = Toast({
              message: '评论成功',
              position: 'middle',
              duration: 5000
            })
            setTimeout(() => {
              instance.close()
            }, 2000)
            console.log(res)
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            if (err.response.data.code === 10002) {
              let instance = Toast({
                message: '亲您还没登录',
                position: 'middle',
                duration: 5000
              })
              setTimeout(() => {
                instance.close()
              }, 2000)
            } else if (err.response.data.code === 10003) {
              let instance = Toast({
                message: '亲您的登录已过期',
                position: 'middle',
                duration: 5000
              })
              setTimeout(() => {
                instance.close()
              }, 2000)
            }
          }
        })
      this.isShow = false
      console.log(this.value)
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.comments
  width: 100%
  .comments-wrapper
    position: fixed
    width: 100%
    height: 50px
    bottom: 0
    left: 0
    z-index: 50
    background-color: #E6E6E6
    .comments-input
      display: inline-block
      width: 70%
      height: 50px
      margin-left: 30px
      background-color: #E6E6E6

    .comments-btn
      display: inline-block
      width: 20%
      height: 50px
      vertical-align: middle
      span
        font-size: 32px
        line-height: 50px
  .comments-mask
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    width: 100%
    z-index: 49
    background: rgba(0, 0, 0, .8)
</style>