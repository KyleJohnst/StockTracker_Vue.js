<template>
  <div id="app">
    <h1>Welcome to your Stock Portfolio</h1>
    <h2>Select your stock</h2>
    <buy-stocks :items='items'/>
    <!-- <test :items='items' /> -->
    <stock-view :stocks="stocks"/>
    <stock-prices />
    <button v-on:click="groupEachStock" name="button">GET ME Groups</button>
    <button v-on:click="totalEachStock" name="button">GET ME TOTALS!!!</button>

  </div>
</template>

<script>
import StockView from './components/StockView';
import StockPrices from './components/StockPrices';
import BuyStocks from './components/BuyStocks';
// import Test from './components/Test'
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
      items: []
    }
  },
  components:{
    StockView,
    StockPrices,
    BuyStocks
  },
  mounted(){
    this.fetchStocks();
    this.getList();

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
    },
    getList() {
      fetch('https://pkgstore.datahub.io/core/s-and-p-500-companies/constituents_json/data/64dd3e9582b936b0352fdd826ecd3c95/constituents_json.json')
      .then(res => res.json())
      .then(items => this.items = items)
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
