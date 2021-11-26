<template>
  <v-flex>
    settings
    <br />
    <v-text-field v-model="firstName" label="First Name" />
    <br />
    <v-text-field v-model="lastName" label="Last Name" />
    <br />
    <v-btn @click="updateUserSettings">updateUserSettings</v-btn>
  </v-flex>
</template>

<script>
import { mapFields } from "vuex-map-fields"

export default {
  name: "Settings",
  computed: {
    ...mapFields("settings", ["firstName", "lastName"])
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    updateUserSettings() {
      this.loading = true

      let payload = {
        firstName: this.firstName,
        lastName: this.lastName
      }
      this.$store
        .dispatch("settings/updateUserSettings", payload)
        .then(response => {
          console.log("response: ", response)
          this.$store.dispatch("settings/getCurrentUser")
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss"></style>
