import Vue from "vue"
import VueRouter from "vue-router"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
// import store from "../store.js"
import Main from "../views/Main.vue"
Vue.use(VueRouter)

const rejectAuthUser = (to, from, next) => {
  if (localStorage.getItem("accessToken")) {
    //이미 로그인 된 유저니까 막아함.
    alert("이미 로그인한 상태입니다.")
    next("/main")
  } else {
    next()
  }
}
const onlyAuthUser = (to, from, next) => {
  if (!localStorage.getItem("accessToken")) {
    //로그인 안 된 유저니까 막아함.

    alert("로그인하고 오셈")
    next("/login")
  } else {
    next()
  }
}
// const changeSatatus = (to, from, next, status) => {
//   alert("들어왔다.")
//   store.commit("setStatus", status)
//   console.log(store.state.status)
//   next()
// }

const routes = [
  {
    path: "/login",
    name: "Login",
    beforeEnter: rejectAuthUser,
    // (to, from, next) => changeSatatus(next, "login"),
    // alert(store.state.status),
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    beforeEnter: rejectAuthUser,
    // (to, from, next) => changeSatatus(next, "register"),
    // alert(store.state.status),
    component: Register,
  },
  {
    path: "/main",
    name: "Main",
    beforeEnter: onlyAuthUser,
    // (to, from, next) => changeSatatus(next, "main"),
    // alert(store.state.status),

    component: Main,
  },
]
const router = new VueRouter({
  mode: "history",
  routes,
})

export default router
