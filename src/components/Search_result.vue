<template>
  <div>
    <v-card class="elevation-1">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header
            >{{ selectedYear }}년 {{ selectedMonth }}월 {{ selectedCopyright }}
            {{ selectedTestType }}형 {{ selectedNumber }}번
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            단원:{{ selectedChapter }}<br />
            유형: {{ selectedUnitName }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>

    <h3 class="d-flex mt-6">유사문제</h3>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="similarProblems"
      :single-select="singleSelect"
      item-key="year"
      show-select
      class="elevation-1"
    >
    </v-data-table>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Search_result",
  props: {
    similarProblems: Array,
    selectedYear: String,
    selectedMonth: String,
    selectedTestType: String,
    selectedNumber: String,
    selectedCopyright: String,
    selectedUnitName: String,
    selectedChapter: String,
  },
  data() {
    return {
      selected: [],
      headers: [
        {
          text: "년도",
          align: "start",
          sortable: true,
          value: "year",
        },
        { text: "월", value: "month" },
        { text: "출제 기관", value: "copyright" },
        { text: "형", value: "testType" },
        { text: "문제 번호", value: "number" },
        { text: "정답률", value: "successRate" },
        { text: "문제보기", value: "pdf" },
      ],
    }
  },
}
</script>
