import Vue from "vue"
import VueRouter from "vue-router"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import store from "../store.js"
import Main from "../views/Main.vue"
Vue.use(VueRouter)

const rejectAuthUser = (to, from, next) => {
  if (store.state.accessToken) {
    //이미 로그인 된 유저니까 막아함.
    alert("이미로그인")
    next("/") // next에 경로를 적으면 리다이렉션
  } else {
    next() // 경로가 없으면 componet를 실행(입장을 허용)
  }
}
const onlyAuthUser = (to, from, next) => {
  if (!store.state.accessToken) {
    //로그인 안 된 유저니까 막아함.
    alert("로그인하고 오셈")
    next("/login") // next에 경로를 적으면 리다이렉션
  } else {
    next() // 경로가 없으면 componet를 실행(입장을 허용)
  }
}

const routes = [
  {
    path: "/login",
    name: "Login",
    beforeEnter: rejectAuthUser,
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/main",
    name: "Main",
    beforeEnter: onlyAuthUser,
    component: Main,
  },
]
const router = new VueRouter({
  mode: "history",
  routes,
})

export default router
