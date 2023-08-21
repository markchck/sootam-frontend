import Vue from "vue"
import VueRouter from "vue-router"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import store from "../store.js"
import Main from "../views/Main.vue"
Vue.use(VueRouter)

const rejectAuthUser = (to, from, next) => {
  if (localStorage.getItem("accessToken")) {
    alert("이미 로그인한 상태입니다.")
    next("/main")
  } else {
    next()
  }
}
const onlyAuthUser = (to, from, next) => {
  if (!localStorage.getItem("accessToken")) {
    alert("메인으로 가려면 로그인이 필요합니다.")
    next("/login")
  } else {
    next()
  }
}
const changeSatatus = (next, status) => {
  store.commit("setStatus", status)
  next()
}

const routes = [
  {
    path: "/login",
    name: "Login",
    beforeEnter(to, from, next) {
      rejectAuthUser(to, from, next)
      changeSatatus(next, "login")
    },
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    beforeEnter(to, from, next) {
      rejectAuthUser(to, from, next)
      changeSatatus(next, "register")
    },
    component: Register,
  },
  {
    path: "/main",
    name: "Main",
    beforeEnter(to, from, next) {
      onlyAuthUser(to, from, next)
      changeSatatus(next, "main")
    },
    component: Main,
  },
]
const router = new VueRouter({
  mode: "history",
  routes,
})

export default router
