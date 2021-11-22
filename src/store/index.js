import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import auth from "./modules/auth"
import boards from "./modules/boards"

export default new Vuex.Store({
  modules: {
    auth,
    boards
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  plugins: [],
  mixins: {}
})
