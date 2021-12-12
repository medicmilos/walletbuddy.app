<template>
  <div class="col-12">
    <div class="container">
      <div class="plans">
        <div class="title-pan">Transaction Type</div>
        <label class="plan basic-plan" for="Expense">
          <input
            checked
            type="radio"
            v-model="transactionType"
            name="transactionType"
            id="Expense"
            value="Expense"
          />
          <div class="plan-content">
            <div class="plan-details">
              <span>Expense</span>
              <p class="mb-0">
                For smaller business, with simple salaries and pay schedules.
              </p>
            </div>
          </div>
        </label>

        <label class="plan complete-plan" for="Income">
          <input
            type="radio"
            id="Income"
            v-model="transactionType"
            name="transactionType"
            value="Income"
          />
          <div class="plan-content">
            <div class="plan-details">
              <span>Income</span>
              <p class="mb-0">
                For growing business who wants to create a rewarding place to
                work.
              </p>
            </div>
          </div>
        </label>
      </div>
    </div>
    <!-- <v-select
      v-model="transactionType"
      :items="transactionTypeData"
      label="Transaction Type"
      persistent-hint
    ></v-select> -->
    <div class="mt-2 mb-2 pl-3 pr-3 d-flex justify-space-between">
      <v-text-field
        class="mr-3 input-text"
        v-model="name"
        label="Name"
        hide-details
        outlined
        dense
        flat
      ></v-text-field>
      <v-text-field
        class="ml-3 input-text"
        v-model="amount"
        label="Amount"
        hide-details
        outlined
        dense
        flat
      ></v-text-field>
    </div>
    <div v-if="transactionType == 'Income'">
      <div class="container">
        <div class="plans">
          <div class="title-pan">Income Type</div>
          <label class="plan complete-plan" for="Single">
            <input
              type="radio"
              id="Single"
              v-model="incomeType"
              name="incomeType"
              value="Single"
            />

            <div class="plan-content">
              <div class="plan-details">
                <span>Single</span>
                <p class="mb-0">
                  For growing business who wants to create a rewarding place to
                  work.
                </p>
              </div>
            </div>
          </label>
          <label class="plan complete-plan" for="Custom">
            <input
              type="radio"
              id="Custom"
              v-model="incomeType"
              name="incomeType"
              value="Custom"
            />
            <div class="plan-content">
              <div class="plan-details">
                <span>Custom</span>
                <p class="mb-0">
                  For growing business who wants to create a rewarding place to
                  work.
                </p>
              </div>
            </div>
          </label>
        </div>
      </div>
      <!-- <v-select
        v-model="incomeType"
        :items="incomeTypeData"
        label="Income Type"
        persistent-hint
      ></v-select>
       -->
      <v-select
        v-model="incomeToUser"
        :items="boardUsers"
        label="TO USER"
        persistent-hint
      ></v-select>
      <div v-if="incomeType == 'Custom'">
        <v-select
          v-model="expenseFromUser"
          :items="boardUsers"
          label="FROM USER"
          persistent-hint
        ></v-select>
      </div>
    </div>
    <div v-else-if="transactionType == 'Expense'">
      <div class="container">
        <div class="plans three-plans">
          <div class="title-pan">Expense Type</div>
          <label class="plan complete-plan" for="Single">
            <input
              type="radio"
              id="Single"
              v-model="expenseType"
              name="expenseType"
              value="Single"
            />

            <div class="plan-content">
              <div class="plan-details">
                <span>Single</span>
                <p class="mb-0">
                  For growing business who wants to create a rewarding place to
                  work.
                </p>
              </div>
            </div>
          </label>
          <label class="plan complete-plan" for="Split all">
            <input
              type="radio"
              id="Split all"
              v-model="expenseType"
              name="expenseType"
              value="Split all"
            />
            <div class="plan-content">
              <div class="plan-details">
                <span>Split all</span>
                <p class="mb-0">
                  Equally split between users
                </p>
              </div>
            </div>
          </label>
          <label class="plan complete-plan" for="Custom split">
            <input
              type="radio"
              id="Custom split"
              v-model="expenseType"
              name="expenseType"
              value="Custom split"
            />
            <div class="plan-content">
              <div class="plan-details">
                <span>Custom split</span>
                <p class="mb-0">
                  For growing business who wants to create a rewarding place to
                  work.
                </p>
              </div>
            </div>
          </label>
        </div>
      </div>
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
      expenseType: "Single",
      expenseTypeData: ["Single", "Split all", "Custom split"],
      name: null,
      amount: null,
      incomeToUser: null,
      expenseFromUser: null,
      expenseFromUsers: null,
      exepnseCustomusers: [],
      incomeType: "Single",
      incomeTypeData: ["Single", "Custom"]
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
        expenseType: this.expenseType,
        incomeType: this.incomeType,
        incomeToUser: this.incomeToUser
      }

      this.$store.dispatch("transactions/makeTransaction", data).then(() => {
        this.$root.$emit("refreshBoard")
        this.$root.$emit("refreshTransTab")

        this.$root.$emit("actionResponse", 1, "success")
        this.name = null
        this.amount = null
        this.incomeToUser = null
        this.expenseFromUser = null
        this.expenseFromUsers = null
        this.exepnseCustomusers = []
      })
    }
  }
}
</script>

<style lang="scss">
.plans {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.plans .plan input[type="radio"] {
  position: absolute;
  opacity: 0;
}

.plans .plan {
  cursor: pointer;
  width: 48.5%;
}

.plans.three-plans .plan {
  width: 31.5%;
}

.plans .plan .plan-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 2px solid #e1e2e7;
  border-radius: 10px;
  -webkit-transition: -webkit-box-shadow 0.4s;
  transition: -webkit-box-shadow 0.4s;
  -o-transition: box-shadow 0.4s;
  transition: box-shadow 0.4s;
  transition: box-shadow 0.4s, -webkit-box-shadow 0.4s;
  position: relative;
}

.plans .plan .plan-content img {
  margin-right: 30px;
  height: 72px;
}

.plans .plan .plan-details span {
  margin-bottom: 5px;
  display: block;
  font-size: 17px;
  line-height: 24px;
  color: #252f42;
}

.container .title-pan {
  font-size: 16px;
  font-weight: 500;
  -ms-flex-preferred-size: 100%;
  flex-basis: 100%;
  color: #252f42;
  margin-bottom: 10px;
}

.plans .plan .plan-details p {
  color: #646a79;
  font-size: 13px;
  line-height: 18px;
}

.plans .plan .plan-content:hover {
  -webkit-box-shadow: 0px 3px 5px 0px #e8e8e8;
  box-shadow: 0px 3px 5px 0px #e8e8e8;
}

.plans .plan input[type="radio"]:checked + .plan-content:after {
  content: "";
  position: absolute;
  height: 16px;
  width: 16px;
  background: #503396;
  right: 20px;
  top: 20px;
  border-radius: 100%;
  border: 3px solid #fff;
  -webkit-box-shadow: 0px 0px 0px 2px #503396;
  box-shadow: 0px 0px 0px 2px #503396;
}

.plans .plan input[type="radio"]:checked + .plan-content {
  border: 2px solid #503396;
  background: #eaf1fe;
  -webkit-transition: ease-in 0.3s;
  -o-transition: ease-in 0.3s;
  transition: ease-in 0.3s;
}

@media screen and (max-width: 991px) {
  .plans {
    margin: 0 20px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    padding: 40px;
  }

  .plans .plan {
    cursor: pointer;
    width: 100%;
  }

  .plans.three-plans .plan {
    width: 100%;
  }

  .plans .plan {
    width: 100%;
  }

  .plan.complete-plan {
    margin-top: 20px;
  }

  .plans .plan .plan-content .plan-details {
    width: 70%;
    display: inline-block;
  }

  .plans .plan input[type="radio"]:checked + .plan-content:after {
    top: 45%;
    -webkit-transform: translate(-50%);
    -ms-transform: translate(-50%);
    transform: translate(-50%);
  }
}

@media screen and (max-width: 767px) {
  .plans .plan .plan-content .plan-details {
    width: 60%;
    display: inline-block;
  }
}

@media screen and (max-width: 540px) {
  .plans .plan .plan-content img {
    margin-bottom: 20px;
    height: 56px;
    -webkit-transition: height 0.4s;
    -o-transition: height 0.4s;
    transition: height 0.4s;
  }

  .plans .plan input[type="radio"]:checked + .plan-content:after {
    top: 20px;
    right: 10px;
  }

  .plans .plan .plan-content .plan-details {
    width: 100%;
  }

  .plans .plan .plan-content {
    padding: 20px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: baseline;
    -ms-flex-align: baseline;
    align-items: baseline;
  }
}
</style>
