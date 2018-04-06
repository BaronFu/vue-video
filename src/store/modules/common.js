import * as types from '../mutation_types'

/**
 * APP通用配置
 */

const state = {
  leftNavStatus: false,
  currentThemeId: 0
}

const actions = {
  setNavState({ commit }, status) {
    commit(types.COM_NAV_STATUS, status)
  },
  changeCurrentThemeId: ({commit}, id) => {
    commit(types.CHANGE_CURRENT_THEME_ID, id)
  }
}

const getters = {}

const mutations = {
  [types.COM_NAV_STATUS](state, status) {
    state.leftNavStatus = status
  },
  [types.CHANGE_CURRENT_THEME_ID](state, id) {
    state.currentThemeId = id
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
