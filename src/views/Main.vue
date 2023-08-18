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

        <div class="d-flex flex-column">
          <v-btn color="warning" class="mt-4" block @click="submitForm">
            Login
          </v-btn>
        </div>
        <div class="d-flex flex-column">
          <v-btn
            to="/register"
            color="success"
            class="mt-4"
            block
            @click="submitForm"
          >
            회원가입 하러가기
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
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

      secretKey: `${process.env.VUE_APP_CRYPTO_KEY}`,
      emailRules: [
        (v) => !!v || "입력해주세요",
        (v) => /.+@.+\..+/.test(v) || "email을 입력해주세요",
      ],
      passwordRules: [(v) => !!v || "입력해주세요"],
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
