import db from "../../firebase/firebaseInit"
import firebase from "firebase/app"
import "firebase/auth"

export default {
  getBoards() {
    return db
      .collection("boards")
      .where("boardOwner", "==", "users/" + firebase.auth().currentUser.uid)
      .get()
  },
  getBoard(payload) {
    console.log(payload)
    return db.collection("boards").doc(payload).get()
  },
  async createBoard(payload) {
    const newBoard = await db.collection("boards").add({
      boardTitle: payload,
      boardOwner: "users/" + firebase.auth().currentUser.uid
    })

    await db
      .collection("boards")
      .doc(newBoard.id)
      .collection("expenses")
      .add({ users: [], expenses: [] })
  }
}
