<template>
  <div class="auth-page">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card>
            <v-toolbar color="auth" dark flat>
              <v-toolbar-title>Sign in</v-toolbar-title>
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
                  <validation-provider
                    v-slot="{ errors }"
                    name="password"
                    rules="required"
                  >
                    <v-text-field
                      v-model="password"
                      :error-messages="errors"
                      :append-icon="eye ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="eye ? 'text' : 'password'"
                      @click:append="eye = !eye"
                      @keydown.enter.native="login"
                      prepend-icon="mdi-lock"
                      label="Password"
                      placeholder="Password"
                    ></v-text-field>
                  </validation-provider>
                  <router-link
                    :to="{
                      name: 'forgot-password'
                    }"
                    class="black--text"
                  >
                    <p class="mb-0 subtitle-2">Lost your password?</p>
                  </router-link>
                  <router-link
                    :to="{
                      name: 'register'
                    }"
                    class="black--text"
                  >
                    <p class="subtitle-2">
                      Not on WalletBuddy yet? Create an account
                    </p>
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
                  <v-spacer />
                  <v-icon
                    @click="goToHome"
                    class="home-icon"
                    color="drawerIcon"
                  >
                    mdi-home-city
                  </v-icon>
                </v-card-actions>
              </form>
            </validation-observer>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  computed: {},
  data() {
    return {
      email: "",
      password: "",
      eye: false,
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
      this.$store.dispatch("auth/login", payload).then(response => {
        this.loading = false
        if (response.status) {
          this.$router.push({ name: "boards" })
          this.$store.dispatch("auth/getCurrentUser")
        } else {
          this.$root.$emit("actionResponse", 0, response.data)
        }
      })
    },
    goToHome() {
      this.$router.push({ name: "landing" })
    }
  }
}
</script>

<style lang="scss">
.auth-page {
  height: 100vh;
  position: relative;

  header {
    border-radius: 0 !important;
  }

  .home-icon {
    cursor: pointer;
  }
}
</style>
