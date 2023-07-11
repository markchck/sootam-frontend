<template>
  <div id="app">
    <div>
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/grid-system">Grid System</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
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
