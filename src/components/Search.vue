<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="1">
        <v-combobox
          label="년도"
          :items="year"
          v-model="selectedYear"
        ></v-combobox>
      </v-col>
      <v-col cols="1">
        <v-combobox
          label="월"
          :items="month"
          v-model="selectedMonth"
        ></v-combobox>
      </v-col>
      <v-col cols="1">
        <v-combobox
          label="기관"
          :items="copyright"
          v-model="selectedCopyright"
        ></v-combobox>
      </v-col>
      <v-col cols="1">
        <v-combobox
          label="형"
          :items="testType"
          v-model="selectedTestType"
        ></v-combobox>
      </v-col>
      <v-col cols="1">
        <v-combobox
          label="번호"
          :items="number"
          v-model="selectedNumber"
        ></v-combobox>
      </v-col>
      <v-col cols="1" class="d-flex justify-center mt-3">
        <v-btn
          depressed
          @click="
            submit(
              selectedYear,
              selectedMonth,
              selectedTestType,
              selectedCopyright,
              selectedNumber
            )
          "
        >
          검색
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios"
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Search",

  data() {
    return {
      year: ["2019", "2020", "2021"],
      month: ["03", "04", "05", "06", "07", "09", "10", "11"],
      copyright: ["교육청", "평가원", "수능"],
      testType: ["가", "나"],
      number: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
      ],
      selectedYear: "2019",
      selectedMonth: "06",
      selectedTestType: "나",
      selectedCopyright: "평가원",
      selectedNumber: "9",
    }
  },
  methods: {
    async submit(year, month, testType, copyright, number) {
      const response = await axios.get(
        `http://localhost:4000/getSingleProblem/?year=${year}&month=${month}&testType=${testType}&copyright=${copyright}&number=${number}`
        // `${process.env.VUE_APP_PROBLEM_API}/getSingleProblem/?year=${year}&month=${month}&testType=${testType}&number=${number}&copyright=${copyright}`
      )
      const { data = [] } = response
      if (data.length === 0) {
        alert("해당 문제가 존재하지 않습니다.")
      } else {
        this.getSimilarProblems(data[0])
      }
    },
    async getSimilarProblems(problem) {
      const { chatper = "", unitName = "" } = problem
      const response = await axios.get(
        `${process.env.VUE_APP_PROBLEM_API}/getSimilarProblems?chapter=${chatper}&unitName=${unitName}`
      )
      console.log(response)
    },
  },
}
</script>
