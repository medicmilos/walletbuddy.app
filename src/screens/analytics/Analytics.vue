<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12">
        <v-sheet min-height="80vh" rounded="lg" class="pa-0">
          <v-container class="boards-page pa-7">
            <p style="font-size: 24px" class="font-weight-black mt-1 mb-1">
              Welcome back
            </p>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Analytics",
  computed: {},
  data() {
    return { loading: false }
  },
  created() {},
  watch: {},
  methods: {}
}
</script>

<style lang="scss">
</style>
