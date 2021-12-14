import { baseRequest } from "./api"

export default {
  //auth
  login(payload) {
    return baseRequest
      .post("/user/login", payload)
      .then(response => response.data)
  },
  getCurrentUser() {
    return baseRequest
      .get("/user/getCurrentUser")
      .then(response => response.data)
  },
  register(payload) {
    return baseRequest
      .post("/user/register", payload)
      .then(response => response.data)
  },
  //boards
  createNewBoard(payload) {
    return baseRequest
      .post("/boards/createNewBoard", payload)
      .then(response => response.data)
  },
  getMyBoards(payload) {
    return baseRequest
      .get("/boards/getMyBoards?boardUID=" + payload)
      .then(response => response.data)
  },
  getSharedBoards(payload) {
    return baseRequest
      .get("/boards/getSharedBoards?email=" + payload)
      .then(response => response.data)
  },
  getBoard(payload) {
    return baseRequest
      .get("/boards/getBoard?boardUID=" + payload)
      .then(response => response.data)
  },
  inviteUserToBoard(payload) {
    return baseRequest
      .post("/boards/inviteUserToBoard", payload)
      .then(response => response.data)
  },
  getUsersOnBoard(payload) {
    return baseRequest
      .get("/boards/getUsersOnBoard?boardUID=" + payload)
      .then(response => response.data)
  },
  sendEmailReminder(payload) {
    return baseRequest
      .post("/boards/sendEmailReminder", payload)
      .then(response => response.data)
  },
  //transactions
  makeTransaction(payload) {
    return baseRequest
      .post("/transactions/makeTransaction", payload)
      .then(response => response.data)
  },
  getBoardTransactions(payload) {
    return baseRequest
      .get("/transactions/getBoardTransactions?boardUID=" + payload)
      .then(response => response.data)
  },
  getUserBallance(payload) {
    return baseRequest
      .get(
        "/transactions/getUserBallance?boardUID=" +
          payload.boardUID +
          "&userEmail=" +
          payload.userEmail
      )
      .then(response => response.data)
  },
  getPersonalTransactions(payload) {
    return baseRequest
      .get(
        "/transactions/getPersonalTransactions?boardUID=" +
          payload.boardUID +
          "&userEmail=" +
          payload.userEmail
      )
      .then(response => response.data)
  }
}
