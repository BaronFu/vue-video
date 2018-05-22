<template>
    <transition name="fade">
    <div class="profile">
        <div class="profile-list">
            <div class="profile-msgItem" style="height: 50px">
                <div class="profile-msgItem-title" style="padding-top: 10px"><p>头像</p></div>
                <div class="profile-msgItem-face">
                    <input type="file" id="upload" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
                    <label for="upload">
                        <img :src="user.avatar">
                    </label>
                </div>
                <div class="profile-msgItem-clear"></div>
            </div>
            <div class="profile-msgItem" @click="changeName">
                <div class="profile-msgItem-title"><p>昵称</p></div>
                <div class="profile-msgItem-words"><p>{{user.username}}</p></div>
                <div class="profile-msgItem-clear"></div>
            </div>
            <div class="profile-msgItem">
                <div class="profile-msgItem-title"><p>UID</p></div>
                <div class="profile-msgItem-words"><p>{{user._id}}</p></div>
            </div>
            <div class="profile-msgItem" @click="showPicker">
                <div class="profile-msgItem-title"><p>性别</p></div>
                <div class="profile-msgItem-words"><p>{{user.gender | sexData}}</p></div>
            </div>
            <div class="profile-msgItem" @click="changeSignature">
                <div class="profile-msgItem-title"><p>个性签名</p></div>
                <div class="profile-msgItem-words"><p>{{user.signature}}</p></div>
            </div>
            <div class="profile-exit">
                <a href="javascript:;" @click="logout">
                    <span>退出登录</span>
                </a>
            </div>
        </div>
    </div>
    </transition>
</template>
<script>
import { Toast, MessageBox } from 'mint-ui'
import { mapGetters } from 'vuex'
import api from '../api'
export default {
  data() {
    return {
      user: {},
      sexData: [{ text: '男', value: 'Y' }, { text: '女', value: 'X' }, { text: '保密', value: 'S' }]
    }
  },
  created() {
    api.getUserInfo({param: {}})
      .then((res) => {
        if (res.status === 200) {
          this.user = res.data.data.user
          console.log(this.user)
        }
      })
  },
  mounted() {
    this.picker = this.$createPicker({
      title: '性别',
      data: [this.sexData],
      onSelect: (selectedVal, selectedIndex, selectedText) => {
        api.modifyUserInfo({
          params: {
            gender: selectedVal[0]
          }
        })
          .then(res => {
            if (res.status === 200) {
              this.user.gender = res.data.data.gender
            }
          })
      },
      onCancel: () => {
        this.$createToast({
          type: 'correct',
          txt: '取消选择',
          time: 1000
        }).show()
      }
    })
  },
  computed: {
    ...mapGetters([
      'avatarImg'
    ])
  },
  methods: {
    // logout
    logout () {
      api.logout({})
        .then(res => {
          if (res.status === 200) {
            this.$store.dispatch('setSignOut')
            let instance = Toast({
              message: '成功退出',
              position: 'middle',
              duration: 5000,
              iconClass: 'iconfont icon-caozuochenggong'
            })
            setTimeout(() => {
              instance.close()
              this.$router.replace('/user')
            }, 500)
          }
        })
    },
    // update displayName
    changeName () {
      MessageBox.prompt('请输入昵称').then(({ value, action }) => {
        if (action === 'confirm') {
          api.modifyUserInfo({
            params: {
              username: value
            }
          })
            .then(res => {
              if (res.status === 200) {
                this.user.username = res.data.data.username
              }
            })
        }
      })
    },
    // update signature
    changeSignature () {
      MessageBox.prompt('请输入个性签名').then(({ value, action }) => {
        if (action === 'confirm') {
          api.modifyUserInfo({
            params: {
              signature: value
            }
          })
            .then(res => {
              if (res.status === 200) {
                this.user.signature = res.data.data.signature
              }
            })
        }
      })
    },
    // 性别选择
    showPicker () {
      this.picker.show()
    },
    // 选择图片
    uploadImg (e, num) {
      // 上传图片
      // this.option.img
      var file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      var reader = new FileReader()
      reader.onload = (e) => {
        if (typeof e.target.result === 'object') {
          this.$store.state.common.avatarImg = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          this.$store.state.common.avatarImg = e.target.result
        }
        this.$router.push('/user/profile/uploadImg')
      }
      reader.readAsDataURL(file)
    }
  },
  filters: {
    sexData(gender) {
      if (gender === 'S') {
        return '保密'
      } else if (gender === 'X') {
        return '女'
      } else {
        return '男'
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .profile
        position: fixed
        top: 50px
        bottom: 0px
        width: 100%
        background-color: #f4f4f4
        .profile-list
            margin-top: 15px
            .profile-msgItem
                position: relative
                background-color: #fff
                padding: 10px 15px
                height: 30px
                border-bottom: 1px solid rgba(7, 17, 27, 0.1)
                .profile-msgItem-title
                    float: left
                    p
                        text-align: left
                        font-size: 16px
                        line-height: 30px
                        color: #505050
                .profile-msgItem-words
                    float: right
                    width: 65%
                    overflow: hidden
                    p
                        text-align: right
                        font-size: 16px
                        line-height: 30px
                        color: #999
                        overflow: hidden
                        text-overflow: ellipsis
                        white-space: nowrap
                .profile-msgItem-face
                    float: right
                    img
                        height: 50px
                        border-radius: 50%
                .profile-msgItem-clear
                    clear: both
            .profile-exit
                margin-top: 30px
                width: 100%
                height: 50px
                line-height: 50px
                background-color: #fff
                font-size: 16px
                color: #505050
    .fade-enter-active, .fade-leave-active
        transition: all .5s
    .fade-enter, .fade-leave-to
        transform translate3d(100%, 0, 0)
</style>