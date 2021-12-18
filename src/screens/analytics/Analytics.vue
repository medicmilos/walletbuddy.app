<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12">
        <v-sheet min-height="80vh" rounded="lg" class="pa-0 d-flex">
          <v-container class="boards-page pa-7">
            <p
              style="font-size: 24px"
              class="font-weight-black mt-1 mb-1"
              v-if="getCurrentUser"
            >
              Welcome back {{ getCurrentUser.email }}
            </p>
            <v-divider class="mt-5 mb-5" />
            <p class="font-weight-bold mb-0 mt-2">
              Number of my boards: {{ getNumberOfMyBoards }}
            </p>
            <p class="font-weight-bold mb-0 mt-2">
              Number of boards shared with me:
              {{ getNumberOfBoardsSharedWithMe }}
            </p>
            <v-divider class="mt-5 mb-5" />

            <v-card>
              <apexchart
                type="bar"
                height="300"
                :options="chartOptions"
                :series="series"
                :key="'apex2' + chartId"
              ></apexchart>
            </v-card>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueApexCharts from "vue-apexcharts"

export default {
  name: "Analytics",
  computed: {
    getMyBoards() {
      return this.$store.getters["boards/getMyBoards"]
    },
    getSharedBoards() {
      return this.$store.getters["boards/getSharedBoards"]
    },
    getCurrentUser() {
      return this.$store.getters["auth/getCurrentUser"]
    },
    getNumberOfMyBoards() {
      return this.getMyBoards.length
    },
    getNumberOfBoardsSharedWithMe() {
      return this.getSharedBoards.length
    },
    analyticsTotalSum() {
      return this.$store.getters["boards/analyticsTotalSum"]
    }
  },
  components: { apexchart: VueApexCharts },
  data() {
    return {
      loading: false,
      chartId: 0,
      series: [
        {
          name: "Ballance",
          data: []
        }
      ],
      chartOptions: {
        title: {
          text: "My ballance by board",
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
          type: "table",
          categories: [],
          labels: {
            rotate: -90
          }
        }
      }
    }
  },
  created() {
    if (this.getCurrentUser) {
      this.getMyBoardsData()
      this.getSharedBoardsData()
      this.$store
        .dispatch("boards/analyticsTotalSum", this.getCurrentUser.email)
        .then(() => {
          this.chartOptions.xaxis.categories = this.analyticsTotalSum.map(
            obj => obj.boardTitle
          )
          this.chartId++
          this.series[0].data = this.analyticsTotalSum.map(obj => obj.ballance)
          this.chartId++
        })
    }
  },
  watch: {
    getCurrentUser() {
      this.getMyBoardsData()
      this.getSharedBoardsData()
      this.$store
        .dispatch("boards/analyticsTotalSum", this.getCurrentUser.email)
        .then(() => {
          this.chartOptions.xaxis.categories = this.analyticsTotalSum.map(
            obj => obj.boardTitle
          )
          this.chartId++
          this.series[0].data = this.analyticsTotalSum.map(obj => obj.ballance)
          this.chartId++
        })
    }
  },
  methods: {
    getMyBoardsData() {
      this.$store.dispatch("boards/getMyBoards", this.getCurrentUser._id)
    },
    getSharedBoardsData() {
      this.$store.dispatch("boards/getSharedBoards", {
        userUID: this.getCurrentUser._id,
        email: this.getCurrentUser.email
      })
    }
  }
}
</script>

<style lang="scss"></style>
