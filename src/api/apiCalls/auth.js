import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"

export default {
  login(payload) {
    const auth = getAuth()
    return signInWithEmailAndPassword(auth, payload.email, payload.password)
  },
  register(payload) {
    const auth = getAuth()
    return createUserWithEmailAndPassword(auth, payload.email, payload.password)
  },
  logout() {
    const auth = getAuth()
    return signOut(auth)
  }
}
