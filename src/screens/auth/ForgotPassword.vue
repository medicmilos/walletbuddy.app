<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card>
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Lost Password</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-progress-linear
              :active="loading"
              :indeterminate="true"
              class="ma-0"
              height="4"
            ></v-progress-linear>
            <validation-observer ref="observer" v-slot="{ invalid }">
              <form @submit.prevent="login" class="pa-5 pt-2 pb-2">
                <v-card-text class="pa-2 pb-0">
                  <validation-provider
                    v-slot="{ errors }"
                    name="email"
                    rules="required|email"
                  >
                    <v-text-field
                      v-model="email"
                      :error-messages="errors"
                      @keydown.enter.native="login"
                      prepend-icon="mdi-email"
                      label="E-mail"
                      placeholder="E-mail"
                      type="email"
                    ></v-text-field>
                  </validation-provider>

                  <router-link
                    :to="{
                      name: 'login'
                    }"
                    class="black--text"
                  >
                    <p class="subtitle-2">Return to sign in</p>
                  </router-link>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    class="mr-4 white--text"
                    type="submit"
                    color="pinkButton"
                    :disabled="invalid || loading"
                    align="right"
                  >
                    Continue
                  </v-btn>
                </v-card-actions>
              </form>
            </validation-observer>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "ForgotPassword",
  computed: {},
  data() {
    return {
      email: "",
      loading: false
    }
  },
  methods: {
    login() {
      this.$refs.observer.validate()
      this.loading = true

      let payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch("auth/forgotPassword", payload).then(response => {
        this.loading = false
        if (response.status) {
          this.$router.push({ name: "login" })
        } else {
          this.$root.$emit("actionResponse", 0, response.payload)
        }
      })
    }
  }
}
</script>

<style lang="scss"></style>
