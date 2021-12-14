<template>
  <v-container>
    <p class="font-weight-bold mb-0 board-ballance mt-2 pb-3">
      Make transaction
    </p>
    <v-divider />
    <v-row class="pt-5">
      <Expense :board="getBoard" :boardUsers="getBoard.users" />
    </v-row>
    <v-divider class="mt-5 mb-5" />
    <v-row class="pt-5">
      <v-card class="ml-3 mr-3 mb-5">
        <v-card-title>
          <p class="users-table-title">Board transactions history</p>
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
          :items="getBoardTransactions"
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

          <template v-slot:[`item.updatedAt`]="{ item }">
            {{ moment(item.updatedAt).format("DD.MM.YYYY. HH:mm") }}
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
            {{
              item.transType == "Income" ? item.incomeType : item.expenseType
            }}
          </template>
        </v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import Expense from "./Expense"

export default {
  components: { Expense },
  name: "TransactionsTab",
  props: {},
  computed: {
    getBoard() {
      return this.$store.getters["boards/getBoard"]
    },
    getBoardTransactions() {
      return this.$store.getters["transactions/getBoardTransactions"]
    }
  },
  data() {
    return {
      search: "",
      tableKey: 0,
      headers: [
        { text: "Transaction", value: "transType" },
        { text: "Trans. type", value: "expenseType" },
        { text: "Name", value: "name" },
        { text: "Amount", value: "amount" },
        { text: "From", value: "fromUsers" },
        { text: "To", value: "incomeToUser" },
        { text: "Date and time", value: "updatedAt" },
        { text: "Details", value: "detaiils" }
      ]
    }
  },
  created() {
    this.$root.$on("refreshTransTab", () => {
      this.tableKey++
    })
  },
  methods: {}
}
</script>

<style lang="scss"></style>
