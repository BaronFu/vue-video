import * as types from '../mutation_types'

const state = {
  // 用户登录状态
  loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
  // 用户Token
  userToken: JSON.parse(localStorage.getItem('userToken')) || '',
  // 用户登录信息
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
  // 用户数据信息
  userData: []
}

const actions = {
  // 用户登录
  setUserInfo({ commit }, res) {
    localStorage.setItem('userToken', JSON.stringify(res.token))
    localStorage.setItem('userInfo', JSON.stringify(res.userInfo))
    localStorage.setItem('loginStatus', true)
    commit(types.SET_USER_INFO, res.userInfo)
    commit(types.SET_USER_TOKEN, res.token)
    commit(types.SET_LOGIN_STATUS, true)
  },
  // 退出登录
  setSignOut({ commit }) {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userInfo')
    localStorage.setItem('loginStatus', false)
    commit(types.SET_USER_TOKEN, '')
    commit(types.SET_LOGIN_STATUS, false)
    commit(types.SET_USER_INFO, {})
  },
  // 请求用户信息
  getUserData({ commit }, id) {
    commit(types.COM_LOADING_STATUS, true)
  }
}

const getters = {
  getUserData: state => state.userData,
  userToken: state => state.userToken,
  loginStatus: state => state.loginStatus,
  userInfo: state => state.userInfo
}

const mutations = {
  [types.SET_USER_TOKEN](state, res) {
    state.userToken = res
  },
  [types.SET_USER_INFO](state, res) {
    state.userInfo = res
  },

  [types.SET_LOGIN_STATUS](state, status) {
    state.loginStatus = status
  },

  [types.GET_USER_DATA](state, res) {
    state.userData = res
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
