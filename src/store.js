import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    accessToken: "",
  },
  getters: {},
  mutations: {
    setAccessToken: (state, accessToken) => {
      state.accessToken = accessToken
    },
  },
  actions: {},
})
