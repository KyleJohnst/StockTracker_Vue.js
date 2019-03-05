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
        colors: ['red', 'blue', 'green', 'orange'],
        is3D: true,
        title: 'Stock Holdings',
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
