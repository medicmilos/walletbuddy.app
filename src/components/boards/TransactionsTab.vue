<template>
  <v-container>
    <p class="text-h5 font-weight-black mt-10">MAKE TRANSACTION</p>
    <v-divider />
    <v-row class="pt-5">
      <Expense :board="getBoard" :boardUsers="getBoard.users" />
    </v-row>
    <v-divider class="mt-5 mb-5" />
    <v-row class="pt-5">
      <v-card>
        <v-card-title>
          <b>TRANSACTIONS HISTORY</b>
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
          :items="getBoardTransactions"
          :search="search"
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
      headers: [
        { text: "Trans. type", value: "transType" },
        { text: "Expense type", value: "expenseType" },
        { text: "Name", value: "name" },
        { text: "Amount", value: "amount" },
        { text: "From users", value: "fromUsers" },
        { text: "Date and time", value: "updatedAt" },
        { text: "Details", value: "detaiils" }
      ]
    }
  },
  created() {},
  watch: {},
  methods: {}
}
</script>

<style lang="scss"></style>
