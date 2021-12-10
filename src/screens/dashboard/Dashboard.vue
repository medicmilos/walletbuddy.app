<template>
  <v-app id="inspire">
    <v-app-bar app class="app-header" flat v-if="isAuthenticated">
      <p class="hidden-sm-and-down header-main-logo mb-0">WalletBuddy</p>

      <v-tabs centered class="ml-n9" color="#503396">
        <v-tab @click="goToBoards">Boards</v-tab>
        <v-tab>Analytics</v-tab>
      </v-tabs>

      <v-btn
        class="hidden-sm-and-down"
        color="#513396"
        dark
        outlined
        @click="logout"
      >
        Logout
      </v-btn>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <router-view></router-view>
    </v-main>
    <v-snackbar v-model="snackbar" :color="snackbarType ? 'success' : 'error'">
      {{ snackbarText }}
      <v-btn dark text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      drawer: true,
      mini: true,
      snackbar: false,
      snackbarText: "",
      snackbarType: 0,
      drawerItems: [
        {
          id: 1,
          routeName: "boards",
          icon: "mdi-home-city",
          title: "Boards"
        }
      ]
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"]
    },
    getCurrentUser() {
      return this.$store.getters["auth/getCurrentUser"]
    }
  },
  created() {
    if (this.isAuthenticated) {
      this.$store.dispatch("auth/getCurrentUser")
    }

    this.$root.$on("actionResponse", (type, data) => {
      this.snackbarType = type
      this.snackbarText = data
      this.snackbar = true
    })
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push({ name: "login" })
      })
    },
    goToBoards() {
      this.$router.push({ name: "boards" })
    }
  }
}
</script>

<style lang="scss">
.header-main-logo {
  color: #503396;
  font-size: 1.5rem;
  font-weight: bold;
}
.v-main__wrap {
  background: rgb(234, 226, 247);
  background: linear-gradient(
    45deg,
    rgba(234, 226, 247, 1) 0%,
    rgba(210, 224, 249, 1) 100%
  );
}
.app-header {
  background: rgb(252, 249, 252);
  background: linear-gradient(
    45deg,
    rgba(252, 249, 252, 1) 0%,
    rgba(248, 249, 253, 1) 100%
  );
}
body {
  font-family: Rubik, Avenir Next, Helvetica Neue, sans-serif;
  .v-application {
    font-family: Rubik, Avenir Next, Helvetica Neue, sans-serif;
  }
}
</style>
