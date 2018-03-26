<template>
  <div class="register" ref="register">
    <div class="register-content">
      <div class="title">welcome to CV Sharing</div>
      <div class="coordinates-icon"></div>
      <div class="register-form">
        <form action="#">
          <div class="user-name common-div">
            <span class="eamil-icon common-icon">
                <i class="icon">&#xe601;</i>
            </span>
            <input type="phone" v-model="username" value="" placeholder="手机号" />
          </div>
          <div class="user-pasw common-div">
            <span class="pasw-icon common-icon">
                <i class="icon">&#xe687;</i>
            </span>
            <input type="password" v-model="password" placeholder="密码" />
          </div>
          <div class="user-code common-div">
            <span class="pasw-icon common-icon">
                <i class="icon">&#xe687;</i>
            </span>
            <input type="text" style="width: 50%;" v-model="code" placeholder="验证码" />
            <span class="verifi-code" @click="getAuthCode" v-show="sendAuthCode">
                      获取验证码
            </span>
            <span class="verifi-code readonly" v-show="!sendAuthCode">
                {{waitTime}}秒重新获取
            </span>
          </div>
          <div class="register-btn" @click="register">注册</div>
        </form>
      </div>
      <div class="forgets">
        <router-link to=""></router-link>
        <router-link to="/user/login">已有账号?登录>></router-link>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../api'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      username: '',
      password: '',
      code: '',
      sendAuthCode: true,
      waitTime: '',
      authTimer: null
    }
  },
  created() {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.register, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    })
  },
  methods: {
    getAuthCode () {
      if (!this.checkPhoneNum()) {
        return
      }
      console.log(this.username)
      api.getCode({mobile: this.username})
        .then(res => {
          if (res) {
            this.waitTime = 60
            this.sendAuthCode = false
            this.authTimer = setInterval(() => {
              this.waitTime--
              if (this.waitTime <= 0) {
                this.sendAuthCode = true
                clearInterval(this.authTimer)
                this.authTimer = null
              }
            }, 1000)
          }
        })
        .catch(err => {
          alert('短信发送失败' + err)
        })
    },
    register () {
      // mobile校验
      if (!this.checkPhoneNum()) {
        return
      }
      // 密码校验
      if (!this.checkPassword()) {
        return
      }
      // 验证码校验
      if (!this.checkCode()) {
        return
      }
      let data = {
        mobile: this.username,
        password: this.password,
        code: this.code
      }
      api.Register(data)
        .then(res => {
          console.log(res)
          if (res.status === 201) {
            console.log(res.data.Info)
            alert(res.data.Info)
          }
          this.$router.replace('/user/login')
        })
        .catch(error => {
          console.log(error)
        })
    },
    checkPhoneNum () {
      // mobile不能为空
      if (!this.username) {
        alert('请输入手机号')
        return false
      }
      // 验证手机格式是否正确
      if (!(/^1[34578]\d{9}$/).test(this.username)) {
        alert('手机格式不正确，请重新输入')
        return false
      }
      return true
    },
    checkPassword () {
      // password不能为空
      if (!this.password) {
        alert('密码不能为空')
        return false
      }
      // 密码校验
      if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/).test(this.password)) {
        alert('密码必须是8到16位数字与字母组合')
        return false
      }
      return true
    },
    checkCode () {
      // code不能为空
      if (!this.code) {
        alert('验证码不能为空')
        return false
      }
      // code校验
      if (!(/^\d{6}$/).test(this.code)) {
        alert('验证码必须是六位数')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.register
  position: absolute
  width:100%
  top: 50px
  bottom: 0px
  overflow: hidden
  background-color: #323542

  .title
    width: 100%
    height: auto
    overflow: hidden
    font-size: 18px
    text-align: center
    line-height: 100px
    color: #fff

  .coordinates-icon
    width: 200px
    height: 125px
    margin: 25px auto
    position: relative

  .register-form
    width: 300px
    height: auto
    margin: 0 auto

    .common-div
      width:100%;
      height: 40px
      overflow: hidden
      border-radius: 2px
      margin-bottom: 25px
      >.common-icon
        float:left
        width: 20px
        height: 20px
        line-height: 20px
        overflow: hidden
        margin: 10px
        text-align: center
        img
          width:100%
          height:auto
      >input
        float:left;
        line-height: 40px
        background-color: transparent
        border: none
        outline: none
        font-size: 16px
        color: #fff

      .verifi-code
        display: inline-block
        width: 100px
        height: 40px
        line-height: 40px
        background: #0bd38a
        color: #fff
        text-align: center
        padding-left: 10px

      .readonly
        background: #eee
        color: #555

    .user-name,.user-pasw,.user-code
      background-color: rgba(255,255,255,0.1)

    .register-btn
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
    height: 30px
    line-height: 30px
    font-size: 16px
    margin-bottom: 25px
    float: right
</style>
