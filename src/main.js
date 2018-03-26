import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
import VueSocketio from 'vue-socket.io'
import Cube from 'cube-ui'

Vue.config.productionTip = false

Vue.use(VueSocketio, 'http://192.168.31.118:3000')
Vue.use(Cube)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
