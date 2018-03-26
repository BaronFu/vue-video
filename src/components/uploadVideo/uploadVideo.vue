<template>
  <div class="videoUploader">
    <div class="uploadBox">
      <div class="btn">
        <span>选取文件</span>
        <input type="file" name="file" @change="FileChosen"/>
      </div>
    </div>
    <progress-bar :value="Percent" type="success"></progress-bar>
  </div>
</template>
<script>
import progressBar from '../progressBar/progressBar'
export default {
  data() {
    return {
      SelectedFile: null,
      FReader: null,
      Name: '',
      Percent: 0
    }
  },
  components: {
    progressBar
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    MoreData(data) {
      let Place = data['Place'] * 524288
      let NewFile = this.SelectedFile.slice(Place, Place + Math.min(524288, (this.SelectedFile.size - Place)))
      this.FReader.readAsBinaryString(NewFile)
      this.Percent = Math.round(data['Percent'])
      console.log(this.Percent)
    },
    Done(data) {
      console.log(data)
      if (data.error === 0) {
        this.Percent = 100
        this.$store.commit('SET_VIDEO_PATHS', data.url)
      }
    }
  },
  methods: {
    FileChosen (evnt) {
      this.SelectedFile = evnt.target.files[0]
      this.Name = this.SelectedFile.name
      console.log(evnt.target.files[0].name)
    },
    Refresh () {
      location.reload(true)
    },
    StartUpload() {
      if (this.SelectedFile != null) {
        this.FReader = new FileReader()
        let self = this
        this.FReader.onload = function (evnt) {
          self.$socket.emit('Upload', { 'Name': self.Name, 'Data': evnt.target.result })
        }
        this.$socket.emit('Start', { 'Name': this.Name, 'Size': this.SelectedFile.size })
      } else {
        alert('Please Select A File')
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .videoUploader
    margin: 1em 1em 2em
    border: 1px solid #e5e5e5
    .uploadBox
      display: block
      height: 100px
      text-align: center
      cursor: pointer
      padding: 10px 10px
      .btn
        position: relative
        display: block
        width: 100px
        height: 40px
        font-size: 16px
        line-height: 20px
        padding: 9px 15px
        margin: 10px 0px
        border-radius: 3px
        color: #fff
        background-color: #409eff
        border: 1px solid #dcdfe6
        box-sizing: border-box
      input[type="file"]
        display: block
        position: absolute
        left: 0px
        top: 0px
        width: 100px
        height: 40px
        border: 1px solid #000
        opacity: 0
</style>
