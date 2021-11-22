import db from "../../firebase/firebaseInit"
import firebase from "firebase/app"
import "firebase/auth"

export default {
  login(payload) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
  },
  registerUser(payload) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
  },
  createUser(registeredUser, payload) {
    return db.collection("users").doc(registeredUser.user.uid).set({
      email: payload.email
    })
  },
  forgotPassword(payload) {
    return firebase.auth().sendPasswordResetEmail(payload.email)
  },
  logout() {
    return firebase.auth().signOut()
  }
}
