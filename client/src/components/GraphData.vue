<template lang="html">
  <div class="item">

    <p>Stock Holdings</p>
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
        width: 750,
        height: 400,
        colors: ['red', 'yellow', 'green', 'blue', 'orchid', 'pink', 'orange', 'skyblue', 'black'],
        is3D: true,
        pieSliceText: 'percentage',
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
            color: "blue"
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
