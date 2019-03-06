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
  props: ['stocks', 'totalStockValue', 'initialValue'],
  data(){
    return {

    }
  },
  mounted(){

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
  }
}

</script>

<style lang="css" scoped>
</style>
