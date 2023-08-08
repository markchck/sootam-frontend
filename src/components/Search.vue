<template>
  <v-row>
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
        :items="copyRight"
        v-model="selectedCopyRight"
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
    <v-btn depressed @click="submit"> 검색 </v-btn>
  </v-row>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Search",
  data() {
    return {
      year: ["2019", "2020", "2021"],
      month: ["3", "4", "5", "6", "7", "9", "10", "11"],
      copyRight: ["교육청", "평가원", "수능"],
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
      selectedYear: "",
      selectedMonth: "",
      selectedTestType: "",
      selectedCopyRight: "",
      selectedNumber: "",
    }
  },
  methods: {
    submit() {
      let body = {
        year: this.selectedYear,
        month: this.selectedMonth,
        testType: this.selectedTestType,
        number: this.selectedNumber,
        copyright: this.selectedCopyRight,
      }
      console.log(body)
    },
  },
}
</script>
