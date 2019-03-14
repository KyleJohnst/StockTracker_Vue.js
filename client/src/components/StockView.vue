<template lang="html">
  <div class="">
    <!-- <ul v-for="stock in stocks"> ******* THis could be added in at a later time for more detail
    <li><p>{{ stock.stockName }} price per share ${{ stock.closingPrice }} Shares held {{ stock.quantity }}</p></li>
  </ul> -->
  <p>Current portfolio value ${{totalStockValue}} has changed by {{getPercentage}}%</p>
</div>
</template>

<script>
export default {
  name: 'StockView',
  props: ['totalStockValue', 'initialValue'],
  data(){
    return {
      stocks: [],
      updatedStocks: []
    }
  },
  mounted(){
    this.fetchStocks()
    .then(upStock => this.fetchCurrentValue());
  },
  computed: {
    getPercentage() {
      if(this.initialValue){

        let currValue = this.totalStockValue
        let initValue = this.initialValue
        let increase = currValue - initValue
        let x = ((increase / initValue) * 100).toFixed(2)

        return x
      }
    }
  },
  methods: {
    fetchStocks(){
      return fetch("http://localhost:3000/api/stocks")
      .then(res => res.json())
      .then(stocks => this.stocks = stocks);
    },
    fetchCurrentValue() {
      // debugger;
      const key = '&apikey=G0JO6UF2EJDL6UXE'
      for(let stock of this.stocks){
        console.log(stock);
        fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + stock['stockName'] + key)
        .then(res => res.json())
        .then(result => {
          var a = result['Time Series (Daily)']
          var finalKey = Object.keys(a).shift()
          this.stock['Price:']= a[finalKey]['4. close'];
        })
      }
    }
  }
}

</script>

<style lang="css" scoped>
</style>
