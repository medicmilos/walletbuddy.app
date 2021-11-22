import db from "../../firebase/firebaseInit"
import firebase from "firebase/app"
import "firebase/auth"

export default {
  async getBoards() {
    console.log("firebase: ")

    // const citiesCol = collection(db, "boards")
    // const citySnapshot = await getDocs(citiesCol)
    // const cityList = citySnapshot.docs.map(doc => doc.data())
    // return cityList

    return true
  },
  createUser(registeredUser, payload) {
    return db.collection("users").doc(registeredUser.user.uid).set({
      email: payload.email
    })
  },
  login(payload) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
  }
}
