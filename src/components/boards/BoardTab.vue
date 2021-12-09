<template>
  <v-container>
    <p class="text-h6 font-weight-black mb-0">
      Board ballance: {{ getBoard.ballance }} RSD
    </p>
    <v-divider />
    <p class="text-h5 font-weight-black mt-10">INVITE USER TO BOARD</p>
    <v-divider />
    <v-row class="pt-5">
      <v-text-field
        class="col-6"
        label="userIntiveEmail"
        v-model="userIntiveEmail"
      />
      <v-btn @click="inviteUserByEmail" :disabled="loading">INVITE</v-btn>
    </v-row>
    <v-card>
      <apexchart
        :key="chartKey"
        type="bar"
        height="400"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </v-card>
    <v-card>
      <v-card-title>
        <b>USERS ON BOARD</b>
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
        :items="getUsersOnBoard"
        :search="search"
      >
        <template v-slot:[`item.actions`]="{ item }">
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
    }
  },
  data() {
    return {
      loading: false,
      userIntiveEmail: null,
      openDialog: false,
      messageData: null,
      search: "",
      headers: [
        { text: "User", value: "user" },
        { text: "Ballance", value: "amount" },
        { text: "Actions", value: "actions" }
      ],
      chartKey: 0,
      series: [
        {
          name: "Ballance",
          data: []
        }
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 400
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
      }
    }
  },
  created() {
    this.getBoardUsers()
  },
  watch: {},
  methods: {
    getBoardUsers() {
      this.$store
        .dispatch("boards/getUsersOnBoard", this.getBoard._id)
        .then(() => {
          console.log("thasdsad: ", this.getUsersOnBoard)
          this.chartOptions.xaxis.categories = this.getUsersOnBoard.map(
            obj => obj.user
          )
          this.series[0].data = this.getUsersOnBoard.map(obj => obj.amount)
          this.chartKey++
        })
    },
    async inviteUserByEmail() {
      this.loading = true
      this.$store
        .dispatch("boards/inviteUserToBoard", {
          userEmail: this.userIntiveEmail,
          boardUID: this.getBoard._id
        })
        .then(() => {
          this.loading = false
          this.userIntiveEmail = null
          this.getBoardData()
          this.$root.$emit("actionResponse", 1, "User invited")
        })
    }
  }
}
</script>

<style lang="scss"></style>
