import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import auth from "./modules/auth"
import boards from "./modules/boards"
import transactions from "./modules/transactions"

export default new Vuex.Store({
  modules: {
    auth,
    boards,
    transactions
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  plugins: [],
  mixins: {}
})
