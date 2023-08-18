import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    accessToken: "",
    isLogin: false,
    isLoginError: false,
  },
  getters: {},
  mutations: {
    setAccessToken: (state, accessToken) => {
      state.accessToken = accessToken
    },
    loginSuccess(state) {
      state.isLogin = true
      state.isLoginError = false
    },
    loginError(state) {
      state.isLogin = false
      state.isLoginError = true
    },
  },
  actions: {},
})
