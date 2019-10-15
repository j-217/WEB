// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import VueInfiniteScroll from 'vue-infinite-scroll'
import Vue2Filters from "vue2-filters"
import Vuex from 'vuex'

Vue.config.productionTip = false;

Vue.use(VueLazyLoad, {
    loading: '/static/loading-svg/loading-bubbles.svg'
});

Vue.use(Vue2Filters);

Vue.use(VueInfiniteScroll);

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    nickName: '',
    cartCount: 0
  },

  mutations: {
    getNickName(state, newName){
      state.nickName = newName
    },

    getCartCount(state, newCartCount){
      state.cartCount = newCartCount
    },

    updateCartCount(state, updateNum){
      state.cartCount += updateNum
    }
  },

  actions: {

  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
