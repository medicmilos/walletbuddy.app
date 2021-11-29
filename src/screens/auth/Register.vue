<template>
  <div class="auth-page">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card>
            <v-toolbar color="auth" dark flat>
              <v-toolbar-title>Sign up</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-progress-linear
              :active="loading"
              :indeterminate="true"
              class="ma-0"
              height="4"
            ></v-progress-linear>
            <validation-observer ref="observer" v-slot="{ invalid }">
              <form @submit.prevent="register" class="pa-5 pt-2 pb-2">
                <v-card-text class="pa-2 pb-0">
                  <validation-provider
                    v-slot="{ errors }"
                    name="email"
                    rules="required|email"
                  >
                    <v-text-field
                      v-model="email"
                      :error-messages="errors"
                      @keydown.enter.native="register"
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
                      @keydown.enter.native="register"
                      prepend-icon="mdi-lock"
                      label="Password"
                      placeholder="Password"
                    ></v-text-field>
                  </validation-provider>

                  <router-link
                    :to="{
                      name: 'login'
                    }"
                    class="black--text"
                  >
                    <p class="subtitle-2">Already a member? Sign in</p>
                  </router-link>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    class="mr-4 white--text"
                    type="submit"
                    color="pinkButton"
                    :disabled="invalid || loading"
                    align="right"
                    @click="register"
                  >
                    Sign up
                  </v-btn>
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
  name: "Register",
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
    register() {
      this.$refs.observer.validate()
      this.loading = true

      let payload = {
        email: this.email,
        password: this.password
      }

      this.$store.dispatch("auth/register", payload).then(response => {
        this.loading = false
        if (response.status) {
          this.$router.push({ name: "home" })
        } else {
          this.$root.$emit("actionResponse", 0, response.payload)
        }
      })
    }
  }
}
</script>

<style lang="scss"></style>
