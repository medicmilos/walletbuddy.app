<template>
  <div>
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
    }
  },
  data() {
    return { boardTitle: "" }
  },
  created() {
    this.getMyBoardsData()
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
    }
  }
}
</script>

<style lang="scss"></style>
