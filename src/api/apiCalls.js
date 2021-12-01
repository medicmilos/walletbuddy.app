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
  //transactions
  makeTransaction(payload) {
    return baseRequest
      .post("/transactions/makeTransaction", { test: payload })
      .then(response => response.data)
  }
}
