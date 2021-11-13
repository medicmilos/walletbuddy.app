<template>
  <v-container>
    <v-text-field label="E-mail" v-model="email" outlined></v-text-field>
    <br />
    <v-text-field label="Password" v-model="password" outlined></v-text-field>
    <br />
    <v-btn @click="login">LOGIN</v-btn>
    <br />
    <v-btn @click="logout">logout</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  computed: {},
  data() {
    return {
      email: "milosmedicdev@gmail.com",
      password: "milosmedic"
    }
  },
  methods: {
    login() {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch("auth/login", payload).then(response => {
        console.log("response in app: ", response)
        if (response.status) {
          this.$router.push({ name: "home" })
        }
      })
    },
    logout() {
      this.$store.dispatch("auth/logout").then(response => {
        console.log("response in app logout:  ", response)
      })
    }
  }
}
</script>

<style lang="scss"></style>
