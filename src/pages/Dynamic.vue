<template>
  <div class="upload-wrapper" ref="wrapper">
    <div class="upload-content">
      <div class="title">
        <span>标题:</span>
        <cube-input class="title-inp" v-model="titleInput.value" :clearable="titleInput.clearable"></cube-input>
      </div>
      <div class="sort">
        <span>分类:</span>
        <cube-input class="sort-inp" v-model="sortInput.value" :clearable="sortInput.clearable"></cube-input>
      </div>
      <div class="desc">
        <span>描述:</span>
        <cube-textarea class="desc-inp" v-model="descInput.value" ></cube-textarea>
      </div>
      <uploader :url="url">
      </uploader>
      <div class="btn" @click="upload">
        上传图片
      </div>
      <upload-video ref="uploadVideo">
      </upload-video>
      <div class="btn" @click="uploadVideo">
        上传视频
      </div>
      <div class="btn" @click="uploadContent">
        提交内容
      </div>
    </div>
  </div>
</template>
<script>
import uploader from '../components/uploader/uploader'
import uploadVideo from '../components/uploadVideo/uploadVideo'
import { mapGetters } from 'vuex'
import BScroll from 'better-scroll'
import api from '../api'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      url: 'http://192.168.1.102:3000/api/upload',
      imgs: [],
      titleInput: {
        type: 'text',
        value: '',
        maxlength: 20,
        clearable: true
      },
      sortInput: {
        type: 'text',
        value: '',
        maxlength: 20,
        clearable: true
      },
      descInput: {
        type: 'text',
        value: '',
        maxlength: 20,
        clearable: true
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  computed: {
    ...mapGetters([
      'imgStatus',
      'imgPaths',
      'progressValue',
      'videoPaths'
    ])
  },
  components: {
    uploader,
    uploadVideo
  },
  methods: {
    upload () {
      this.$store.commit('SET_IMG_STATUS', 'uploading')
    },
    submit() {
      let values = []
      for (let key of this.imgPaths) {
        values.push(key)
      }
      this.imgs = values
      console.log(this.imgs)
    },
    uploadVideo () {
      this.$refs.uploadVideo.StartUpload()
    },
    _initScroll() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
      })
    },
    uploadContent () {
      this._checkForm()
      let params = {
        title: this.titleInput.value,
        sort: this.sortInput.value,
        desc: this.descInput.value,
        imgPaths: this.imgPaths[0],
        videoPaths: this.videoPaths
      }
      api.submitArtwork(params)
        .then(res => {
          if (res.data.code === 0) {
            let instance = Toast({
              message: 'success publish',
              position: 'bottom',
              duration: 5000
            })
            setTimeout(() => {
              instance.close()
            }, 2000)
          } else {
            let instance = Toast({
              message: 'failed publish',
              position: 'bottom',
              duration: 5000
            })
            setTimeout(() => {
              instance.close()
            }, 2000)
          }
          console.log(res)
        })
    },
    _checkForm() {
      if (!this.titleInput.value) {
        let instance = Toast({
          message: 'Title不能为空',
          position: 'bottom',
          duration: 5000
        })
        setTimeout(() => {
          instance.close()
        }, 2000)
      } else if (!this.sortInput.value) {
        let instance = Toast({
          message: 'Sort不能为空',
          position: 'bottom',
          duration: 5000
        })
        setTimeout(() => {
          instance.close()
        }, 2000)
      } else if (!this.descInput.value) {
        let instance = Toast({
          message: 'Desc不能为空',
          position: 'bottom',
          duration: 5000
        })
        setTimeout(() => {
          instance.close()
        }, 2000)
      }
    }
  },
  watch: {
    imgStatus () {
      if (this.imgStatus === 'finished') {
        this.submit()
      }
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
