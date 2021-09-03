<template>
  <v-container>
    <v-text-field label="E-mail" v-model="email" outlined></v-text-field>
    <br />
    <v-text-field label="Password" v-model="password" outlined></v-text-field>
    <br />
    <v-btn>LOGIN</v-btn>
    <br />
  </v-container>
</template>

<script>
export default {
  name: "Login",
  computed: {},
  data: () => ({
    password: "",
    email: ""
  }),
  methods: {
    login() {
      console.log("login")
    }
  }
}
</script>

<style lang="scss"></style>
