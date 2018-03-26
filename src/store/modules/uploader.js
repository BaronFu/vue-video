import * as types from '../mutation_types'

const state = {
  imgUploadCache: [],
  imgPaths: [],
  imgStatus: 'ready', // 上传状态 ready selected uploading finished
  progressValue: 0,
  videoPaths: []
}

const getters = {
  imgUploadCache: state => state.imgUploadCache.slice(0, 5),
  imgPaths: state => state.imgPaths,
  imgStatus: state => state.imgStatus,
  progressValue: state => state.progressValue,
  videoPaths: state => state.videoPaths
}

const mutations = {
  [types.SET_IMG_UPLOAD_CACHE] (state, arg) {
    state.imgUploadCache = arg
  },
  [types.SET_IMG_PATHS] (state, arg) {
    state.imgPaths = arg
  },
  [types.SET_IMG_STATUS] (state, arg) {
    state.imgStatus = arg
  },
  [types.SET_PROGRESS_VALUE] (state, arg) {
    state.progressValue = arg
  },
  [types.SET_VIDEO_PATHS] (state, arg) {
    state.videoPaths = arg
  }
}

const actions = {}

export default {
  state,
  mutations,
  getters,
  actions
}
