import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"

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
    checkIsAuthenticated(context) {
      console.log("123123123")
      const auth = getAuth()

      return onAuthStateChanged(auth, user => {
        console.log("ee: ", user)

        if (user) {
          context.commit("setIsAuthenticated", true)
        } else {
          context.commit("setIsAuthenticated", false)
        }
      })
    },
    login(context, payload) {
      const auth = getAuth()

      return signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then(response => {
          console.log("login: response", response)
          return { status: true, data: response }
        })
        .catch(error => {
          console.log("login: error", error)
          return { status: false, data: error }
        })
    },
    register(context, payload) {
      const auth = getAuth()

      return createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      )
        .then(response => {
          return { status: true, data: response }
        })
        .catch(error => {
          return { status: false, data: error }
        })
    },
    logout() {
      const auth = getAuth()

      return signOut(auth)
        .then(response => {
          return { status: true, data: response }
        })
        .catch(error => {
          return { status: false, data: error }
        })
    }
  },
  namespaced: true
}
