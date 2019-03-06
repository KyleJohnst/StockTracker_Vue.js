<template lang="html">
  <!-- <div class=""> -->
    <!-- <ul v-for="stock in stocks">
      <li><p>Your {{ stock.stockName }} shareprice is ${{ stock.closingPrice }} and you have {{ stock.quantity }} shares with a total purchase value of ${{ stock.quantity * stock.closingPrice }}</p></li>
    </ul>
    <p>Your total Portfolio purchase value was $</p> -->
  <!-- </div> -->
</template>

<script>
export default {
  name: 'StockView',
  props: ['stocks', ],
  computed: {
    totalPercentage: function() {
      let totalPurchase = 0;
      for (var stock of this.stocks){
        totalPurchase += stock.quantity * stock.closingPrice
      }
      return totalPurchase;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
