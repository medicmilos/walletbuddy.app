import boards from "../../api/apiCalls/boards"

// import firebase from "firebase/app"
// import "firebase/auth"

export default {
  state: { boards: [], board: null },
  getters: {
    getBoards(state) {
      return state.boards
    },
    getBoard(state) {
      return state.board
    }
  },
  mutations: {
    setBoards(state, payload) {
      state.boards = payload
    },
    setBoard(state, payload) {
      state.board = { boardTitle: payload.boardTitle }
    }
  },
  actions: {
    async getBoards({ commit }) {
      try {
        const userBoards = await boards.getBoards()
        let data = []
        userBoards.forEach(board => {
          data.push({ id: board.id, data: board.data() })
        })

        commit("setBoards", data)

        return { status: true, payload: userBoards }
      } catch (error) {
        return { status: false, payload: error.message }
      }
    },
    async getBoard({ commit }, payload) {
      try {
        const board = await boards.getBoard(payload)
        console.log("board: ", board.data())
        // let data = []
        // userBoards.forEach(board => {
        //   data.push({ id: board.id, data: board.data() })
        // })

        commit("setBoard", board.data())

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
