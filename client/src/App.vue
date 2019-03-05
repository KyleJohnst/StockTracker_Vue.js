<template>
  <div id="app">
    <h1>Welcome to your Stock Portfolio</h1>
    <h2>Select your stock</h2>
    <stock-view :stocks="stocks"/>
    <stock-prices />
    <graph-data v-if="groupedTotals" :groupedTotals="groupedTotals"></graph-data>

  </div>
</template>

<script>
import StockView from './components/StockView';
import StockPrices from './components/StockPrices';
import CompaniesList from './components/CompaniesList';
import CompanyDetail from './components/CompanyDetail';
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
      companies: [],
      selectedCompany: null,
      totalStockValue: []
    }
  },
  components:{
    StockView,
    StockPrices,
    CompaniesList,
    CompanyDetail,
    GraphData
  },
  mounted(){

  },
  mounted () {
    this.getCompaniesList();
    this.fetchStocks()
    .then(gstock => this.groupEachStock())
    .then(tstock => this.totalEachStock())
    Promise.all([this.groupEachStock(), this.totalEachStock()])
    .then(result => {
      return result
    })

    eventBus.$on('selected-company', (selectedCompany) => {
      this.selectedCompany = selectedCompany
      this.callStock(selectedCompany)
    }),
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
    callStock(selectedCompany) {
      const key = '&apikey=JUSZH2FOEHQR49T8'
      fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + this.selectedCompany['Symbol'] + key)
      .then(res => res.json())
      .then(result => {
        var a = result['Time Series (Daily)']
        var finalKey = Object.keys(a).shift()
        this.selectedCompany = {
          ...this.selectedCompany,
          Price: a[finalKey]['4. close']
        };
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
    getCompaniesList() {
      fetch('https://pkgstore.datahub.io/core/s-and-p-500-companies/constituents_json/data/64dd3e9582b936b0352fdd826ecd3c95/constituents_json.json')
      .then(res => res.json())
      .then(companies => this.companies = companies)
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
        })
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
  margin-top: 20px;

}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
</style>
