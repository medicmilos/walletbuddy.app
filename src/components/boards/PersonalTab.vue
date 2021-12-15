<template>
  <v-container>
    <p class="font-weight-bold mb-0 board-ballance">
      My Ballance:

      <span>{{ eRs(getUserBallance) }}</span>
      &nbsp;
      <span>{{ getBoard.boardCurrency }}</span>
    </p>
    <v-divider class="mb-5 mt-5" />

    <v-card class="ml-3 mr-3 mb-5">
      <v-card-title>
        <p class="users-table-title">My transactions history</p>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          hide-details
          outlined
          dense
          flat
          class="input-text col-4"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="getPersonalTransactions"
        :search="search"
        :key="tableKey + 'tbl'"
        style="width: 100%"
      >
        <template v-slot:[`item.transType`]="{ item }">
          <v-chip v-if="item.transType == 'Expense'" color="red" dark>
            {{ item.transType }}
          </v-chip>
          <v-chip v-if="item.transType == 'Income'" color="green" dark>
            {{ item.transType }}
          </v-chip>
        </template>
        <template v-slot:[`item.amount`]="{ item }">
          {{ item.amount }} {{ getBoard.boardCurrency }}
        </template>
        <template v-slot:[`item.updatedAt`]="{ item }">
          {{ moment(item.updatedAt).format("DD.MM.YYYY.") }}
        </template>

        <template v-slot:[`item.fromUsers`]="{ item }">
          <span v-if="item.fromUser">
            {{ item.fromUser }}
          </span>
          <slot v-if="item.fromUsers">
            <span
              v-for="(item, index) in item.fromUsers"
              :key="index + '' + item"
            >
              {{ typeof item == "string" ? item : item.user }},
            </span>
          </slot>
        </template>
        <template v-slot:[`item.incomeToUser`]="{ item }">
          {{ item.incomeToUser ? item.incomeToUser : "" }}
        </template>

        <template v-slot:[`item.expenseType`]="{ item }">
          {{ item.transType == "Income" ? item.incomeType : item.expenseType }}
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "PersonalTab",
  props: {},
  computed: {
    getUserBallance() {
      return this.$store.getters["transactions/getUserBallance"]
    },
    getBoard() {
      return this.$store.getters["boards/getBoard"]
    },
    getBoardTransactions() {
      return this.$store.getters["transactions/getBoardTransactions"]
    },
    getCurrentUser() {
      return this.$store.getters["auth/getCurrentUser"]
    },
    getPersonalTransactions() {
      return this.$store.getters["transactions/getPersonalTransactions"]
    }
  },
  data() {
    return {
      search: "",
      tableKey: 0,
      headers: [
        { text: "Transaction", value: "transType" },
        { text: "Trans. type", value: "expenseType" },
        { text: "Name", value: "name", width: "20%" },
        { text: "Amount", value: "amount", width: "15%" },
        { text: "From", value: "fromUsers" },
        { text: "To", value: "incomeToUser" },
        { text: "Date", value: "updatedAt" },
        { text: "Details", value: "detaiils" }
      ]
    }
  },
  created() {
    this.$root.$on("refreshPersonalTab", () => {
      this.personalTransactionsData()
    })
    this.personalTransactionsData()
  },
  watch: {},
  methods: {
    personalTransactionsData() {
      this.$store.dispatch("transactions/getPersonalTransactions", {
        userEmail: this.getCurrentUser.email,
        boardUID: this.getBoard._id
      })
    },
    eRs(x) {
      let numb = Math.round(x * 100) / 100
      let local = numb.toLocaleString("sr-RS", {
        minimumFractionDigits: 2
      })

      return local
    }
  }
}
</script>

<style lang="scss"></style>
