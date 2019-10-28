import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import Vant from 'vant'
import '@vant/touch-emulator'
import 'vant/lib/index.css'

import infiniteScroll from 'vue-infinite-scroll'

Vue.use(Vant)
Vue.use(infiniteScroll)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
