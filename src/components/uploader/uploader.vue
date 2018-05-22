<template>
  <div class="imgUploader">
    <div class="file-list">
      <section class="file-item draggable-item"
        v-for="(file, index) in imgUploadCache" :key="index"
      >
        <img :src="file.src" alt="" ondragstart="return false;"/>
        <span class="file-remove" @click="remove(index)">+</span>
        <span class="file-loading" v-if="imgStatus==='uploading'"></span>
        <span class="file-finished" v-if="imgStatus==='finished'"></span>
      </section>
      <section class="file-item" v-if="imgStatus !== 'finished' && imgUploadCache.length < 5">
        <div class="add">
          <span><i class="fa fa-camera">+</i></span>
          <input type="file" multiple accept="image/*" ref="file"
            @change="selectImgs"
          />
        </div>
      </section>
    </div>
    <div class="uploadBtn">
      <section>
        <span class="empty" v-if="imgUploadCache.length > 0" @click="empty">
          {{imgStatus === 'finished' ? '重新上传' : '清空'}}
        </span>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    url: String
  },
  data() {
    return {
      files: [], // 文件缓存
      index: 0, // 序列号
      maxLength: 5 // 图片最大数量
    }
  },
  computed: {
    ...mapGetters([
      'imgUploadCache',
      'imgPaths',
      'imgStatus'
    ])
  },
  methods: {
    // 选择图片
    selectImgs () {
      let fileList = this.$refs.file.files
      for (let i = 0, len = fileList.length; i < len; i++) {
        let item = {
          key: this.index++,
          name: fileList[i].name,
          size: fileList[i].size,
          file: fileList[i]
        }
        // 将图片文件转成BASE64格式
        let reader = new FileReader()
        reader.onload = (e) => {
          this.$set(item, 'src', e.target.result)
        }
        reader.readAsDataURL(fileList[i])
        this.files.push(item)
      }
      this.files.splice(5)
      this.$store.commit('SET_IMG_UPLOAD_CACHE', this.files.slice(0, 5)) // 存储文件缓存
      this.$store.commit('SET_IMG_STATUS', 'selected')
    },
    // 移除图片
    remove (index) {
      this.files.splice(index, 1)
      this.$store.commit('SET_IMG_UPLOAD_CACHE', this.files)
    },
    // 清空图片
    empty () {
      this.files.splice(0, this.files.length)
      this.$store.commit('SET_IMG_UPLOAD_CACHE', this.files)
      this.$store.commit('SET_IMG_PATHS', [])
    },
    // 上传图片
    submit () {
      let formData = new FormData()
      this.imgUploadCache.forEach((item, index) => {
        item.name = 'imgFiles[' + index + ']'
        formData.append(item.name, item.file)
      })
      // 新建请求
      const xhr = new XMLHttpRequest()
      xhr.open('POST', this.url, true)
      xhr.send(formData)
      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 304) {
          let datas = JSON.parse(xhr.responseText)
          console.log('response: ', datas)
          // 存储返回的地址
          let imgUrlPaths = []
          datas.forEach(e => {
            // error === 0 位成功状态
            e.error === 0 && imgUrlPaths.push(e.url)
          })
          this.$store.commit('SET_IMG_PATHS', imgUrlPaths) // 存储返回的地址
          this.files = [] // 清空文件缓存
          this.index = 0 // 初始化序列号
          this.$store.commit('SET_IMG_STATUS', 'finished') // 更新文件上传状态
        } else {
          console.log('请求错误')
        }
      }
    }
  },
  beforeCreate () {
    this.$store.commit('SET_IMG_STATUS', 'ready') // 更新文件上传状态
  },
  destroyed () {
    this.$store.commit('SET_IMG_UPLOAD_CACHE', [])
    this.$store.commit('SET_IMG_PATHS', [])
  },
  watch: {
    imgStatus () {
      if (this.imgStatus === 'uploading') {
        this.submit()
      }
    },
    imgStore () {
      if (this.imgUploadCache <= 0) {
        this.$store.commit('SET_IMG_STATUS', 'ready')
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .imgUploader
    margin: 1em 1em 2em
    border: 1px solid #e5e5e5
    .file-list
      padding: 10px 0px
      &::after
        content: ''
        display: block
        clear: both
        visibility: hidden
        line-height: 0
        height: 0
        font-size: 0
      .file-item
        float: left
        position: relative
        width: 100px
        text-align: center
        img
          width: 100px
          height: 100px
          border: 1px solid #ececec
        .file-remove
          position: absolute
          right: 12px
          top: 4px
          width: 14px
          height: 14px
          color: #fff
          cursor: pointer
          line-height 12px
          border-radius: 50%
          transform: rotate(45deg)
          background: rgba(0, 0, 0, 0.5)
        .file-loading
          position: absolute
          left: 0px
          right: 0px
          top: 1em
          color: #fff
          background: rgba(0, 0, 0, .5)
        .file-finished
          position: absolute
          left: 0px
          right: 0px
          top: 1em
          color: #fff
          background-color: rgba(0, 0, 0, .5)
        &:hover .file-remove
          display: inline
          .file-name
            margin: 0px
            height: 40px
            word-break: break-all
            font-size: 14px
            over-flow: hidden
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 2px
            -webkit-box-orient: vertical
        .add
          width: 100px
          height: 100px
          margin-left: 10px
          float: left
          text-align: center
          line-height: 100px
          font-size: 60px
          cursor: pointer
          border: 1px dashed @bd_color
          color: @sub_color
          position: relative
          background: @bd_color
          .fa
            font-size: 1.4em
            color: #7DD2D9
    .uploadBtn
      position: relative
      .empty
        position: absolute
        right: 0px
        bottom: 0px
        background: #01B5CE
        color: #fff
        padding: .2em 1em
    input[type="file"]
      position: absolute
      left: 0px
      top: 0px
      width: 80px
      height: 80px
      border: 1px solid #000
      opacity: 0
</style>
