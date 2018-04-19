<template>
    <transition name="fade">
    <div class="profile">
        <div class="profile-list">
            <router-link to="/user/profile/uploadImg">
            <div class="profile-msgItem" style="height: 50px">
                <div class="profile-msgItem-title" style="padding-top: 10px"><p>头像</p></div>
                <div class="profile-msgItem-face"><img :src="user.avatar"></div>
                <div class="profile-msgItem-clear"></div>
            </div>
            </router-link>
            <div class="profile-msgItem">
                <div class="profile-msgItem-title"><p>昵称</p></div>
                <div class="profile-msgItem-words"><p>{{user.username}}</p></div>
                <div class="profile-msgItem-clear"></div>
            </div>
            <div class="profile-msgItem">
                <div class="profile-msgItem-title"><p>UID</p></div>
                <div class="profile-msgItem-words"><p>{{user._id}}</p></div>
            </div>
            <div class="profile-msgItem">
                <div class="profile-msgItem-title"><p>性别</p></div>
                <div class="profile-msgItem-words"><p>{{user.gender | sexData}}</p></div>
            </div>
            <div class="profile-msgItem">
                <div class="profile-msgItem-title"><p>个性签名</p></div>
                <div class="profile-msgItem-words"><p>bilibili</p></div>
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
import { Toast } from 'mint-ui'
import api from '../api'
export default {
  data() {
    return {
      user: {}
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
  methods: {
    logout () {
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