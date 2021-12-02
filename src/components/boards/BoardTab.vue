<template>
  <v-container>
    <p class="text-h6 font-weight-black mb-0">
      Ballance: {{ getBoard.ballance }} RSD
    </p>
    <v-divider />
    <p class="text-h5 font-weight-black mt-10">INVITE USERS TO BOARD</p>
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
      <v-data-table :headers="headers" :items="getBoard.users" :search="search">
        <template v-slot:[`item.updatedAt`]="{ item }">
          {{ moment(item.updatedAt).format("DD.MM.YYYY. HH:mm") }}
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "BoardTab",
  props: { getBoard: Object },
  computed: {},
  data() {
    return {
      loading: false,
      userIntiveEmail: null,
      search: "",
      headers: [
        { text: "User", value: "item" },
        { text: "Date and time", value: "updatedAt" }
      ]
    }
  },
  created() {},
  watch: {},
  methods: {
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
    }
  }
}
</script>

<style lang="scss"></style>
