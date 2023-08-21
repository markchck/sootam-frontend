<template>
  <div id="app">
    <v-sheet width="300" class="mx-auto">
      <v-form ref="form">
        <v-text-field
          v-model="userEmail"
          :rules="emailRules"
          label="Email"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          type="password"
          label="password"
          required
        ></v-text-field>

        <v-text-field
          v-model="password2"
          :rules="password2Rules"
          type="password"
          label="password 재입력"
          required
        ></v-text-field>

        <div class="d-flex flex-column">
          <v-btn
            to="/register"
            color="success"
            class="mt-4"
            block
            @click="submitForm"
          >
            회원가입
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
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
      password2: "",
      secretKey: `${process.env.VUE_APP_CRYPTO_KEY}`,
      emailRules: [
        (v) => !!v || "입력해주세요",
        (v) => /.+@.+\..+/.test(v) || "email을 입력해주세요",
      ],
      passwordRules: [
        (v) => !!v || "입력해주세요",
        (v) => (v && v.length >= 8) || "비밀번호는 8글자 이상이어야 합니다.",
        (v) =>
          /[!@#$%^&*()_+{}[\]:;<>,.?~]/.test(v) ||
          "특수문자를 하나 이상 포함해주세요.",
      ],
      password2Rules: [
        (v) => !!v || "입력해주세요",
        (v) => v === this.password || "비밀번호가 일치하지 않습니다.",
      ],
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
        // const response = await axios.post("http://localhost:3001/signUp", {
        const response = await axios.post(
          `${process.env.VUE_APP_LOGIN_API}/signUp`,
          {
            userEmail: this.userEmail,
            password: hashedPassword,
          }
        )
        console.log(response) // 서버 응답 확인
        alert("회원가입에 성공하였습니다. 로그인을 해주세요.")
        this.$router.push("/login")
      } catch (error) {
        console.error(error)
        alert("회원가입에 실패하였습니다." + `\n` + error.response.data)
      }
    },
  },
}
</script>
