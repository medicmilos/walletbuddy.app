import auth from "../../api/apiCalls/auth"

export default {
  state: { isAuthenticated: false },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated
    }
  },
  mutations: {
    setIsAuthenticated(state, payload) {
      state.isAuthenticated = payload
    }
  },
  actions: {
    async checkIsAuthenticated(context) {
      try {
        const user = await auth.checkIsAuthenticated()
        if (user) {
          context.commit("setIsAuthenticated", true)
        } else {
          context.commit("setIsAuthenticated", false)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async login(context, payload) {
      try {
        const response = await auth.login(payload)
        return { status: true, payload: response }
      } catch (error) {
        return { status: false, payload: error }
      }
    },
    async register(context, payload) {
      try {
        const response = await auth.register(payload)
        return { status: true, payload: response }
      } catch (error) {
        return { status: false, payload: error }
      }
    },
    async logout() {
      try {
        const response = await auth.logout()
        return { status: true, payload: response }
      } catch (error) {
        return { status: false, payload: error }
      }
    }
  },
  namespaced: true
}
