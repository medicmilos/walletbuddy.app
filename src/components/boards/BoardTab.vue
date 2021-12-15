<template>
  <v-container>
    <p class="font-weight-bold mb-0 board-ballance">
      Board total ballance:
      <span>{{ eRs(getBoard.ballance) }}</span>
      &nbsp;
      <span>{{ getBoard.boardCurrency }}</span>
    </p>
    <v-divider class="mb-5 mt-5" />
    <validation-observer
      v-if="getCurrentBoard.ownerUID === getCurrentUser._id"
      ref="observer"
      v-slot="{ invalid }"
    >
      <div class="d-flex pt-5">
        <p class="mb-0 mt-2 mr-2 font-weight-bold">Add user to board:</p>
        <validation-provider
          v-slot="{ errors }"
          name="userIntiveEmail"
          rules="required|email"
        >
          <v-text-field
            @keydown.enter.native="inviteUserByEmail"
            :error-messages="errors"
            label="E-mail"
            prepend-inner-icon="mdi-email"
            outlined
            dense
            flat
            v-model="userIntiveEmail"
            class="input-text"
            @blur="$refs.observer.reset()"
          ></v-text-field>
        </validation-provider>
        <v-btn
          class="ml-2 mt-1 font-weight-bold white--text"
          @click="inviteUserByEmail"
          :disabled="invalid"
          :loading="loading"
          color="#513396"
          small
        >
          ADD
        </v-btn>
      </div>
    </validation-observer>
    <v-divider
      v-if="getCurrentBoard.ownerUID === getCurrentUser._id"
      class="mb-5 mt-5"
    />
    <v-card>
      <apexchart
        type="bar"
        height="300"
        :options="chartOptions"
        :series="series"
        title="sadasd"
        :key="'apex' + chartId"
      ></apexchart>
    </v-card>
    <v-divider class="mb-5 mt-5" />
    <v-card>
      <v-card-title>
        <p class="users-table-title">Users on board</p>
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
        :items="getUsersOnBoard"
        :search="search"
      >
        <template v-slot:[`item.amount`]="{ item }">
          {{ item.amount }} {{ getBoard.boardCurrency }}
        </template>
        <template
          v-if="getCurrentBoard.ownerUID === getCurrentUser._id"
          v-slot:[`item.actions`]="{ item }"
        >
          <UserReminderModal
            :data="{
              boardUID: getBoard._id,
              userEmail: item.user,
              ballance: item.amount
            }"
          />
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import UserReminderModal from "./UserReminderModal.vue"

import VueApexCharts from "vue-apexcharts"

export default {
  components: { UserReminderModal, apexchart: VueApexCharts },
  name: "BoardTab",
  props: { getBoard: Object },
  computed: {
    getUsersOnBoard() {
      return this.$store.getters["boards/getUsersOnBoard"]
    },
    getCurrentBoard() {
      return this.$store.getters["boards/getBoard"]
    },
    getCurrentUser() {
      return this.$store.getters["auth/getCurrentUser"]
    }
  },
  data() {
    return {
      loading: false,
      userIntiveEmail: null,
      search: "",
      headers: [
        { text: "User", value: "user" },
        { text: "Ballance", value: "amount" },
        { text: "Actions", value: "actions" }
      ],
      series: [
        {
          name: "Ballance",
          data: []
        }
      ],
      chartOptions: {
        title: {
          text: "Ballance by user",
          style: {
            fontSize: "16px",
            fontWeight: "bold"
          }
        },
        chart: {
          type: "bar",
          height: 300
        },
        plotOptions: {
          bar: {
            colors: {
              ranges: [
                {
                  from: 0,
                  to: 999999,
                  color: "#43a047"
                },
                {
                  from: -999999,
                  to: -1,
                  color: "#e53935"
                }
              ]
            },
            columnWidth: "80%"
          }
        },
        dataLabels: {
          enabled: false
        },
        yaxis: {
          title: {
            text: "Ballance"
          }
        },
        xaxis: {
          type: "user",
          categories: [],
          labels: {
            rotate: -90
          }
        }
      },
      chartId: 0
    }
  },
  created() {
    this.getBoardUsers()
  },
  watch: {},
  methods: {
    getBoardUsers() {
      console.log("getUsersOnBoard: ", this.$route.params.uid)
      this.$store
        .dispatch("boards/getUsersOnBoard", this.$route.params.uid)
        .then(() => {
          this.chartOptions.xaxis.categories = this.getUsersOnBoard.map(
            obj => obj.user
          )
          this.chartId++
          this.series[0].data = this.getUsersOnBoard.map(obj => obj.amount)
        })
    },
    inviteUserByEmail() {
      this.$refs.observer.validate()

      this.loading = true
      this.$store
        .dispatch("boards/inviteUserToBoard", {
          userEmail: this.userIntiveEmail,
          boardUID: this.$route.params.uid
        })
        .then(() => {
          this.loading = false
          this.userIntiveEmail = null
          this.$refs.observer.reset()
          this.getBoardUsers()
          this.$root.$emit(
            "actionResponse",
            1,
            "User successfully added to board."
          )
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

<style lang="scss">
.v-btn.v-btn--disabled.ml-2.font-weight-bold.custom-button {
  background-color: #503396 !important;
  color: #fff !important;
  opacity: 0.7;
}

.users-table-title {
  font-size: 16px;
  font-weight: bold;
}
.board-ballance {
  font-size: 1.25rem;
  span:nth-child(2) {
    color: #503396;
    font-size: 1rem;
  }
  span:nth-child(1) {
    color: #503396;
    font-size: 2rem;
  }
}

.input-text {
  fieldset {
    border: 2px solid #9280be !important;
  }
  label {
    color: #9280be !important;
  }
  i {
    color: #9280be !important;
  }
}
</style>
