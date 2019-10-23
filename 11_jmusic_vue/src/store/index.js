import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import player from './modules/player'
import music from './modules/music'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    player,
    music
  }
})
