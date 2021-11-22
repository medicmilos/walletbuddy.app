import boards from "../../api/apiCalls/boards"

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async getBoards(context, payload) {
      try {
        const response = await boards.getBoards(payload)
        return { status: true, payload: response }
      } catch (error) {
        return { status: false, payload: error.message }
      }
    }
  },
  namespaced: true
}
