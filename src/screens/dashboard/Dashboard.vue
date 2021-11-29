<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
      v-if="isAuthenticated"
      class="drawer-color"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title class="drawerText--text">
          aaaaaaaaaaaaa
        </v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon color="drawerIcon">mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <template v-for="item in drawerItems">
          <DashboardItem :key="item.id" :item="item" />
        </template>

        <v-list-item link @click="logout">
          <v-list-item-icon>
            <v-icon color="drawerIcon">mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="drawerText--text">
              Logout
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-layout child-flex xs12>
        <router-view></router-view>
      </v-layout>
      <v-snackbar
        v-model="snackbar"
        :color="snackbarType ? 'success' : 'error'"
      >
        {{ snackbarText }}
        <v-btn dark text @click="snackbar = false">Zatvori</v-btn>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import DashboardItem from "../../components/dashboard/DashboardItem.vue"
import firebase from "firebase/app"
import "firebase/auth"

export default {
  name: "Dashboard",
  components: { DashboardItem },
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
          routeName: "home",
          icon: "mdi-home-city",
          title: "Home"
        },
        {
          id: 2,
          routeName: "boards",
          icon: "mdi-home-city",
          title: "Boards"
        },
        {
          id: 3,
          routeName: "settings",
          icon: "mdi-cog",
          title: "Settings"
        }
      ]
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"]
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("settings/getCurrentUser")
      }
    })

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
    }
  }
}
</script>

<style lang="scss">
body {
  font-family: Rubik, Avenir Next, Helvetica Neue, sans-serif;
  .v-application {
    font-family: Rubik, Avenir Next, Helvetica Neue, sans-serif;
  }
}
.drawer-color {
  background: linear-gradient(
    294.17deg,
    rgb(47, 25, 55) 35.57%,
    rgb(69, 38, 80) 92.42%,
    rgb(69, 38, 80) 92.42%
  );
}
</style>
