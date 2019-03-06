<template lang="html">
  <div class="">
    <!-- <ul v-for="stock in stocks">
    <li><p>Your {{ stock.stockName }} shareprice is ${{ stock.closingPrice }} and you have {{ stock.quantity }} shares with a total purchase  value of ${{ stock.quantity * stock.closingPrice }}</p></li>
  </ul> -->
  <p>Current portfolio value ${{totalStockValue}} has changed by {{getPercentage}}%</p>
</div>
</template>

<script>
export default {
  name: 'StockView',
  props: ['stocks', 'totalStockValue', 'initialValue'],
  data(){
    return {
      // initialValue: 0
    }
  },
  mounted(){
    this.getPercentage()
    // .then(perc => this.getPercentage())
    // Promise.all([this.getPercentage(), this.fetchTotal()])
    // .then(result => {
    //   return result
    // })
  },
  // watch:{
  //   initialValue: function(newValue) {
  //     // debugger;
  //     this.getPercentage()
  //
  //   }
  // },
  computed: {
    // fetchTotal(){
    //   let value = 0;
    //   for (let stock of this.stocks){
    //     value += stock.quantity * stock.closingPrice
    //   }
    //   // debugger
    //   this.initialValue = value
    // },


    getPercentage() {
      if(this.initialValue){
        // debugger;
        let currValue = this.totalStockValue
        let initValue = this.initialValue
        let increase = currValue - initValue
        let x = ((increase / initValue) * 100).toFixed(2)
        // console.log(x);
        return x

      }
    }
  }
}

</script>

<style lang="css" scoped>
</style>
