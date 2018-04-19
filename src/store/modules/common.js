import * as types from '../mutation_types'

/**
 * APP通用配置
 */

const state = {
  leftNavStatus: false,
  tabBarStatus: true,
  headerStatus: true,
  currentThemeId: 0
}

const actions = {
  setNavState({ commit }, status) {
    commit(types.COM_NAV_STATUS, status)
  },
  setTabBarState({ commit }, status) {
    commit(types.COM_TABBAR_STATUS, status)
  },
  setHeaderState({ commit }, status) {
    commit(types.COM_HEADER_STATUS, status)
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
  [types.COM_TABBAR_STATUS](state, status) {
    state.tabBarStatus = status
  },
  [types.COM_HEADER_STATUS](state, status) {
    state.headerStatus = status
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
