<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12">
        <v-sheet min-height="80vh" rounded="lg" class="pa-0">
          <v-container class="boards-page pa-7">
            <p
              style="font-size: 24px"
              class="font-weight-black mt-1 mb-1"
              v-if="getCurrentUser"
            >
              Welcome back {{ getCurrentUser.email }}
            </p>
            <v-divider class="mt-5 mb-5" />
            <p class="font-weight-bold mb-0 board-ballance mt-2 pb-3">
              Create new board
            </p>
            <v-divider />
            <validation-observer ref="observer" v-slot="{ invalid }">
              <div class="d-flex pt-5">
                <validation-provider
                  v-slot="{ errors }"
                  name="boardTitle"
                  rules="required"
                  style="width: 40%"
                >
                  <v-text-field
                    v-model="boardTitle"
                    label="Board title"
                    :error-messages="errors"
                    outlined
                    dense
                    flat
                    class="input-text"
                    @blur="$refs.observer.reset()"
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="boardCurrency"
                  rules="required"
                  style="width: 17%"
                >
                  <v-autocomplete
                    v-model="boardCurrency"
                    :items="boardCurrencyData"
                    label="Currency"
                    :error-messages="errors"
                    outlined
                    dense
                    flat
                    class="input-text ml-5"
                    @blur="$refs.observer.reset()"
                  ></v-autocomplete>
                </validation-provider>
                <v-btn
                  class="ml-2 mt-2 font-weight-bold white--text"
                  @click="createBoard"
                  :disabled="invalid"
                  :loading="loading"
                  color="#513396"
                  small
                >
                  CREATE
                </v-btn>
              </div>
            </validation-observer>

            <v-divider class="mt-5 mb-5" />
            <p style="font-size: 22px" class="font-weight-black mt-5">
              My boards
            </p>

            <v-row class="pt-5" v-if="getMyBoards.length">
              <v-col
                v-for="board in getMyBoards"
                :key="board.id"
                cols="4"
                xs="12"
              >
                <v-card shaped>
                  <v-card-text>
                    <p style="font-size: 26px" class="mb-3 text--primary">
                      {{ board.title }}
                    </p>
                    <p class="mb-1">
                      {{ board.users.length }}
                      {{ board.users.length == 1 ? "user" : "users" }}
                    </p>
                    <div class="text--primary">
                      {{ eRs(board.ballance) }} {{ board.boardCurrency }}
                    </div>
                  </v-card-text>
                  <v-card-actions class="text-right">
                    <router-link
                      :to="{
                        name: 'board',
                        params: { uid: board._id }
                      }"
                    >
                      <v-btn dark small color="deep-purple accent-4">
                        OPEN
                      </v-btn>
                    </router-link>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <p v-else class="mt-1">No boards to show.</p>
            <v-divider class="mt-5 mb-5" />
            <p style="font-size: 22px" class="font-weight-black">
              Boards shared with me
            </p>

            <v-row class="pt-5" v-if="getSharedBoards.length">
              <v-col
                v-for="board in getSharedBoards"
                :key="board.id"
                cols="4"
                xs="12"
              >
                <v-card shaped>
                  <v-card-text>
                    <p style="font-size: 26px" class="mb-3 text--primary">
                      {{ board.title }}
                    </p>
                    <p class="mb-1">
                      {{ board.users.length }}
                      {{ board.users.length == 1 ? "user" : "users" }}
                    </p>
                    <div class="text--primary">
                      {{ eRs(board.ballance) }} {{ board.boardCurrency }}
                    </div>
                  </v-card-text>
                  <v-card-actions class="text-right">
                    <router-link
                      :to="{
                        name: 'board',
                        params: { uid: board._id }
                      }"
                    >
                      <v-btn dark small color="deep-purple accent-4">
                        OPEN
                      </v-btn>
                    </router-link>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <p v-else class="mt-1">No boards to show.</p>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Boards",
  computed: {
    getMyBoards() {
      return this.$store.getters["boards/getMyBoards"]
    },
    getSharedBoards() {
      return this.$store.getters["boards/getSharedBoards"]
    },
    getCurrentUser() {
      return this.$store.getters["auth/getCurrentUser"]
    }
  },
  data() {
    return {
      boardTitle: "",
      loading: false,
      boardCurrency: null,
      boardCurrencyData: [
        "ALL",
        "AFN",
        "ARS",
        "AWG",
        "AUD",
        "AZN",
        "BSD",
        "BBD",
        "BDT",
        "BYR",
        "BZD",
        "BMD",
        "BOB",
        "BAM",
        "BWP",
        "BGN",
        "BRL",
        "BND",
        "KHR",
        "CAD",
        "KYD",
        "CLP",
        "CNY",
        "COP",
        "CRC",
        "HRK",
        "CUP",
        "CZK",
        "DKK",
        "DOP",
        "XCD",
        "EGP",
        "SVC",
        "EEK",
        "EUR",
        "FKP",
        "FJD",
        "GHC",
        "GIP",
        "GTQ",
        "GGP",
        "GYD",
        "HNL",
        "HKD",
        "HUF",
        "ISK",
        "INR",
        "IDR",
        "IRR",
        "IMP",
        "ILS",
        "JMD",
        "JPY",
        "JEP",
        "KZT",
        "KPW",
        "KRW",
        "KGS",
        "LAK",
        "LVL",
        "LBP",
        "LRD",
        "LTL",
        "MKD",
        "MYR",
        "MUR",
        "MXN",
        "MNT",
        "MZN",
        "NAD",
        "NPR",
        "ANG",
        "NZD",
        "NIO",
        "NGN",
        "NOK",
        "OMR",
        "PKR",
        "PAB",
        "PYG",
        "PEN",
        "PHP",
        "PLN",
        "QAR",
        "RON",
        "RUB",
        "SHP",
        "SAR",
        "RSD",
        "SCR",
        "SGD",
        "SBD",
        "SOS",
        "ZAR",
        "LKR",
        "SEK",
        "CHF",
        "SRD",
        "SYP",
        "TWD",
        "THB",
        "TTD",
        "TRY",
        "TRL",
        "TVD",
        "UAH",
        "GBP",
        "USD",
        "UYU",
        "UZS",
        "VEF",
        "VND",
        "YER",
        "ZWD"
      ]
    }
  },
  created() {
    if (this.getCurrentUser) {
      this.getMyBoardsData()
      this.getSharedBoardsData()
    }
  },
  watch: {
    getCurrentUser() {
      this.getMyBoardsData()
      this.getSharedBoardsData()
    }
  },
  methods: {
    createBoard() {
      this.loading = true
      const data = {
        title: this.boardTitle,
        ownerUID: this.getCurrentUser._id,
        ballance: 0,
        boardCurrency: this.boardCurrency,
        users: [this.getCurrentUser.email]
      }
      this.$store.dispatch("boards/createNewBoard", data).then(response => {
        this.loading = false
        if (response.status) {
          this.getMyBoardsData()
          this.boardTitle = ""
          this.boardCurrency = null
          this.$refs.observer.reset()
          this.$root.$emit("actionResponse", 1, "New board created")
        } else {
          this.$root.$emit("actionResponse", 0, response.data)
        }
      })
    },
    getMyBoardsData() {
      this.$store.dispatch("boards/getMyBoards", this.getCurrentUser._id)
    },
    getSharedBoardsData() {
      this.$store.dispatch("boards/getSharedBoards", this.getCurrentUser.email)
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

<style lang="scss">
.boards-page {
  background: rgb(252, 249, 252);
  background: linear-gradient(
    45deg,
    rgba(252, 249, 252, 1) 0%,
    rgba(248, 249, 253, 1) 100%
  );
}
</style>
