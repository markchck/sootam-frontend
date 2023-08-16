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
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        @click="
          downPdf(
            selected,
            selectedYear,
            selectedMonth,
            selectedCopyright,
            selectedTestType,
            selectedNumber
          )
        "
      >
        PDF다운
      </v-btn>
    </v-card-actions>
    <v-divider class="mt-2"></v-divider>

    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="similarProblems"
      item-key="sk"
      show-select
      class="elevation-1"
    >
      <!-- eslint-disable-next-line vue/valid-v-slot-->
      <template v-slot:item.pdf="{ item }">
        <v-btn depressed x-small @click="preview(item)"> 미리보기 </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { PDFDocument } from "pdf-lib"
import download from "downloadjs"
export default {
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
      s3Url: `${process.env.VUE_APP_S3_URL}`,
      images: [],
    }
  },
  methods: {
    preview(item) {
      console.log(item)
    },
    downPdf(items, year, month, copyright, testType, number) {
      items.forEach((item) => {
        this.images.push([
          `${this.s3Url}/store/${item.problemImage}`,
          `${this.s3Url}/store/${item.solutionImage}`,
        ])
      })
      this.mergeAndDownPdf(
        this.images,
        year,
        month,
        copyright,
        testType,
        number
      )
      this.selected = []
    },
    async mergeAndDownPdf(images, year, month, copyright, testType, number) {
      let mergedPdf = await PDFDocument.create()
      const numDocs = images.length
      for (var i = 0; i < numDocs; i++) {
        const [problem, solution] = images[i]
        const bufferedProblem = await fetch(problem).then((res) =>
          res.arrayBuffer()
        )
        const bufferedSolution = await fetch(solution).then((res) =>
          res.arrayBuffer()
        )
        const pdfProblem = await PDFDocument.load(bufferedProblem)
        const pdfSolution = await PDFDocument.load(bufferedSolution)

        const problemLength = pdfProblem.getPageCount()
        const solutionLength = pdfSolution.getPageCount()

        for (let j = 0; j < problemLength; j++) {
          const [problemPage] = await mergedPdf.copyPages(pdfProblem, [j])
          mergedPdf.addPage(problemPage)
        }
        for (let j = 0; j < solutionLength; j++) {
          const [solutionPage] = await mergedPdf.copyPages(pdfSolution, [j])
          mergedPdf.addPage(solutionPage)
        }
      }
      let pdfBytes = await mergedPdf.save()
      download(
        pdfBytes,
        `${year}년 ${month}월 ${copyright} ${testType}형 ${number}번 유사문제`,
        "application/pdf"
      )
    },
  },
}
</script>
