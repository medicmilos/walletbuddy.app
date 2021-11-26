<template>
  <div>
    <p>my boards</p>
    <router-link
      v-for="board in getMyBoards"
      :key="board.id"
      :to="{
        name: 'board',
        params: { uid: board.id }
      }"
    >
      <p>{{ board.id }}</p>
    </router-link>
    <br />
    <p>boards shared with me</p>
    <router-link
      v-for="board in getSharedBoards"
      :key="board.id"
      :to="{
        name: 'board',
        params: { uid: board.id }
      }"
    >
      <p>{{ board.id }}</p>
    </router-link>

    <br />
    <v-text-field v-model="boardTitle" label="Board title" />
    <v-btn @click="createBoard">create board</v-btn>
    <br />
  </div>
</template>

<script>
export default {
  name: "Boards",
  computed: {
    getMyBoards() {
      return this.$store.getters["boards/getMyBoards"]
    },
    getSharedBoards() {
      return this.$store.getters["boards/getSharedBoards"]
    }
  },
  data() {
    return { boardTitle: "" }
  },
  created() {
    this.getMyBoardsData()
    this.getSharedBoardsData()
  },
  methods: {
    createBoard() {
      this.$store
        .dispatch("boards/createBoard", this.boardTitle)
        .then(response => {
          this.getMyBoardsData()
          if (response.status) {
            //console.log("response success app: ", response.data)
          } else {
            //console.log("response error app: ", response.data)
          }
        })
    },
    getMyBoardsData() {
      this.$store.dispatch("boards/getMyBoards")
    },
    getSharedBoardsData() {
      this.$store.dispatch("boards/getSharedBoards")
    }
  }
}
</script>

<style lang="scss"></style>
