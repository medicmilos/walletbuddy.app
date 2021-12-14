import api from "../../api/apiCalls"
import jwtService from "../../api/jwtService"

export default {
  state: {
    isAuthenticated: !!jwtService.getToken(),
    currentUser: null
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated
    },
    getCurrentUser(state) {
      return state.currentUser
    }
  },
  mutations: {
    setAuth(state, data) {
      state.isAuthenticated = true
      jwtService.setToken(data.token)
      jwtService.setAxiosToken()
    },
    resetAuth(state) {
      state.isAuthenticated = false
      jwtService.unsetToken()
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload
    }
  },
  actions: {
    login({ commit }, payload) {
      return api
        .login(payload)
        .then(response => {
          commit("setAuth", {
            token: response.token
          })
          return { status: true, data: response }
        })
        .catch(error => {
          return { status: false, data: error.response.data.message }
        })
    },
    register({ commit }, payload) {
      return api
        .register(payload)
        .then(response => {
          commit("setAuth", {
            token: response.token
          })
          return { status: true, data: response }
        })
        .catch(error => {
          return { status: false, data: error.response.data.message }
        })
    },
    getCurrentUser({ commit }) {
      return api
        .getCurrentUser()
        .then(response => {
          commit("setCurrentUser", response)
          return { status: true, data: response }
        })
        .catch(error => {
          return { status: false, data: error.response.data.message }
        })
    },
    logout({ commit }) {
      commit("resetAuth")
      return true
    },
    checkAuth({ commit }) {
      if (!jwtService.getToken()) {
        commit("resetAuth")
        return false
      }

      return true
    }
  },
  namespaced: true
}
