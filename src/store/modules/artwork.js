import * as types from '../mutation_types'
import api from '../../api'

const state = {
  artworkList: JSON.parse(localStorage.getItem('artworkList')) || [],
  lastTime: JSON.parse(localStorage.getItem('lastTime')) || new Date(),
  nextTime: JSON.parse(localStorage.getItem('nextTime')) || new Date()
}

const actions = {
  // get Artworks List
  getArtworks({ commit }, payload) {
    api.getArtworks({
      params: payload
    })
      .then(res => {
        console.log(res)
        if (res.data.code === 2000) {
          commit(types.CONCAT_ARTWORKS_DATA, res.data.data.artworks)
          commit(types.SET_LAST_TIME)
          commit(types.SET_NEXT_TIME)
        } else if (res.data.code === 1000) {
          alert(res.data.message)
        } else if (res.data.code === 1001) {
          alert(res.data.message)
        } else if (res.data.code === 1002) {
          alert(res.data.message)
        }
      })
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
  [types.RESET_ARTWORKS_DATA](state) {
    state.artworkList = []
    localStorage.setItem('artworkList', JSON.stringify(state.artworkList))
  },
  [types.UNSHIFT_ARTWORKS_DATA](state, payload) {
    for (var i = 0; i < payload.length; i++) {
      state.artworkList.unshift(payload[i])
    }
    localStorage.setItem('artworkList', JSON.stringify(state.artworkList))
  },
  [types.CONCAT_ARTWORKS_DATA](state, payload) {
    for (var i = 0; i < payload.length; i++) {
      state.artworkList.push(payload[i])
    }
    localStorage.setItem('artworkList', JSON.stringify(state.artworkList))
  },
  [types.SET_LAST_TIME](state) {
    state.lastTime = state.artworkList[0].created_at
    localStorage.setItem('lastTime', JSON.stringify(state.lastTime))
  },
  [types.SET_NEXT_TIME](state) {
    state.nextTime = state.artworkList[state.artworkList.length - 1].created_at
    localStorage.setItem('nextTime', JSON.stringify(state.nextTime))
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
