<template>
  <div>
    <p>eeeeeee</p>
    <p>eeeeeee</p>
    <p>eeeeeee</p>
    <p>eeeeeee</p>
    <p>eeeeeee</p>
    <p>eeeeeee</p>
    <p>eeeeeee</p>
    <p>eeeeeee</p>
    <p>eeeeeee</p>
    <p>eeeeeee</p>
    <p>eeeeeee</p>
    <p>eeeeeee</p>
    <button @click="logout">logout</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {},
  data() {
    return {}
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout").then(response => {
        console.log("response in app logout:  ", response)
        this.$router.push({ name: "login" })
      })
    }
  }
}
</script>

<style lang="scss"></style>
