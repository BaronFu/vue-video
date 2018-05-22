<template>
    <div class="uploadImg">
      <div class="wrapper">
        <vueCropper
        style="z-index: 9980"
        ref="cropper"
        :img="option.img"
        :outputSize="option.size"
        :outputType="option.outputType"
        :info="true"
        :full="option.full"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :fixedBox="option.fixedBox"
        :original="option.original"
        ></vueCropper>
      </div>
      <div class="btn">
        <cube-button @click="finish">完成</cube-button>
      </div>
    </div>
</template>
<script>
import VueCropper from 'vue-cropper'
import api from '../api'
import axios from 'axios'
const axiosInstance = axios.create({})
export default {
  data() {
    return {
      option: {
        img: this.$store.state.common.avatarImg,
        size: 1,
        full: false,
        outputType: 'png',
        canMove: true,
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixedBox: false,
        original: false,
        canMoveBox: false
      }
    }
  },
  methods: {
    finish (type) {
      this.$refs.cropper.getCropData((data) => {
        api.getUploadToken({param: {}})
          .then(res => {
            if (res.status === 200) {
              console.log(res.data.data.token)
              this.$refs.cropper.getCropBlob((data) => {
                console.log(data)
                const formData = new FormData()
                formData.append('file', data)
                formData.append('token', res.data.data.token)
                formData.append('key', res.data.data.key + '.webp')

                axiosInstance({
                  method: 'POST',
                  url: 'http://upload-z2.qiniup.com',
                  data: formData
                })
                  .then(res => {
                    if (res.status === 200) {
                      api.modifyUserInfo({
                        params: {
                          avatar: 'http://p4w715494.bkt.clouddn.com/' + res.data.key
                        }
                      })
                        .then(res => {
                          if (res.status === 200) {
                            console.log(res.data.data)
                            this.$store.state.common.avatarImg = res.data.data.avatar
                            this.$store.state.user.userInfo.avatar = res.data.data.avatar
                            this.$router.replace('/user/profile')
                          }
                        })
                    }
                  })
              })
              this.$refs.cropper.getCropData((data) => {
                this.option.img = data
                console.log(data)
              })
            }
          })
      })
    }
  },
  components: {
    VueCropper
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.uploadImg
    position: fixed
    width: 100%
    top: 50px
    bottom:0px
    .wrapper
      position: absolute
      top: 0px
      bottom: 50px
      width: 100%
    .btn
      position: absolute
      bottom: 0px
      width: 100%
</style>