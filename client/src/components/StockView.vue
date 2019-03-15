<template lang="html">
  <div class="">
    <ul v-if="stock.Price" v-for="stock in stocks">
    <li><p>{{ stock.stockName }} price per share ${{ stock.closingPrice }} Shares held {{ stock.quantity }} current share price ${{stock.Price}}</p></li>
  </ul>
  <p>Current portfolio value ${{totalStockValue}} has changed by {{getPercentage}}%</p>
</div>
</template>

<script>
export default {
  name: 'StockView',
  props: ['initialValue'],
  data(){
    return {
      stocks: [],
      updatedStocks: [],
      totalStockValue: null
    }
  },
  mounted(){
    this.fetchStocks()
    .then(upStock => this.fetchCurrentValue())
    .then(cntStock => this.fetchTotalCurrValue())
  },
  computed: {
    getPercentage() {
      if(this.initialValue){

        let currValue = this.totalStockValue
        let initValue = this.initialValue
        let increase = currValue - initValue
        let y = ((increase / initValue) * 100).toFixed(2)

        return y
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
      const key = '&apikey=G0JO6UF2EJDL6UXE'
      for(let stock of this.stocks){
        let company = stock.stockName
        fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + company + key)
        .then(res => res.json())
        .then(result => {
          let a = result['Time Series (Daily)']
          let finalKey = Object.keys(a).shift()
          stock['Price']= a[finalKey]['4. close'];
        })
      }
    },
    fetchTotalCurrValue(){
      let value = 0;

      for (let stock of this.stocks){
        if (stock.Price) {
          value += stock.quantity * stock.Price
        }
      }
      this.totalStockValue = value
    }
  }
}

</script>

<style lang="css" scoped>
</style>
