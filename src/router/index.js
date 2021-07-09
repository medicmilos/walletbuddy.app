import Vue from "vue"
import Router from "vue-router"
import Login from "../screens/auth/Login"
import Register from "../screens/auth/Register"
import Home from "../screens/Home"

Vue.use(Router)

let router = new Router({
  mode: "history",
  base: "/",
  routes: [
    {
      path: "/",
      redirect: "/prijava"
    },
    {
      path: "/prijava",
      name: "login",
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: "/registracija",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/pocetna",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: false
      }
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router
