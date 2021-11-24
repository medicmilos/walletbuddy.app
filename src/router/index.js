import firebase from "firebase/app"
import store from "../store"
import Vue from "vue"
import VueRouter from "vue-router"

import Board from "../screens/boards/Board"
import Boards from "../screens/boards/Boards"
import ComingSoon from "../screens/ComingSoon"
import ForgotPassword from "../screens/auth/ForgotPassword"
import Home from "../screens/Home"
import Login from "../screens/auth/Login"
import Register from "../screens/auth/Register"
import Settings from "../screens/settings/Settings"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/comingsoon",
    name: "comingsoon",
    component: ComingSoon,
    meta: { title: "Page", requiresAuth: false }
  },
  {
    path: "/signin",
    name: "login",
    component: Login,
    meta: { title: "Sign in", requiresAuth: false }
  },
  {
    path: "/signup",
    name: "register",
    component: Register,
    meta: {
      title: "Sign Up",
      requiresAuth: false
    }
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPassword,
    meta: {
      title: "Forgot Password",
      requiresAuth: false
    }
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      title: "Home",
      requiresAuth: true
    }
  },
  {
    path: "/boards",
    name: "boards",
    component: Boards,
    meta: {
      title: "Boards",
      requiresAuth: true
    }
  },
  {
    path: "/board/:uid",
    name: "board",
    component: Board,
    meta: {
      title: "Board",
      requiresAuth: true
    }
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
    meta: {
      title: "Settings",
      requiresAuth: true
    }
  },
  {
    path: "*",
    component: Home,
    meta: {
      title: "Page",
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | FireBlog`
  next()
})

router.beforeEach(async (to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(res => res.meta.requiresAuth)

  store.dispatch("auth/checkIsAuthenticated")

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
