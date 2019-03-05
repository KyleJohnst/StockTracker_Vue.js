<template lang="html">
  <div class="">
    <!-- <ul v-for="stock in stocks">
    <li><p>Your {{ stock.stockName }} shareprice is ${{ stock.closingPrice }} and you have {{ stock.quantity }} shares with a total purchase  value of ${{ stock.quantity * stock.closingPrice }}</p></li>
  </ul> -->
  <p v-on:change="getPercentage">Current portfolio value ${{totalStockValue}} has changed by {{getPercentage()}}%</p>
</div>
</template>

<script>
export default {
  name: 'StockView',
  props: ['stocks', 'totalStockValue'],
  data(){
    return {
      initialValue: 0
    }
  },
  mounted(){
    this.fetchTotal()
  },
  watch:{
    totalStockValue: function(newValue) {
      this.getPercentage()
    }
  },
  methods: {
    fetchTotal(){
      let value = 0;
      for (let stock of this.stocks){
        value += stock.quantity * stock.closingPrice
      }
      this.initialValue = value
    },


    getPercentage() {
      if(this.initialValue){
        let currValue = this.totalStockValue
        let initValue = this.initialValue
        let increase = currValue - initValue
        let x = ((increase / initValue) * 100).toFixed(2)
        console.log(x);
        return x
      }
    }
  },

}

</script>

<style lang="css" scoped>
</style>
