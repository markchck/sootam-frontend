<template>
  <div>
    <v-row>
      <v-col md="1" offset-md="10">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              class="ml-auto"
            >
              Menu
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click="handleItemClick(item.title)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>

    <Search_problem></Search_problem>
  </div>
</template>
<script>
import Search_problem from "@/components/Search_problem.vue"
import { mapMutations } from "vuex"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Main",

  data() {
    return {
      items: [{ title: "로그아웃 하기" }],
    }
  },

  methods: {
    ...mapMutations(["setStatus"]),
    handleItemClick(title) {
      if (title === "로그아웃 하기") {
        sessionStorage.removeItem("accessToken")
        this.setStatus("landing")
        this.$router.push("/")
      }
    },
  },
  components: { Search_problem },
}
</script>
