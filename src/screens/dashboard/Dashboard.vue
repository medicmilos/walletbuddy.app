<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>Milos Medic</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-home-city</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid fill-height>
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
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Dashboard",
  data: () => ({
    drawer: true,
    mini: true,
    snackbar: false,
    snackbarText: "",
    snackbarType: 0
  }),
  computed: {},
  created() {
    this.$root.$on("showActionStatus", (type, data) => {
      this.snackbarType = type
      this.snackbarText = data
      this.snackbar = true
    })
  },
  methods: {}
}
</script>

<style lang="scss"></style>
