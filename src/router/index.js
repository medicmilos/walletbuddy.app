import Vue from "vue"

import { getAuth } from "firebase/auth"

import Home from "../screens/Home"
import Login from "../screens/auth/Login"
import Register from "../screens/auth/Register"
import Router from "vue-router"

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
        requiresAuth: true
      }
    },
    {
      path: "*",
      component: Home,
      meta: {
        requiresAuth: true
      }
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const auth = getAuth()
  const currentUser = auth.currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth) {
    if (currentUser) {
      next()
    } else {
      next({ name: "login" })
    }
  } else {
    if ((to.name === "login" || to.name === "register") && currentUser) {
      next({ name: "home" })
    } else {
      next()
    }
  }
})

export default router
