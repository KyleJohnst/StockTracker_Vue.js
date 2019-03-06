<template lang="html">
  <!--THIS IS NO LONGER IN USE BUT MAY BE USEFUL AT A LATER STAGE IF NEEDED  -->
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

      eventBus.$emit('stock-selected', this.apiCall)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
