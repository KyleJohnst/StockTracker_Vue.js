<template lang="html">
  <!-- <div class=""> -->
    <!-- <select id="stock_select" v-model="apiCall" v-on:change="changeStock" >
      <option value=disabled></option>
      <option value="AAPL">Apple Stocks (AAPL)</option>
      <option value="GOOG">Google Stocks (GOOG)</option>
    </select> -->
  <!-- </div> -->
</template>

<script>
import {eventBus} from '../main';

export default {
  name: 'stockPrices',
  props: ['currentStocks'],

  data(){
    return {
      apiCall: null
    }
  },
  methods: {
    changeStock(){
      // console.log(this.apiCall);
      eventBus.$emit('stock-selected', this.apiCall)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
