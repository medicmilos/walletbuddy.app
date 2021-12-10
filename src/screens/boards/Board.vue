<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12">
        <v-sheet min-height="80vh" rounded="lg" class="pa-0">
          <v-container class="board-tabs pa-7" v-if="getBoard">
            <v-toolbar flat color="tabs" dark class="rounded">
              <v-toolbar-title>
                <p class="text-h5 font-weight-black boardText--text">
                  Board: {{ getBoard.title }}
                </p>
              </v-toolbar-title>
            </v-toolbar>
            <v-tabs
              background-color="tabs accent-4"
              centered
              color="#503396"
              icons-and-text
            >
              <v-tab>
                Board
                <v-icon>mdi-clipboard</v-icon>
              </v-tab>

              <v-tab>
                Transactions
                <v-icon>mdi-cash-multiple</v-icon>
              </v-tab>

              <v-tab>
                ME
                <v-icon>mdi-account-box</v-icon>
              </v-tab>

              <v-tab-item>
                <BoardTab :getBoard="getBoard" />
              </v-tab-item>
              <v-tab-item>
                <TransactionsTab />
              </v-tab-item>
              <v-tab-item>
                <PersonalTab />
              </v-tab-item>
            </v-tabs>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BoardTab from "../../components/boards/BoardTab"
import PersonalTab from "../../components/boards/PersonalTab"
import TransactionsTab from "../../components/boards/TransactionsTab"

export default {
  components: { BoardTab, TransactionsTab, PersonalTab },
  name: "Boards",
  props: { id: String },
  computed: {
    getBoard() {
      return this.$store.getters["boards/getBoard"]
    },
    getCurrentUser() {
      return this.$store.getters["auth/getCurrentUser"]
    }
  },
  data() {
    return {
      loading: false
    }
  },
  created() {
    this.getBoardData()
    this.$on("refreshBoard", () => {
      this.getBoardData()
    })
  },
  methods: {
    async getBoardData() {
      const uid = this.$route.params.uid
      await this.$store.dispatch("boards/getBoard", uid)
      await this.$store.dispatch("transactions/getBoardTransactions", uid)
      await this.$store.dispatch("auth/getCurrentUser")
      await this.$store.dispatch("transactions/getUserBallance", {
        boardUID: uid,
        userEmail: this.getCurrentUser.email
      })
    }
  }
}
</script>

<style lang="scss">
.board-tabs .v-tabs-slider-wrapper {
  background-color: #6c5fc7 !important;
  color: #6c5fc7 !important;
  caret-color: #6c5fc7 !important;
}
</style>
