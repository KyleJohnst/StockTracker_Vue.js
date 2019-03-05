<template lang="html">
  <div id="chart-container">
<<<<<<< HEAD
    <p> {{ createChartData }} </p>
=======

    <p> {{ createChartData }} </p>

>>>>>>> ebde95275fac03908365f3750cfe5d7e69cc691d
    <div class="g-chart">
      <GChart
      type="PieChart"
      :data="chartData"
      :options="chartOptions"
      />
    </div>
  </div>
<<<<<<< HEAD
</template>
=======

</template>

>>>>>>> ebde95275fac03908365f3750cfe5d7e69cc691d
<script>

import { Gchart } from 'vue-google-charts';

<<<<<<< HEAD
=======

>>>>>>> ebde95275fac03908365f3750cfe5d7e69cc691d
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
<<<<<<< HEAD
        colors: ['red', 'blue', 'green', 'orange'],
        is3D: true,
        title: 'Stock Holdings',
=======
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
>>>>>>> ebde95275fac03908365f3750cfe5d7e69cc691d
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
