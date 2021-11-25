import boards from "../../api/apiCalls/boards"

// import firebase from "firebase/app"
// import "firebase/auth"

export default {
  state: { myBoards: [], sharedBoards: [], board: null },
  getters: {
    getMyBoards(state) {
      return state.myBoards
    },
    getSharedBoards(state) {
      return state.sharedBoards
    },
    getBoard(state) {
      return state.board
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
      state.board = { id: payload.id, data: payload.data() }
    }
  },
  actions: {
    async inviteUserToBoard(context, payload) {
      try {
        const userBoards = await boards.inviteUserToBoard(payload)

        return { status: true, payload: userBoards }
      } catch (error) {
        return { status: false, payload: error.message }
      }
    },
    async getMyBoards({ commit }) {
      try {
        const userBoards = await boards.getMyBoards()
        let data = []
        userBoards.forEach(board => {
          data.push({ id: board.id, data: board.data() })
        })

        commit("setMyBoards", data)

        return { status: true, payload: userBoards }
      } catch (error) {
        return { status: false, payload: error.message }
      }
    },
    async getSharedBoards({ commit }) {
      try {
        const userBoards = await boards.getSharedBoards()
        let data = []
        userBoards.forEach(board => {
          data.push({ id: board.id, data: board.data() })
        })

        commit("setSharedBoards", data)

        return { status: true, payload: userBoards }
      } catch (error) {
        return { status: false, payload: error.message }
      }
    },
    async getBoard({ commit }, payload) {
      try {
        const board = await boards.getBoard(payload)

        commit("setBoard", board)

        return { status: true, payload: 123 }
      } catch (error) {
        return { status: false, payload: error.message }
      }
    },
    async createBoard(context, payload) {
      try {
        const response = await boards.createBoard(payload)

        return { status: true, payload: response }
      } catch (error) {
        return { status: false, payload: error.message }
      }
    }
  },
  namespaced: true
}
