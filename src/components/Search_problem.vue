<template>
  <div>
    <!-- 문제 검색 -->
    <v-container fluid mt-10>
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

    <!-- 문제 결과 -->
    <v-container v-if="similarProblems.length !== 0">
      <v-card-title>
        <h3 class="d-flex">유사문제</h3>
        <v-spacer></v-spacer>
        <v-card-actions mt-3>
          <v-btn
            color="primary"
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
      </v-card-title>
      <v-divider></v-divider>

      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="similarProblems"
        item-key="sk"
        show-select
        class="elevation-1"
      >
        <!-- eslint-disable-next-line vue/valid-v-slot-->
        <!-- <template v-slot:item.pdf="{ item }">
        <v-btn depressed x-small @click="preview(item)"> 미리보기 </v-btn>
      </template> -->
      </v-data-table>
    </v-container>
  </div>
</template>
<script>
import axios from "axios"
import { PDFDocument } from "pdf-lib"
import download from "downloadjs"
export default {
  name: "Search_problem",

  data() {
    return {
      year: ["2012", "2013", "2014", "2015", "2016", "2017"],
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
      selectedYear: "2012",
      selectedMonth: "06",
      selectedTestType: "가",
      selectedCopyright: "평가원",
      selectedNumber: "6",
      selectedChapter: "",
      selectedUnitName: "",
      similarProblems: [],
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
        // { text: "문제보기", value: "pdf" },
      ],
      s3Url: `${process.env.VUE_APP_S3_URL}`,
      images: [],
    }
  },
  watch: {
    selectedMonth(newValue) {
      if (newValue === "11") {
        this.selectedCopyright = "수능"
      } else if (newValue === "06" || newValue === "09") {
        this.selectedCopyright = "평가원"
      } else {
        this.selectedCopyright = "교육청"
      }
    },
  },
  methods: {
    initialize() {
      this.selectedYear = "2012"
      this.selectedMonth = "06"
      this.selectedTestType = "가"
      this.selectedNumber = "6"
      this.selectedChapter = ""
      this.selectedUnitName = ""
      this.selectedCopyright = "평가원"
      this.similarProblems = []
    },

    async submit(year, month, testType, copyright, number) {
      // const config = {
      //   headers: {
      //     accessToken: localStorage.getItem("accessToken"),
      //   },
      // }

      const { data = [] } = await axios.get(
        // `http://localhost:4000/getSingleProblem?year=${year}&month=${month}&testType=${testType}&copyright=${copyright}&number=${number}`
        `${process.env.VUE_APP_PROBLEM_API}/getSingleProblem?year=${year}&month=${month}&testType=${testType}&copyright=${copyright}&number=${number}`
        // config
      )

      if (data.length === 0) {
        alert("해당 문제가 존재하지 않습니다.")
        this.initialize()
      } else {
        this.getSimilarProblems(data[0])
      }
    },
    async getSimilarProblems(problem) {
      const { chapter = "", unitName = "" } = problem
      this.selectedChapter = chapter
      this.selectedUnitName = unitName
      const { data = [] } = await axios.get(
        // `http://localhost:4000/getSimilarProblems?chapter=${chapter}&unitName=${unitName}`
        `${process.env.VUE_APP_PROBLEM_API}/getSimilarProblems?chapter=${chapter}&unitName=${unitName}`
      )
      if (data.length === 0) {
        alert("해당 문제와 유사한 문제가 존재하지 않습니다.")
        this.initialize()
      } else {
        this.similarProblems = data
      }
    },
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
