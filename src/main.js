import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import VueSocketio from 'vue-socket.io'
import Cube from 'cube-ui'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueLazyload from 'vue-lazyload'
import { Option } from './config/option'

Vue.config.productionTip = false

Vue.use(VueSocketio, Option.ApiServer)
Vue.use(Cube)
Vue.use(MintUI)

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('./common/image/tv.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
