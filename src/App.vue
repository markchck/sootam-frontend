<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <div v-if="this.$store.state.accessToken">
      로그인 성공
      <Search></Search>
    </div>

    <div v-else>
      로그인 이전
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import Search from "@/components/Search.vue"
export default {
  name: "App",
  components: {
    Search: Search,
  },
  data() {
    return {
      accessToken: this.$store.state.accessToken,
    }
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
