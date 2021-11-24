<template>
  <div v-if="getBoard">
    <p>{{ getBoard.boardTitle }} Board</p>
    <br />
    <v-divider />
    <br />
    <br />
    <br />
    <p>INVITE USERS TO BOARD</p>
    <v-text-field
      class="col-6"
      label="userIntiveEmail"
      v-model="userIntiveEmail"
    />
    <v-btn @click="inviteUserByEmail">INVITE</v-btn>
    <br />
    <br />
    <p>ADD STATIC USERS TO BOARD</p>
    <v-text-field class="col-6" label="staticUserName" v-model="staticUser" />
    <v-btn @click="addStaticUser">ADD</v-btn>
    <br />
    <br />
    <v-divider />
    <br />
    <br />
    <br />
    <p>MAKE TRANSACTION</p>
    <Expense :boardUsers="boardUsers" />
    <br />
    <br />
    <br />
    <br />

    <br />
    <br />
    <v-divider />
    <v-divider />
  </div>
</template>

<script>
import Expense from "../../components/boards/Expense"
export default {
  components: { Expense },
  name: "Boards",
  props: { id: String },
  computed: {
    getBoard() {
      return this.$store.getters["boards/getBoard"]
    }
  },
  data() {
    return {
      users: [],
      boardUsers: [
        "milos@deversity.net",
        "luka@deversity.net",
        "uros.rakovic@deversity.net",
        "andrea.filipovic@deversity.net"
      ],
      userIntiveEmail: null,
      staticUser: null
    }
  },
  created() {
    this.getBoardData(this.$route.params.uid)
  },
  methods: {
    getBoardData(uid) {
      this.$store.dispatch("boards/getBoard", uid)
    },
    inviteUserByEmail() {},
    addStaticUser() {}
  }
}
</script>

<style lang="scss"></style>
