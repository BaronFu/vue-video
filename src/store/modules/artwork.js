import * as types from '../mutation_types'
import api from '../../api'

const state = {
  artworkList: JSON.parse(localStorage.getItem('artworkList')) || [],
  pageNum: JSON.parse(localStorage.getItem('pageNum')) || 1,
  currentPage: JSON.parse(localStorage.getItem('currentPage')) || 1,
  dataStatus: JSON.parse(localStorage.getItem('dataStatus')) || '',
  artworkDetail: {}
}

const actions = {
  // get Artworks List
  getArtworks({ commit }) {
    console.log('currentPage:' + state.currentPage)
    if (state.currentPage <= state.pageNum) {
      api.getArtworks({
        params: {
          page: state.currentPage,
          limit: 6
        }
      })
        .then(res => {
          console.log(res)
          if (res.data.code === 2000) {
            commit(types.SET_ARTWORK_LIST, res.data.data)
            commit(types.SET_CURRENT_PAGE)
            commit(types.SET_PAGE_NUM, res.data.data)
          } else if (res.data.code === 1000) {
            alert(res.data.message)
          } else if (res.data.code === 1001) {
            alert(res.data.message)
          } else if (res.data.code === 1002) {
            alert(res.data.message)
          }
        })
    } else {
      commit(types.SET_DATA_STATUS, '没有更多数据')
    }
  },
  // get Artworks Detail
  getArtworkDetail({ commit }, payload) {
    api.getArtworkDetail({
      params: {
        id: payload
      }
    })
      .then(res => {
        commit(types.SET_ARTWORK_DETAIL, res.data)
      })
  },
  // refresh data
  resetData ({ commit }) {
    commit(types.RESET_ARTWORKS_DATA)
  }
}

const getters = {
  artworkList: state => state.artworkList,
  pageNum: state => state.pageNum,
  currentPage: state => state.currentPage,
  dataStatus: state => state.dataStatus,
  artworkDetail: state => state.artworkDetail,
  imageUrl: (state) => {
    return 'http://p0h3qpfji.bkt.clouddn.com/' + state.artworkDetail.imageUrl
  },
  videoUrl: (state) => {
    return 'http://p4zz42e95.bkt.clouddn.com/' + state.artworkDetail.videoUrl
  }
}
const mutations = {
  [types.SET_ARTWORK_LIST](state, res) {
    if (!JSON.parse(localStorage.getItem('artworkList'))) {
      state.artworkList = state.artworkList.concat(res.artworks)
    } else {
      var arr = JSON.parse(localStorage.getItem('artworkList'))
      state.artworkList = arr.concat(res.artworks)
    }
    localStorage.setItem('artworkList', JSON.stringify(state.artworkList))
  },
  [types.SET_CURRENT_PAGE](state) {
    state.currentPage = state.currentPage + 1
    localStorage.setItem('currentPage', JSON.stringify(state.currentPage))
  },
  [types.SET_PAGE_NUM](state, res) {
    state.pageNum = res.totalPage
    localStorage.setItem('pageNum', JSON.stringify(state.pageNum))
  },
  [types.SET_DATA_STATUS](state, res) {
    state.dataStatus = res
    localStorage.setItem('dataStatus', JSON.stringify(state.dataStatus))
  },
  [types.SET_ARTWORK_DETAIL](state, res) {
    state.artworkDetail = res.artwork
  },
  [types.RESET_ARTWORKS_DATA](state) {
    state.artworkList = []
    state.currentPage = 1
    state.pageNum = 1
    localStorage.setItem('artworkList', JSON.stringify(state.artworkList))
    localStorage.setItem('currentPage', JSON.stringify(state.currentPage))
    localStorage.setItem('pageNum', JSON.stringify(state.pageNum))
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
