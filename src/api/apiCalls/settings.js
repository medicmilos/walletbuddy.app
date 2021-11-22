import db from "../../firebase/firebaseInit"
//import firebase from "firebase/app"
import "firebase/auth"

export default {
  updateUserSettings(payload) {
    return db.collection("users").doc(payload.id).update(payload.payload)
  },
  getCurrentUser(payload) {
    return db.collection("users").doc(payload).get()
  }
}
