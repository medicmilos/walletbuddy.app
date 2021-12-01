<template>
  <div class="col-6">
    <v-select
      v-model="transactionType"
      :items="transactionTypeData"
      label="Transaction Type"
      persistent-hint
    ></v-select>
    <v-text-field label="Title" v-model="title" />
    <v-text-field label="Amount" v-model="amount" />
    <div v-if="transactionType == 'income'">
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
    <div v-else-if="transactionType == 'expense'">
      <v-select
        v-model="expenseType"
        :items="expenseTypeData"
        label="Expense Type"
        persistent-hint
      ></v-select>
      <div v-if="expenseType == 'single'">
        <v-select
          v-model="expenseFromUser"
          :items="boardUsers"
          label="FROM USER"
          persistent-hint
        ></v-select>
      </div>
      <div v-else-if="expenseType == 'split all'">
        <v-select
          v-model="expenseFromUsers"
          :items="boardUsers"
          label="FROM USERS"
          multiple
          chips
          persistent-hint
        ></v-select>
      </div>
      <div v-else-if="expenseType == 'split custom'">
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
  props: { boardUsers: Array },
  computed: {},
  data() {
    return {
      transactionType: "expense",
      transactionTypeData: ["income", "expense"],
      expenseType: "split custom",
      expenseTypeData: ["single", "split all", "split custom"],
      title: null,
      amount: null,
      incomeToUser: null,
      incomeFromUser: null,
      expenseFromUser: null,
      expenseFromUsers: null,
      exepnseCustomusers: []
    }
  },
  created() {},
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
      this.$store.dispatch("transactions/makeTransaction", 11111).then(() => {
        this.$root.$emit("actionResponse", 1, "success")
      })
    }
  }
}
</script>

<style lang="scss"></style>
