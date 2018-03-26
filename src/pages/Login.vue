<template>
  <div class="login" ref="login">
    <div class="login-content">
      <div class="title"></div>
      <div class="coordinates-icon"></div>
      <div class="login-form">
        <form action="#">
          <div class="user-name common-div">
            <span class="eamil-icon common-icon">
                <i class="icon">&#xe601;</i>
            </span>
            <input type="text" name="username" v-model="username" placeholder="手机号" />
          </div>
          <div class="user-pasw common-div">
            <span class="pasw-icon common-icon">
                <i class="icon">&#xe687;</i>
            </span>
            <input type="password" name="password" v-model="password" placeholder="密码" />
          </div>
          <div class="login-btn" @click="login">登录</div>
        </form>
      </div>
      <div class="forgets">
        <router-link to="">忘记密码?</router-link>
        <router-link to="register">新来的?注册</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../api'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.login, {
        click: true,
        probeType: 1
      })
    })
  },
  methods: {
    login() {
      let data = {
        username: this.username,
        password: this.password
      }
      api.Login(data)
        .then(res => {
          console.log(res.data)
          let result = {
            token: res.data.token,
            userInfo: res.data.userInfo
          }
          if (res.data.success) {
            this.$store.dispatch('setUserInfo', result)
            alert('成功登陆')
            setTimeout(() => {
              this.$router.replace('/home')
            }, 500)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style  lang="stylus" rel="stylesheet/stylus">
.login
  position: absolute
  top: 50px
  bottom: 0px
  width: 100%
  overflow: hidden
  background-color: #323542
  .title
    width: 100%
    overflow: hidden
    font-size: 9px
    text-align: center
    height: 100px
    color: #fff

  .coordinates-icon
    width: 200px
    height: 125px
    margin: 25px auto
    position: relative

  .login-form
    width: 300px
    height: auto
    margin: 0 auto

    .common-div
      width: 100%
      height: 40px
      overflow: hidden
      border-radius: 2px
      margin-bottom: 25px
      >.common-icon
        float: left
        width: 20px
        height: 20px
        line-height: 20px
        overflow: hidden
        margin: 10px
        text-align: center
        img
          width: 100%
          height: auto
      >input
        float: left
        line-height: 40px
        background-color: transparent
        border: none
        outline: none
        font-size: 16px
        color: #fff

    .user-name,.user-pasw
      background-color:rgba(255,255,255,0.1)

    .login-btn
      background-color: #0bd38a
      color: #fff
      font-size: 20px
      text-align: center
      height: 50px
      line-height: 50px
      margin-bottom: 25px
      border-radius: 2px

  .forgets
    width: 300px
    height: auto
    margin: 0 auto
    >a
      color: #fff
      opacity: 0.2
      font-size: 16px
      float: left
      +a
        float: right
</style>
