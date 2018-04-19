<template>
  <div class="user" ref="user">
    <div class="users-content">
      <div v-if="!loginStatus">
        <div class="user-h">
          <div class="avatar u-avatar">
            <img src="http://p4w715494.bkt.clouddn.com/default.jpg">
          </div>
          <div class="u-button">
            <router-link to="/user/login" class="t-login">登录</router-link>
            <router-link to="/user/register" class="t-regist">注册</router-link>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="user-h islogin">
          <div class="avatar i-avatar">
            <img :src="userInfo.avatar" alt=""/>
          </div>
          <div class="user-d">
            <p class="username">{{userInfo.username}}</p>
            <p class="desc">90后大学生</p>
          </div>
        </div>
      </div>
      <div class="user-h-list ">
        <ul>
          <li>
            <router-link to="">
              <span class="num"></span>
              <span>发布</span>
            </router-link>
          </li>
          <li>
            <router-link to="">
              <span class="num"></span>
              <span>作品</span>
            </router-link>
          </li>
          <li>
            <router-link to="">
              <span class="num"></span>
              <span>收到的点赞</span>
            </router-link>
          </li>
        </ul>
      </div>

      <group :cell-lists="cellLists1"></group>
      <group :cell-lists="cellLists2"></group>
      <group :cell-lists="cellLists3"></group>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import group from '@/components/group/group'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      cellLists1: [
        {link: '', iconUrl: '../../assets/images/user-cert.png', text: '学生认证', desc: '', badg: '', more: true},
        {link: 'user/info', iconUrl: '../assets/images/user-detail.png', text: '我的详情', desc: '', badg: '', more: true},
        {link: 'user/msg', iconUrl: '../assets/xyy-vue/images/user-message.png', text: '消息通知', desc: '', badg: '4', more: true}
      ],
      cellLists2: [
        {link: '', iconUrl: '../../assets/images/user-addfriend.png', text: '邀请好友', desc: '', badg: '', more: true},
        {link: '', iconUrl: '../../assets/images/user-school.png', text: '选择高校', desc: '', badg: '', more: true}
      ],
      cellLists3: [
        {link: 'user/set', iconUrl: '../../assets/images/user-set.png', text: '设置', desc: '', badg: '', more: true},
        {link: '', iconUrl: '../../assets/images/user-call.png', text: '联系客服', desc: '18679168426', badg: '', more: true}
      ]
    }
  },
  created() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.user, {
        click: true,
        probeType: 1
      })
    })
  },
  components: {
    group
  },
  computed: {
    ...mapGetters([
      'loginStatus',
      'userInfo'
    ])
  }
}
</script>
<style  lang="stylus" rel="stylesheet/stylus">
.user
  position: absolute
  width: 100%
  top: 50px
  bottom: 60px
  overflow: hidden
  .islogin
    display: flex
    .i-avatar
      margin: 20px 15px 0;
    .user-d
      margin-top: 35px
      p
        line-height: 25px
        text-align: left
        &.username
          font-size: 20px
          color: #000
        &.desc
          font-size: 16px
          padding-left: 1px
  .user-h
    box-sizing: border-box
    height: 155px
    color: #323232
    background: #76D49B
    text-align: center
    padding-top: 10px
    .avatar
      width: 80px
      height: 80px
      border-radius: 50%
      border: 1px solid rgba(255, 255, 255, 0.95)
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2)
      overflow: hidden
      img
        width: 100%
    .u-avatar
      margin: 0 auto
    .u-button
      display: flex
      justify-content: center
      margin-top: 10px
      a
        display: block
        text-align: center
        width: 80px
        color: #2AD2C9
        background: #fff
        height: 36px
        line-height: 36px
        font-size: 14px
        border-radius: 0 2px 2px 0
      .t-login
        background: #2AD2C9
        color: #fff
        border-radius: 2px 0 0 5px
  .circle
    display: flex
    justify-content: space-between
    height: 75px
    line-height: 75px
    background: #fff;
    margin-bottom: 10px
    >div:first-child
      display: flex
    .circle-n
      width: 50px
      text-align: center
      font-size: 7px
    .circle-p
      li
        display: inline-block
        width: 60px
        height: 60px
        margin-top: 7px
        img
          width: 100%
    .circle-more
      img
        width: 18px
        height: 18px
        margin-top: 30px
        margin-right: 10px
  .user-h-list
    background: #fff
    padding: 10px 0
    margin-bottom: 10px
    ul
      display: flex
      li
        flex: 1
        text-align: center
        height: 40px
        line-height: 40px
        border-right: 1px solid #89F0EB
        font-size: 14px
        &:last-child
          border-right: none
        a
          display: block
          .num
            color: #2AD2C9
</style>
