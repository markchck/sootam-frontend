<template>
  <v-app>
    <!-- <router-link to="/main"> -->
    <img
      alt="Vue logo"
      to="/main"
      src="./assets/logo.png"
      width="200"
      class="mx-auto"
    />
    <!-- </router-link> -->
    <v-sheet width="300" class="mx-auto mt-14" v-if="status === 'landing'">
      <div class="d-flex flex-column">
        <v-btn
          color="warning"
          class="mt-4"
          block
          router
          :to="{ name: 'Login' }"
          exact
          @click="handleStatus('login')"
        >
          Login하러 가기
        </v-btn>
      </div>
      <div class="d-flex flex-column">
        <v-btn
          color="success"
          class="mt-4"
          block
          router
          :to="{ name: 'Register' }"
          exact
          @click="handleStatus('register')"
        >
          회원가입하러 가기
        </v-btn>
      </div>
    </v-sheet>

    <router-view />
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex"
// import Search_problem from "@/components/Search_problem.vue"
export default {
  name: "App",
  data() {
    return {}
  },
  computed: {
    ...mapState(["accessToken", "status"]),
  },
  methods: {
    ...mapMutations(["setStatus"]),
    handleStatus(status) {
      this.setStatus(status)
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
