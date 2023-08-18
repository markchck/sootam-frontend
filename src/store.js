import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    accessToken: "",
    isLogin: false,
    isLoginError: false,
    status: "landing",
  },
  getters: {},
  mutations: {
    setAccessToken: (state, accessToken) => {
      state.accessToken = accessToken
    },
    setStatus(state, newStatus) {
      state.status = newStatus
    },
  },
  actions: {},
})
