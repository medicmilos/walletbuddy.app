<template>
  <v-container>
    <p class="text-h6 font-weight-black">
      My Ballance: {{ getUserBallance }} RSD
    </p>
  </v-container>
</template>

<script>
export default {
  name: "PersonalTab",
  props: {},
  computed: {
    getUserBallance() {
      return this.$store.getters["transactions/getUserBallance"]
    }
  },
  data() {
    return {}
  },
  created() {
    this.$root.$on("refreshPersonalTab", () => {})
  },
  watch: {},
  methods: {}
}
</script>

<style lang="scss"></style>
