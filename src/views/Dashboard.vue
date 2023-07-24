<template>
  <div id="app">
    <form @submit.prevent="submitForm">
      <label for="email">userEmail:</label>
      <input type="email" v-model="userEmail" required />
      <br />
      <label for="password">Password:</label>
      <input type="password" v-model="password" required />
      <br />
      <button type="submit">Login</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>
<script>
import axios from "axios"
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dashboard",
  data() {
    return {
      userEmail: "",
      password: "",
      message: "",
    }
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post("http://localhost:3001/signIn", {
          userEmail: this.userEmail,
          password: this.password,
        })
        console.log(response) // 서버 응답 확인
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
