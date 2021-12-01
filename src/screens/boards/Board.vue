<template>
  <v-container v-if="getBoard">
    <p class="text-h5 font-weight-black">Board: {{ getBoard.title }}</p>
    <p class="text-h6 font-weight-black mb-0">
      Board Ballance: {{ getBoard.ballance }} RSD
    </p>
    <p class="text-h6 font-weight-black">My Ballance: 1 RSD</p>
    <v-divider />
    <p class="text-h5 font-weight-black mt-10">INVITE USERS TO BOARD</p>
    <v-divider />
    <v-row class="pt-5">
      <v-text-field
        class="col-6"
        label="userIntiveEmail"
        v-model="userIntiveEmail"
      />
      <v-btn @click="inviteUserByEmail">INVITE</v-btn>
    </v-row>
    <p class="text-h5 font-weight-black mt-10">MAKE TRANSACTION</p>
    <v-divider />
    <v-row class="pt-5">
      <Expense :boardUsers="boardUsers" />
    </v-row>
    <p class="text-h5 font-weight-black mt-10">BOARD TRANSACTIONS</p>
    <v-divider />
    <v-row class="pt-5">.......................</v-row>
  </v-container>
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
    async inviteUserByEmail() {
      this.$store
        .dispatch("boards/inviteUserToBoard", {
          userEmail: this.userIntiveEmail,
          boardUID: this.getBoard._id
        })
        .then(() => {
          this.$root.$emit("actionResponse", 1, "User invited")
        })
    },
    addStaticUser() {}
  }
}
</script>

<style lang="scss"></style>
