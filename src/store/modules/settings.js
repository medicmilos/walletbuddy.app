import settings from "../../api/apiCalls/settings"

import firebase from "firebase/app"
import "firebase/auth"

import { getField, updateField } from "vuex-map-fields"

export default {
  state: {
    currentUser: null,
    currentUserId: null,
    firstName: null,
    lastName: null,
    email: null
  },
  getters: { getField },
  mutations: {
    updateField,
    setCurrentUser(state, payload) {
      state.currentUserId = payload.id
      state.currentUser = payload.data()
      state.firstName = payload.data().firstName
      state.lastName = payload.data().lastName
      state.email = payload.data().email
    }
  },
  actions: {
    async getCurrentUser({ commit }) {
      const currentUserUID = firebase.auth().currentUser.uid
      const user = await settings.getCurrentUser(currentUserUID)

      commit("setCurrentUser", user)
    },
    async updateUserSettings({ state }, payload) {
      try {
        const updatedUser = await settings.updateUserSettings({
          id: state.currentUserId,
          payload
        })

        return { status: true, payload: updatedUser }
      } catch (error) {
        return { status: false, payload: error.message }
      }
    }
  },
  namespaced: true
}
