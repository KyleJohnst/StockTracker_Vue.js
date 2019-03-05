<template lang="html">
  <div id="chart-container">

    <p> {{ createChartData }} </p>

    <div class="g-chart">
      <GChart
      type="PieChart"
      :data="chartData"
      :options="chartOptions"
      />
    </div>
  </div>

</template>

<script>

import { Gchart } from 'vue-google-charts';


export default {
  name: 'GraphData',
  props: ['groupedTotals'],
  components: {
    Gchart
  },
  data(){
    return {
      chartData: [],
      chartOptions: {
        width: 1000,
        height: 500,
        colors: ['teal', 'slategrey', 'navy', 'ocean'],
        is3D: true,
        title: 'Stock Holdings',
        titlePosition: 'center',
        titleTextStyle: {
          bold: true,
          italic: true,
          fontSize: 22,
        },
        legend: {
          position: "top",
          alignment: "center",
          textStyle: {
            color: "brown"
          }
        }
      }
    }
  },
  computed: {
    createChartData(){
      this.chartData = [["Symbol", "Amount"], ...Object.entries(this.groupedTotals)]
    }
  }
}
</script>

<style lang="css" scoped>
</style>
