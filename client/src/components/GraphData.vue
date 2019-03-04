<template lang="html">
  <div id="chart-container">

    <p> {{ createChartData }}</p>

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
  props: ['stocks'],
  components: {
    Gchart
  },
  data(){
    return {
      chartData: [],
      chartOptions: {
        width: 1000,
        height: 500,
        colors: ['red', 'blue', 'yellow', 'green'],
        is3D: true,
        title: 'Stock Holdings',
        vAxis: { title: 'Quantity' },
        hAxis: { title: 'xxxxxx'},
        // legend: 'none',
        pieSliceText: 'label',
        slices: {  4: {offset: 0.2},
        12: {offset: 0.3},
        14: {offset: 0.4},
        15: {offset: 0.5},
      }
    }
  }
},
computed: {
  createChartData(){
    let data = [];
    // var data = this.stocks.map(stock => Object.entries(stock));
    // // data[0] = Object.keys(this.stocks);
    // data.forEach(stock => {
    //   let key = stock[0]
    //   let value = stock[1]
    //   this.chartData = data
    // });
    data.push(this.stocks.map(name => name.stockName));
    data.push(this.stocks.map(price => price.closingPrice));
    data.push(this.stocks.map(quantity => quantity.quantity));
    this.chartData = data


  }
}
}
</script>

<style lang="css" scoped>
</style>
