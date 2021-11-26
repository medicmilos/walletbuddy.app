import db from "../../firebase/firebaseInit"
import firebase from "firebase/app"
import "firebase/auth"

export default {
  async getMyBoards() {
    const query = await db
      .collection("boards")
      .where("boardOwnerUID", "==", firebase.auth().currentUser.uid)
      .get()

    return query
  },
  async getSharedBoards() {
    const query = await db.collectionGroup("usersOnBoard").get()

    let data = []
    query.forEach(board => {
      data.push({ id: board.id, data: board.data() })
    })

    data = data.filter(item => item.id == firebase.auth().currentUser.uid)

    console.log("data: ", data)

    return data
  },
  getBoard(payload) {
    return db.collection("boards").doc(payload).get()
  },
  async createBoard(payload) {
    await db.collection("boards").add({
      boardTitle: payload,
      boardOwnerUID: firebase.auth().currentUser.uid,
      balance: 0
    })

    // await db
    //   .collection("boards")
    //   .doc(newBoard.id)
    //   .collection("transactions")
    //   .add({ users: [], expenses: [] })
  },
  async inviteUserToBoard(payload) {
    await db.collection("usersInvites").doc(payload.boardUID).set(payload)
  }
}
