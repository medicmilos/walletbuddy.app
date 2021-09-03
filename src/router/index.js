import Vue from "vue"

import Home from "../screens/Home"
import Login from "../screens/auth/Login"
import Register from "../screens/auth/Register"
import Router from "vue-router"
import store from "../store"

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

router.beforeEach((to, from, next) => {
  store.dispatch["auth/checkIsAuthenticated"]
  next()
})

router.beforeEach((to, from, next) => {
  if (
    (to.name === "login" ||
      to.name === "register" ||
      to.name === "forgot-password" ||
      to.name === "reset-password") &&
    store.getters["auth/isAuthenticated"]
  ) {
    next({ name: "home" })
  } else {
    next()
  }
})

export default router
