<template>
  <div id="app">
    <form @submit.prevent="submitForm">
      <label for="email">userEmail:</label>
      <input type="email" v-model="userEmail" required />
      <br />
      <label for="password">Password:</label>
      <input type="password" v-model="password" required />
      <br />
      <button type="submit">회원가입</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>
<script>
import axios from "axios"
import CryptoJS from "crypto-js"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Register",
  data() {
    return {
      userEmail: "",
      password: "",
      message: "",
      secretKey: `${process.env.VUE_APP_CRYPTO_KEY}`,
    }
  },
  methods: {
    async submitForm() {
      let hash = this.password
      const hashedPassword = await CryptoJS.AES.encrypt(
        JSON.stringify(hash),
        this.secretKey
      ).toString()
      try {
        const response = await axios.post("http://localhost:3001/signUp", {
          userEmail: this.userEmail,
          password: hashedPassword,
        })
        console.log(response) // 서버 응답 확인
      } catch (error) {
        alert("회원가입에 실패하였습니다." + `\n` + error.response.data)
        console.error(error)
      }
    },
  },
}
</script>
