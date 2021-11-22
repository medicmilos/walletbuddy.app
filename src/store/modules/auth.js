import firebase from "firebase/app"
import "firebase/auth"

import auth from "../../api/apiCalls/auth"

export default {
  state: {
    isAuthenticated: false
  },
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
        const user = firebase.auth().currentUser

        context.commit("setIsAuthenticated", !!user)
      } catch (error) {
        console.log(error.message)
      }
    },
    async login(context, payload) {
      try {
        const response = await auth.login(payload)

        return { status: true, payload: response }
      } catch (error) {
        return { status: false, payload: error.message }
      }
    },
    async register(context, payload) {
      try {
        const registeredUser = await auth.registerUser(payload)
        await auth.createUser(registeredUser, payload)

        return { status: true, payload: null }
      } catch (error) {
        return { status: false, payload: error.message }
      }
    },
    async forgotPassword(context, payload) {
      try {
        const response = await auth.forgotPassword(payload)

        return { status: true, payload: response }
      } catch (error) {
        return { status: false, payload: error.message }
      }
    },
    async logout() {
      try {
        const response = await auth.logout()

        return { status: true, payload: response }
      } catch (error) {
        return { status: false, payload: error.message }
      }
    }
  },
  namespaced: true
}
