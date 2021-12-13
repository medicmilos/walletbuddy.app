import api from "../../api/apiCalls"

export default {
  state: { myBoards: [], boardTransactions: [], userBallance: 0 },
  getters: {
    getMyBoards(state) {
      return state.myBoards
    },
    getBoardTransactions(state) {
      return state.boardTransactions
    },
    getUserBallance(state) {
      return state.userBallance
    }
  },
  mutations: {
    setMyBoards(state, payload) {
      state.myBoards = payload
    },
    setBoardTransactions(state, payload) {
      state.boardTransactions = payload
    },
    setUserBallance(state, payload) {
      state.userBallance = payload
    }
  },
  actions: {
    async makeTransaction(context, payload) {
      return api
        .makeTransaction(payload)
        .then(response => {
          return { status: true, data: response }
        })
        .catch(error => {
          return { status: false, data: error }
        })
    },
    async getBoardTransactions({ commit }, payload) {
      return api
        .getBoardTransactions(payload)
        .then(response => {
          commit("setBoardTransactions", response)

          return { status: true, data: response }
        })
        .catch(error => {
          return { status: false, data: error }
        })
    },
    async getUserBallance({ commit }, payload) {
      return api
        .getUserBallance(payload)
        .then(response => {
          commit("setUserBallance", response)

          return { status: true, data: response }
        })
        .catch(error => {
          return { status: false, data: error }
        })
    }
  },
  namespaced: true
}
