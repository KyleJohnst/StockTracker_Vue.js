<template lang="html">
<div class="">
  <ul v-for="stock in stocks">
    <li><h2>{{stock.stockName}}</h2></li>
  </ul>

</div>
</template>

<script>


export default {
  name: 'StockView',
  props: ['stocks']
}
</script>

<style lang="css" scoped>
</style>
