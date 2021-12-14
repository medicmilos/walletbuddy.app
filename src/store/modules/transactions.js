import api from "../../api/apiCalls"

export default {
  state: {
    myBoards: [],
    boardTransactions: [],
    userBallance: 0,
    personalTransactions: []
  },
  getters: {
    getMyBoards(state) {
      return state.myBoards
    },
    getBoardTransactions(state) {
      return state.boardTransactions
    },
    getUserBallance(state) {
      return state.userBallance
    },
    getPersonalTransactions(state) {
      return state.personalTransactions
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
    },
    setPersonalTransactions(state, payload) {
      state.personalTransactions = payload
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
    },
    async getPersonalTransactions({ commit }, payload) {
      return api
        .getPersonalTransactions(payload)
        .then(response => {
          commit("setPersonalTransactions", response)

          return { status: true, data: response }
        })
        .catch(error => {
          return { status: false, data: error }
        })
    }
  },
  namespaced: true
}
