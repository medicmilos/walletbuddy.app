<template>
  <v-container>
    <p class="text-h6 font-weight-black mb-0">
      Board ballance: {{ getBoard.ballance }} RSD
    </p>
    <v-divider />
    <p class="text-h5 font-weight-black mt-10">INVITE USER TO BOARD</p>
    <v-divider />
    <v-row class="pt-5">
      <v-text-field
        class="col-6"
        label="userIntiveEmail"
        v-model="userIntiveEmail"
      />
      <v-btn @click="inviteUserByEmail" :disabled="loading">INVITE</v-btn>
    </v-row>
    <v-card>
      <v-card-title>
        <b>USERS ON BOARD</b>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="getUsersOnBoard"
        :search="search"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn @click="sendEmailReminder(item)">send reminder</v-btn>
        </template>
      </v-data-table>
    </v-card>
    <UserReminderModal />
  </v-container>
</template>

<script>
import UserReminderModal from "./UserReminderModal.vue"

export default {
  components: { UserReminderModal },
  name: "BoardTab",
  props: { getBoard: Object },
  computed: {
    getUsersOnBoard() {
      return this.$store.getters["boards/getUsersOnBoard"]
    }
  },
  data() {
    return {
      loading: false,
      userIntiveEmail: null,
      search: "",
      headers: [
        { text: "User", value: "user" },
        { text: "Ballance", value: "amount" },
        { text: "Actions", value: "actions" }
      ]
    }
  },
  created() {
    this.getBoardUsers()
  },
  watch: {},
  methods: {
    getBoardUsers() {
      this.$store.dispatch("boards/getUsersOnBoard", this.getBoard._id)
    },
    async inviteUserByEmail() {
      this.loading = true
      this.$store
        .dispatch("boards/inviteUserToBoard", {
          userEmail: this.userIntiveEmail,
          boardUID: this.getBoard._id
        })
        .then(() => {
          this.loading = false
          this.userIntiveEmail = null
          this.getBoardData()
          this.$root.$emit("actionResponse", 1, "User invited")
        })
    },
    sendEmailReminder(user) {
      const data = {
        boardUID: this.getBoard._id,
        userEmail: user.user,
        ballance: user.amount
      }
      console.log("data: ", data)
    }
  }
}
</script>

<style lang="scss"></style>
