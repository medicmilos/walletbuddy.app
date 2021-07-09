<template>
  <div>
    Email:
    <input v-model="email" />
    <br />
    Password:
    <input v-model="password" />
    <br />
    <button>REGISTER</button>
    <br />
  </div>
</template>

<script>
export default {
  name: "Register",
  computed: {},
  data: () => ({
    password: "",
    email: ""
  }),
  methods: {
    login() {
      console.log("register")
    }
  }
}
</script>

<style lang="scss"></style>
