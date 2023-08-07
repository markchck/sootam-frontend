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
import CryptoJS from "crypto-js"
import { mapMutations } from "vuex"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dashboard",
  data() {
    return {
      userEmail: "",
      password: "",
      message: "",
      secretKey: `${process.env.VUE_APP_CRYPTO_KEY}`,
    }
  },
  methods: {
    ...mapMutations(["setAccessToken"]),
    async submitForm() {
      let hash = this.password
      const hashedPassword = await CryptoJS.AES.encrypt(
        JSON.stringify(hash),
        this.secretKey
      ).toString()
      try {
        const response = await axios.post("http://localhost:3001/signIn", {
          userEmail: this.userEmail,
          password: hashedPassword,
        })
        this.setAccessToken(response.data.stsTokenManager.accessToken)
        this.$router.push("/")
      } catch (error) {
        alert("로그인에 실패하였습니다." + `\n` + error.response.data)
        console.error(error)
      }
    },
  },
}
</script>
