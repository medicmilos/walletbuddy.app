<template>
  <div>
    <v-text-field label="E-mail" v-model="email" outlined></v-text-field>
    <br />
    <v-text-field label="Password" v-model="password" outlined></v-text-field>
    <br />
    <button @click="register">REGISTER</button>
    <br />
    Have an account? Sign in now.

    <br />
    Sign up
  </div>
</template>

<script>
export default {
  name: "Register",
  computed: {},
  data() {
    return {
      password: "",
      email: ""
    }
  },
  methods: {
    register() {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch("auth/register", payload).then(response => {
        console.log("response in app: ", response)
      })
    }
  }
}
</script>

<style lang="scss"></style>
