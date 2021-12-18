<template>
  <div class="col-12 expense-page">
    <validation-observer ref="observer" v-slot="{ invalid }">
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
                <p class="mb-0">Make new expense</p>
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
                <p class="mb-0">Add new income</p>
              </div>
            </div>
          </label>
        </div>
      </div>
      <div v-if="transactionType == 'Expense'" class="container">
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
                <p class="mb-0">Single user expense</p>
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
                <p class="mb-0">Equally split between users</p>
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
                <p class="mb-0">Custom split between users</p>
              </div>
            </div>
          </label>
        </div>
      </div>

      <div v-if="transactionType == 'Income'" class="container">
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
                <p class="mb-0">Add money to single user's ballance</p>
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
                <p class="mb-0">Add money from one user to another</p>
              </div>
            </div>
          </label>
        </div>
      </div>
      <div class="mt-2 mb-2 pl-3 pr-3 d-flex justify-space-between">
        <validation-provider
          style="width: 50%"
          v-slot="{ errors }"
          name="name"
          rules="required"
        >
          <v-text-field
            :error-messages="errors"
            class="mr-3 input-text"
            v-model="name"
            label="Name"
            hide-details
            outlined
            dense
            flat
          ></v-text-field>
        </validation-provider>
        <validation-provider
          style="width: 50%"
          v-slot="{ errors }"
          name="amount"
          :rules="{ numDecimal: /^\d*(\.\d+)?$/, required: true }"
        >
          <v-text-field
            :error-messages="errors"
            class="ml-3 input-text"
            v-model="amount"
            label="Amount"
            hide-details
            outlined
            dense
            flat
            :suffix="getBoard.boardCurrency"
          ></v-text-field>
        </validation-provider>
      </div>
      <div v-if="transactionType == 'Income'" class="d-flex mt-5">
        <v-autocomplete
          v-model="incomeToUser"
          :items="boardUsers"
          label="TO USER"
          persistent-hint
          class="input-text col-6 pr-6 col-xs-12 ml-3"
          hide-details
          outlined
          dense
          flat
        ></v-autocomplete>

        <v-autocomplete
          v-if="incomeType == 'Custom'"
          v-model="expenseFromUser"
          :items="boardUsers"
          label="FROM USER"
          persistent-hint
          class="input-text col-6 pr-6 col-xs-12"
          hide-details
          outlined
          dense
          flat
        ></v-autocomplete>
      </div>

      <div v-else-if="transactionType == 'Expense'">
        <div v-if="expenseType == 'Single'">
          <v-autocomplete
            v-model="expenseFromUser"
            :items="boardUsers"
            label="FROM USER"
            persistent-hint
            class="input-text col-6 pr-6 col-xs-12 ml-3 mt-5"
            hide-details
            outlined
            dense
            flat
          ></v-autocomplete>
        </div>
        <div v-else-if="expenseType == 'Split all'">
          <v-autocomplete
            v-model="expenseFromUsers"
            :items="boardUsers"
            label="FROM USERS"
            multiple
            chips
            persistent-hint
            class="input-text col-6 pr-6 col-xs-12 ml-3 mt-5"
            hide-details
            outlined
            dense
            flat
          ></v-autocomplete>
        </div>
        <div v-else-if="expenseType == 'Custom split'">
          <div
            class="d-flex"
            v-for="(user, index) in exepnseCustomusers"
            :key="'custom-user-' + index"
          >
            <validation-provider
              class="col-6 col-xs-12 pr-3"
              v-slot="{ errors }"
              name="user.user"
              rules="required"
            >
              <v-autocomplete
                :error-messages="errors"
                v-model="user.user"
                :items="boardUsers"
                label="FROM USER"
                persistent-hint
                class="input-text"
                hide-details
                outlined
                dense
                flat
              ></v-autocomplete>
            </validation-provider>
            <validation-provider
              class="col-4"
              style="width: 100%"
              v-slot="{ errors }"
              name="user.amount"
              :rules="{ numDecimal: /^\d*(\.\d+)?$/, required: true }"
            >
              <v-text-field
                :error-messages="errors"
                class="input-text pr-5"
                label="Custom amount"
                v-model="user.amount"
                hide-details
                outlined
                dense
                flat
                :suffix="getBoard.boardCurrency"
              />
            </validation-provider>
            <v-btn
              style="width: 14%"
              class="mt-4 white--text"
              @click="removeCustomUser(index)"
              color="#513396"
              small
              :disabled="exepnseCustomusers.length == 1"
            >
              remove user
            </v-btn>
          </div>
          <v-btn
            @click="addCustomUser"
            class="custom-button ml-3 mt-3"
            color="#513396"
            dark
            small
          >
            ADD USER
          </v-btn>
        </div>
      </div>
      <p class="pl-3 mb-1 mt-5 red--text">{{ valErrorMessage }}</p>
      <v-btn
        @click="makeTransaction"
        class="white--text font-weight-bold ml-3 mt-5"
        color="#513396"
        medium
        :disabled="invalid"
        :loading="loading"
      >
        MAKE TRANSACTION
      </v-btn>
    </validation-observer>
  </div>
</template>

<script>
export default {
  name: "Expense",
  props: { board: Object, boardUsers: Array },
  computed: {
    getBoard() {
      return this.$store.getters["boards/getBoard"]
    }
  },
  data() {
    return {
      transactionType: "Expense",
      expenseType: "Single",
      name: null,
      amount: null,
      incomeToUser: null,
      expenseFromUser: null,
      expenseFromUsers: null,
      exepnseCustomusers: [
        {
          user: null,
          amount: null
        }
      ],
      incomeType: "Single",
      loading: false,
      valErrorMessage: ""
    }
  },
  created() {},
  watch: {
    expenseType() {
      this.expenseFromUser = null
      this.expenseFromUsers = null
      this.exepnseCustomusers = [
        {
          user: null,
          amount: null
        }
      ]
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
      this.$refs.observer.validate()
      this.valErrorMessage = ""

      if (this.transactionType == "Expense") {
        if (this.expenseType == "Custom split") {
          let sum = 0
          this.exepnseCustomusers.forEach(item => {
            sum += parseFloat(item.amount)
          })

          if (sum !== parseFloat(this.amount)) {
            this.valErrorMessage =
              "Whole expense amount must be shared between selected users"
            return false
          }
        }
      }

      this.valErrorMessage = ""

      const data = {
        boardUID: this.$route.params.uid,
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
      this.loading = true
      this.$store
        .dispatch("transactions/makeTransaction", data)
        .then(response => {
          this.loading = false
          if (response.status) {
            this.$root.$emit(
              "actionResponse",
              1,
              "Successfully executed new transaction"
            )

            this.name = null
            this.amount = null
            this.incomeToUser = null
            this.expenseFromUser = null
            this.expenseFromUsers = null
            this.exepnseCustomusers = []
            this.$refs.observer.reset()
            this.$root.$emit("refreshTransactions")
          } else {
            this.$root.$emit("actionResponse", 0, response.data)
          }
        })
    }
  }
}
</script>

<style lang="scss">
.expense-page {
  .theme--light.v-chip:not(.v-chip--active) {
    margin: 5px;
  }
}
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
