import Vue from "vue"
import Dashboard from "./screens/dashboard/Dashboard"
import router from "./router"
import store from "./store"
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"
import "@mdi/font/css/materialdesignicons.css"
import { ValidationProvider, ValidationObserver } from "vee-validate"
import "./helpers/vee.validate"
import moment from "moment"

Vue.config.productionTip = false
Vue.component("ValidationProvider", ValidationProvider)
Vue.component("ValidationObserver", ValidationObserver)
Vue.prototype.moment = moment
Vue.use(Vuetify)

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
