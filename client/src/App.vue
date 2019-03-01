<template>
  <div id="app">
    <h1>DEVELOPMENT</h1>
    <h1>Welcome to your Stock Portfolio</h1>
    <h2>Select your stock</h2>

      <stock-view :stocks="stocks"/>
      <stock-prices />
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
      apiCall: null
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
