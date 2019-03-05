<template lang="html">
  <div class="">
    <ul v-for="stock in stocks">
      <li><p>Your {{ stock.stockName }} shareprice is ${{ stock.closingPrice }} and you have {{ stock.quantity }} shares with a total purchase  value of ${{ stock.quantity * stock.closingPrice }}</p></li>
    </ul>
    <p>Your total Portfolio value is $</p>
  </div>
</template>

<script>
export default {
  name: 'StockView',
  props: ['stocks', 'groupedTotals'],
  // computed: {
  //   totalValue: function() {
      // var total = 0;
      // var requestList = this.groupedTotals;
      //
      // for(let stock in requestList) {
      //   fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=JUSZH2FOEHQR49T8`)
      //   .then(res => res.json())
      //   .then(result => {
      //     var a = result['Time Series (Daily)']
      //     var finalKey = Object.keys(a).shift()
      //     var price = a[finalKey]['4. close']
      //     var value = price * requestList[stock]
      //     total += value
      //   })
      //   console.log(total);
      //   return total
      // }
    // }
  // }
}
</script>

<style lang="css" scoped>
</style>
