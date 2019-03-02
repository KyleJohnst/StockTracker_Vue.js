<template lang="html">
  <div class="">
    <ul v-for="stock in stocks">
      <li><p>Your {{ stock.stockName }} shareprice is ${{ stock.closingPrice }} and you have {{ stock.quantity }} shares with a total purchase  value of ${{ stock.quantity * stock.closingPrice }}</p></li>
    </ul>
    <p>Your total Portfolio value is ${{totalValue}}</p>
  </div>
</template>

<script>
export default {
  name: 'StockView',
  props: ['stocks'],
  computed: {
    totalValue: function() {
      let total = 0;
      for (var stock of this.stocks){
        total += stock.quantity * stock.closingPrice
      }
      return total;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
