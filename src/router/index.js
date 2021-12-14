import store from "../store"
import Vue from "vue"
import VueRouter from "vue-router"

import Analytics from "../screens/analytics/Analytics"
import Board from "../screens/boards/Board"
import Boards from "../screens/boards/Boards"
import ForgotPassword from "../screens/auth/ForgotPassword"
import Landing from "../screens/landing/Landing"
import Login from "../screens/auth/Login"
import Register from "../screens/auth/Register"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/app"
  },
  {
    path: "/app",
    name: "landing",
    component: Landing,
    meta: { title: "Welcome", requiresAuth: false }
  },
  {
    path: "/auth/signin",
    name: "login",
    component: Login,
    meta: { title: "Sign in", requiresAuth: false }
  },
  {
    path: "/auth/signup",
    name: "register",
    component: Register,
    meta: {
      title: "Sign Up",
      requiresAuth: false
    }
  },
  {
    path: "/auth/forgot-password",
    name: "forgot-password",
    component: ForgotPassword,
    meta: {
      title: "Forgot Password",
      requiresAuth: false
    }
  },
  {
    path: "/app/boards",
    name: "boards",
    component: Boards,
    meta: {
      title: "Boards",
      requiresAuth: true
    }
  },
  {
    path: "/app/boards/:uid",
    name: "board",
    component: Board,
    meta: {
      title: "Board",
      requiresAuth: true
    }
  },
  {
    path: "/app/analytics",
    name: "analytics",
    component: Analytics,
    meta: {
      title: "Analytics",
      requiresAuth: true
    }
  },
  {
    path: "*",
    component: Landing,
    meta: {
      title: "Page",
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | WalletBuddy`
  next()
})

router.beforeEach((to, from, next) => {
  if (
    (to.name === "login" || to.name === "register") &&
    store.getters["auth/isAuthenticated"]
  ) {
    next({ name: "boards" })
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  let access = store.getters["auth/isAuthenticated"]

  if (to.meta.requiresAuth) {
    if (access) {
      next()
    } else {
      next({ name: "login" })
    }
  } else {
    if (to.name !== null) {
      if (to.name == "landing") {
        if (access) {
          next({ name: "boards" })
        } else {
          next()
        }
      } else {
        next()
      }
    } else {
      next({ name: "login" })
    }
  }
})

router.beforeEach((to, from, next) => {
  store.dispatch("auth/checkAuth").then(() => {
    next()
  })
})

export default router
