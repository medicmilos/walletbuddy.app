<template>
  <div>
    <p>eeeeeee</p>
    <p>eeeeeee</p>
    <p>eeeeeee</p>
    <p>eeeeeee</p>
    <p>eeeeeee</p>
    <p>eeeeeee</p>
    <p>eeeeeee</p>
    <p>eeeeeee</p>
    <br />
    <v-text-field v-model="boardTitle" label="Board title" />
    <v-btn @click="createBoard">create board</v-btn>
    <br />
  </div>
</template>

<script>
export default {
  name: "Boards",
  computed: {},
  data() {
    return { boardTitle: "" }
  },
  methods: {
    createBoard() {
      this.$store.dispatch("boards/getBoards", 123123123).then(response => {
        if (response.status) {
          //console.log("response success app: ", response.data)
        } else {
          //console.log("response error app: ", response.data)
        }
      })
    }
  }
}
</script>

<style lang="scss"></style>
