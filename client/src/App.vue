<template>
  <div id="app">
    <h1>DEVELOPMENT</h1>
    <h1>Welcome to your Stock Portfolio</h1>
    <h2>Select your stock</h2>

      <stock-view :stocks="stocks"/>
      <stock-prices />
      <button v-on:click="groupEachStock" name="button">GET ME Groups</button>

  </div>
</template>

<script>
import StockView from './components/StockView';
import StockPrices from './components/StockPrices';
import {eventBus} from './main';


export default {
  name: 'app',
  data () {
    return {
      stocks: [],
      apiCall: null,
      currentStockPrice: null,
      uniqueStocks: null
    }
  },
  components:{
    StockView,
    StockPrices
  },
  mounted(){
    this.fetchStocks();

    eventBus.$on('stock-selected', (apiCall) => {
      this.callStock(apiCall)
    })
  },
  methods: {
    fetchStocks(){
      fetch("http://localhost:3000/api/stocks")
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
        var finalKey = Object.keys(a).pop()
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
      var groupedStocks = groupBy(orders, 'stockName');
      console.log(groupedStocks)
    }
  },
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
