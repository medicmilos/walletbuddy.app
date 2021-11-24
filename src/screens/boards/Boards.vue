<template>
  <div>
    <router-link
      v-for="board in getBoards"
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
    getBoards() {
      return this.$store.getters["boards/getBoards"]
    }
  },
  data() {
    return { boardTitle: "" }
  },
  created() {
    this.getBoardsData()
  },
  methods: {
    createBoard() {
      this.$store
        .dispatch("boards/createBoard", this.boardTitle)
        .then(response => {
          this.getBoardsData()
          if (response.status) {
            //console.log("response success app: ", response.data)
          } else {
            //console.log("response error app: ", response.data)
          }
        })
    },
    getBoardsData() {
      this.$store.dispatch("boards/getBoards")
    }
  }
}
</script>

<style lang="scss"></style>
