import moment from "moment"
import Vue from "vue"
import Vuetify from "vuetify"

import { getAuth } from "firebase/auth"
import { initializeApp } from "firebase/app"
import { ValidationObserver, ValidationProvider } from "vee-validate"

import Dashboard from "./screens/dashboard/Dashboard"
import firebaseConfig from "./config/firebaseConfig"
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

initializeApp(firebaseConfig)

let app
const auth = getAuth()

auth.onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      render: h => h(Dashboard),
      store,
      router,
      vuetify: new Vuetify({
        theme: {
          themes: {
            light: {
              primary: "#2e0d34",
              pinkButton: "#e1567c",
              purpleButton: "#6d5ec7",
              drawerIcon: "#8f82a0",
              drawerIconActive: "#ffffff",
              drawerText: "#8f82a0",
              drawerTextActive: "#ffffff"
            }
          }
        }
      }),
      components: { Dashboard }
    }).$mount("#app")
  }
})
