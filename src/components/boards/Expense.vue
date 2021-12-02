<template>
  <div class="col-6">
    <v-select
      v-model="transactionType"
      :items="transactionTypeData"
      label="Transaction Type"
      persistent-hint
    ></v-select>
    <v-text-field label="Name" v-model="name" />
    <v-text-field label="Amount" v-model="amount" />
    <div v-if="transactionType == 'Income'">
      <v-select
        v-model="incomeToUser"
        :items="boardUsers"
        label="TO USER"
        persistent-hint
      ></v-select>
      <v-select
        v-model="incomeFromUser"
        :items="boardUsers"
        label="FROM USER"
        persistent-hint
      ></v-select>
    </div>
    <div v-else-if="transactionType == 'Expense'">
      <v-select
        v-model="expenseType"
        :items="expenseTypeData"
        label="Expense Type"
        persistent-hint
      ></v-select>
      <div v-if="expenseType == 'Single'">
        <v-select
          v-model="expenseFromUser"
          :items="boardUsers"
          label="FROM USER"
          persistent-hint
        ></v-select>
      </div>
      <div v-else-if="expenseType == 'Split all'">
        <v-select
          v-model="expenseFromUsers"
          :items="boardUsers"
          label="FROM USERS"
          multiple
          chips
          persistent-hint
        ></v-select>
      </div>
      <div v-else-if="expenseType == 'Custom split'">
        <div
          class="d-flex"
          v-for="(user, index) in exepnseCustomusers"
          :key="'custom-user-' + index"
        >
          <v-select
            class="col-6"
            v-model="user.user"
            :items="boardUsers"
            label="FROM USER"
            persistent-hint
          ></v-select>
          <v-text-field class="col-4" label="Amount" v-model="user.amount" />
          <v-btn class="col-2" @click="removeCustomUser(index)">RMV USR</v-btn>
        </div>
        <v-btn @click="addCustomUser">ADD USER</v-btn>
      </div>
    </div>
    <br />
    <br />
    <v-btn @click="makeTransaction">MAKE TRANSACTION</v-btn>
  </div>
</template>

<script>
export default {
  name: "Expense",
  props: { board: Object, boardUsers: Array },
  computed: {},
  data() {
    return {
      transactionType: "Expense",
      transactionTypeData: ["Income", "Expense"],
      expenseType: "Single",
      expenseTypeData: ["Single", "Split all", "Custom split"],
      name: null,
      amount: null,
      incomeToUser: null,
      incomeFromUser: null,
      expenseFromUser: null,
      expenseFromUsers: null,
      exepnseCustomusers: []
    }
  },
  created() {},
  watch: {
    expenseType() {
      this.expenseFromUser = null
      this.expenseFromUsers = null
      this.exepnseCustomusers = []
    }
  },
  methods: {
    addCustomUser() {
      this.exepnseCustomusers.push({
        user: null,
        amount: null
      })
    },
    removeCustomUser(index) {
      this.exepnseCustomusers.splice(index, 1)
    },
    makeTransaction() {
      const data = {
        boardUID: this.board._id,
        name: this.name,
        amount: parseFloat(this.amount),
        fromUser: this.expenseFromUser,
        fromUsers:
          this.expenseType == "Custom split"
            ? this.exepnseCustomusers
            : this.expenseFromUsers,
        transType: this.transactionType,
        expenseType: this.expenseType
      }

      this.$store.dispatch("transactions/makeTransaction", data).then(() => {
        this.$root.$emit("actionResponse", 1, "success")
        this.name = null
        this.amount = null
        this.incomeToUser = null
        this.incomeFromUser = null
        this.expenseFromUser = null
        this.expenseFromUsers = null
        this.exepnseCustomusers = []
      })
      this.$root.$emit("refreshBoard")
    }
  }
}
</script>

<style lang="scss"></style>
