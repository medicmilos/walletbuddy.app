import api from "../../api/apiCalls"

export default {
  state: {
    myBoards: [],
    sharedBoards: [],
    board: null,
    usersOnBoard: [],
    analyticsTotalSum: []
  },
  getters: {
    getMyBoards(state) {
      return state.myBoards
    },
    getSharedBoards(state) {
      return state.sharedBoards
    },
    getBoard(state) {
      return state.board
    },
    getUsersOnBoard(state) {
      return state.usersOnBoard
    },
    analyticsTotalSum(state) {
      return state.analyticsTotalSum
    }
  },
  mutations: {
    setMyBoards(state, payload) {
      state.myBoards = payload
    },
    setSharedBoards(state, payload) {
      state.sharedBoards = payload
    },
    setBoard(state, payload) {
      state.board = payload
    },
    setUsersOnBoard(state, payload) {
      state.usersOnBoard = payload
    },
    setAnalyticsTotalSum(state, payload) {
      state.analyticsTotalSum = payload
    }
  },
  actions: {
    async inviteUserToBoard(context, payload) {
      return api
        .inviteUserToBoard(payload)
        .then(response => {
          return { status: true, data: response.data }
        })
        .catch(error => {
          return { status: false, data: error }
        })
    },
    async getMyBoards({ commit }, payload) {
      return api
        .getMyBoards(payload)
        .then(response => {
          commit("setMyBoards", response)

          return { status: true, data: response.data }
        })
        .catch(error => {
          return { status: false, data: error }
        })
    },
    async getSharedBoards({ commit }, payload) {
      return api
        .getSharedBoards(payload)
        .then(response => {
          commit("setSharedBoards", response)

          return { status: true, data: response.data }
        })
        .catch(error => {
          return { status: false, data: error }
        })
    },
    async getBoard({ commit }, payload) {
      return api
        .getBoard(payload)
        .then(response => {
          commit("setBoard", response[0])

          return { status: true, data: response.data }
        })
        .catch(error => {
          return { status: false, data: error }
        })
    },
    async createNewBoard(context, payload) {
      return api
        .createNewBoard(payload)
        .then(response => {
          return { status: true, data: response }
        })
        .catch(error => {
          return { status: false, data: error }
        })
    },
    async getUsersOnBoard({ commit }, payload) {
      return api
        .getUsersOnBoard(payload)
        .then(response => {
          commit("setUsersOnBoard", response)

          return { status: true, data: response.data }
        })
        .catch(error => {
          return { status: false, data: error }
        })
    },
    async sendEmailReminder(context, payload) {
      return api
        .sendEmailReminder(payload)
        .then(response => {
          return { status: true, data: response.data }
        })
        .catch(error => {
          return { status: false, data: error }
        })
    },
    async analyticsTotalSum({ commit }, payload) {
      return api
        .analyticsTotalSum(payload)
        .then(response => {
          commit("setAnalyticsTotalSum", response)

          return { status: true, data: response.data }
        })
        .catch(error => {
          return { status: false, data: error }
        })
    }
  },
  namespaced: true
}
