import moment from "moment"
import Vue from "vue"
import Vuetify from "vuetify"

import { initializeApp } from "firebase/app"
import { ValidationObserver, ValidationProvider } from "vee-validate"

import Dashboard from "./screens/dashboard/Dashboard"
import router from "./router"
import store from "./store"

import "vuetify/dist/vuetify.min.css"
import "@mdi/font/css/materialdesignicons.css"
import "./helpers/vee.validate"

Vue.config.productionTip = false
Vue.component("ValidationProvider", ValidationProvider)
Vue.component("ValidationObserver", ValidationObserver)
Vue.prototype.moment = moment
Vue.use(Vuetify)

const firebaseConfig = {
  apiKey: "AIzaSyD1DkykpCGdxKBfIAqoN_NU6yvGO3W4lzU",
  authDomain: "expenses-managing-app.firebaseapp.com",
  projectId: "expenses-managing-app",
  storageBucket: "expenses-managing-app.appspot.com",
  messagingSenderId: "928131340609",
  appId: "1:928131340609:web:0fba054ca532d1251229c0",
  measurementId: "G-N75JMQC6CR"
}

initializeApp(firebaseConfig)

new Vue({
  render: h => h(Dashboard),
  store,
  router,
  vuetify: new Vuetify({
    theme: {
      themes: {
        light: {
          primary: "#f0f0f0"
        }
      }
    }
  }),
  components: { Dashboard }
}).$mount("#app")
