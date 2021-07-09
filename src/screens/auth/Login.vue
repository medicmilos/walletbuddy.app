<template>
  <div>
    Email:
    <input v-model="email" />
    <br />
    Password:
    <input v-model="password" />
    <br />
    <button>LOGIN</button>
    <br />
  </div>
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
