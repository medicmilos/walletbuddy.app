import auth from "../../api/apiCalls/auth"
import firebase from "firebase/app"
import "firebase/auth"

import db from "../../firebase/firebaseInit"

export default {
  state: { isAuthenticated: false, currentUser: null },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated
    },
    getCurrentUser(state) {
      return state.currentUser
    }
  },
  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser = payload
    },
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
    async getCurrentUser({ commit }) {
      const user = await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()

      commit("setCurrentUser", user.data())
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
