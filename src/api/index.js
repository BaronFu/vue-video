import axios from 'axios'
import qs from 'qs'
import store from '../store'
import { Option } from '../config/option'

// 设置全局axios默认值
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 创建一个axios实例
const instance = axios.create({
  baseURL: Option.ApiServer,
  timeout: 3000
})

// request拦截器
instance.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    if (store.state.user.loginStatus && store.state.user.userToken) {
      config.headers.Authorization = `${store.state.user.userToken}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default {
  // 用户添加
  Register(params) {
    return instance.post('/api/register', params)
  },
  // 用户登录
  Login(params) {
    return instance.post('/api/login', params)
  },
  // 用户退出
  Logout(params) {
    return instance.post('/api/logout', params)
  },
  // 获取用户信息
  getUserInfo(params) {
    return instance.get('/api/getUserInfo', params)
  },
  // 获取上传图片Token
  getUploadToken(params) {
    return instance.get('/api/upload/token', params)
  },
  // 获取验证码
  getCode(params) {
    return instance.post('/api/verifyCode', params)
  },
  // 获取作品列表
  getArtworks(params) {
    return instance.get('/api/artworks', params)
  },
  // 获取作品详情
  getArtworkDetail(params) {
    return instance.get('/api/artwork', params)
  },
  // 提交作品
  submitArtwork(params) {
    return instance.post('/api/artwork', params)
  },
  // 删除作品
  deleteArtwork(params) {
    return instance.post('/api/deleteArtwork', params)
  },
  // 点赞
  like(params) {
    return instance.post('/api/like', params)
  },
  // 取消点赞
  cancelLike(params) {
    return instance.post('/api/cancel', params)
  },
  // 发表评论
  comment(params) {
    return instance.post('/api/comment', params)
  },
  // 获取评论
  getRatings(params) {
    return instance.get('/api/ratings', params)
  },
  // 收藏
  collect(params) {
    return instance.post('/api/collect', params)
  },
  // 取消收藏
  unCollect(params) {
    return instance.post('/api/uncollect', params)
  },
  // 获取收藏列表
  getCollections(params) {
    return instance.get('/api/collectList', params)
  },
  // 获取用户空间信息
  getSpace(params) {
    return instance.get('/api/space', params)
  }
}
