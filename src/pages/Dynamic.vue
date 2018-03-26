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
export default {
  data () {
    return {
      url: 'http://192.168.31.118:3000/api/upload',
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
            alert('success publish')
          } else {
            alert('failed publish')
          }
          console.log(res)
        })
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
  top: 100px
  bottom: 0px
  width: 100%
  background: #e5e5e5
  overflow: hidden
  .upload-content
    padding-bottom: 150px
    .btn
      margin: 1em 1em
      height: 3em
      border-radius: .3em
      background-color: green
      color: #fff
      font-size: 32px
      display: flex
      justify-content: center
      align-items: center
    .title
      height: 180px
      margin: 20px 20px
      span
        display: block
        float: left
        width: 100px
        height: 60px
        line-height: 60px
        font-size: 32px
        vertical-align: center
      .title-inp
        float: left
        width: 500px
        font-size: 32px
        line-height: 32px
        border: 5 solid #e5e5e5
        border-radius: 5px
    .sort
      height: 180px
      margin: 20px 20px
      span
        display: block
        float: left
        width: 100px
        height: 60px
        line-height: 60px
        font-size: 32px
        vertical-align: center
      .sort-inp
        float: left
        width: 500px
        font-size: 32px
        line-height: 32px
        border: 5 solid #e5e5e5
        border-radius: 5px
    .desc
      height: 180px
      margin: 20px 20px
      span
        display: block
        float: left
        width: 100px
        height: 60px
        line-height: 60px
        font-size: 32px
        vertical-align: center
      .desc-inp
        float: left
        width: 500px
        font-size: 32px
        line-height: 32px
</style>
