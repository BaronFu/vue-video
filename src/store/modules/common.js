import * as types from '../mutation_types'

/**
 * APP通用配置
 */

const state = {
  leftNavStatus: false
}

const actions = {
  setNavState({ commit }, status) {
    commit(types.COM_NAV_STATUS, status)
  }
}

const getters = {}

const mutations = {
  [types.COM_NAV_STATUS](state, status) {
    state.leftNavStatus = status
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
