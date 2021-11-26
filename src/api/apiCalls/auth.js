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
      userEmail: payload.email,
      userUID: registeredUser.user.uid
    })
  },
  forgotPassword(payload) {
    return firebase.auth().sendPasswordResetEmail(payload.email)
  },
  logout() {
    return firebase.auth().signOut()
  },
  async checkIsUserInvited(registeredUser, email) {
    const userInvite = await db
      .collection("usersInvites")
      .where("userEmail", "==", email)
      .get()

    let invited = null
    userInvite.forEach(user => {
      invited = { id: user.id, data: user.data() }
    })

    if (invited) {
      if (!invited.registered) {
        await db.collection("usersInvites").doc(invited.id).update({
          registered: true
        })

        await db
          .collection("boards")
          .doc(invited.data.boardUID)
          .collection("usersOnBoard")
          .doc(registeredUser.user.uid)
          .set({ userEmail: email, userUID: registeredUser.user.uid })
      }
    }
  }
}
