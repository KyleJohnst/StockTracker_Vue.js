<template>
  <div id="app">
    <h1>DEVELOPMENT</h1>
    <h1>Welcome to your Stock Portfolio</h1>
    <h2>Select your stock</h2>

    <stock-view :stocks="stocks" :totalStockValue="totalStockValue"/>
    <stock-prices />
    <!-- <button v-on:click="groupEachStock" name="button">GET ME Groups</button>
    <button v-on:click="totalEachStock" name="button">GET ME TOTALS!!!</button> -->

    <graph-data v-if="groupedTotals" :groupedTotals="groupedTotals"></graph-data>


  </div>
</template>

<script>
import StockView from './components/StockView';
import StockPrices from './components/StockPrices';
import GraphData from './components/GraphData';
import {eventBus} from './main';


export default {
  name: 'app',
  data () {
    return {
      stocks: [],
      apiCall: null,
      currentStockPrice: null,
      groupedTotals: null,
      groupedStocks: null,
      totalStockValue: 0
    }
  },
  components:{
    StockView,
    StockPrices,
    GraphData
  },
  mounted () {

    this.fetchStocks()
    .then(gstock => this.groupEachStock())
    .then(tstock => this.totalEachStock())
    .then(svalue => this.totalPortfolio())
    Promise.all([this.groupEachStock(), this.totalEachStock(), this.totalPortfolio()])
    .then(result => {
      return result
    })
    // .then(responses => Promise.all(responses.map(res => res.json())))


    eventBus.$on('stock-selected', (apiCall) => {
      this.callStock(apiCall)
    })

  },
  methods: {
    fetchStocks(){
      return fetch("http://localhost:3000/api/stocks")
      .then(res => res.json())
      .then(stocks => this.stocks = stocks);
    },
    callStock(apiCall) {
      this.apiCall = apiCall
      let stock = this.apiCall
      const key = '&apikey=JUSZH2FOEHQR49T8'
      fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + stock + key)
      .then(res => res.json())
      .then(result => {
        var a = result['Time Series (Daily)']
        var finalKey = Object.keys(a).shift()
        this.currentStockPrice = a[finalKey]['4. close']
      })
    },

    groupEachStock(){
      var orders = this.stocks;
      function groupBy(objectArray, property) {
        return objectArray.reduce(function (acc, obj) {
          var key = obj[property];
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(obj);
          return acc;
        }, {});
      }
      var result = groupBy(orders, 'stockName');
      this.groupedStocks = result
    },

    totalEachStock(){
      let orders = this.groupedStocks
      let results = {};
      for(let key in orders){
        let orderArray = orders[key];
        results[key] = orderArray.reduce((runningTotal, order) => { return runningTotal + order.quantity}, 0)
      }
      this.groupedTotals = results
      console.log(results);
    },

    totalPortfolio(){
      var total = 0;
      var requestList = this.groupedTotals;

      for(let stock in requestList) {
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=JUSZH2FOEHQR49T8`)
        .then(res => res.json())
        .then(result => {
          var a = result['Time Series (Daily)']
          var finalKey = Object.keys(a).shift()
          var price = a[finalKey]['4. close']
          var value = price * requestList[stock]
          total += value
          this.totalStockValue = total.toFixed(2)
        })
      }
    },

    totalPercentage(totalPortfolio) {
      let initialValue = 0;
      let currentValue = this.totalPortfolio
      for (var stock of this.stocks){
        initialValue += stock.quantity * stock.closingPrice
      }

      function percentage(initValue, currValue){
        let increase = currValue - initValue
        let x = ((increase / initValue) * 100).toFixed(2)
        console.log(x);
      }
    }

  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
</style>
