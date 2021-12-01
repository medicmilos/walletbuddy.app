import api from "../../api/apiCalls"

export default {
  state: { myBoards: [] },
  getters: {
    getMyBoards(state) {
      return state.myBoards
    }
  },
  mutations: {
    setMyBoards(state, payload) {
      state.myBoards = payload
    }
  },
  actions: {
    async makeTransaction(context, payload) {
      return api
        .makeTransaction(payload)
        .then(response => {
          console.log(response)

          return { status: true, data: response.data }
        })
        .catch(error => {
          return { status: false, data: error }
        })
    }
  },
  namespaced: true
}
