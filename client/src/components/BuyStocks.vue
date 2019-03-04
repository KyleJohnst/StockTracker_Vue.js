<template lang="html">
  <select class="stocksList">
    <option v-for="item in items" :key="item['Symbol']" v-on:change="">{{ item['Name'] + ':' + ' ' + item['Symbol'] }}</option>
  </select>
</template>

<script>
import {eventBus} from '../main.js';

export default {
  name: 'buyStocks',
  props: ['items', 'selectedItem'],
  date () {
    return {
      item: [],
      selectedItem: 0
    }
  },
  methods: {
    getStockDetail(item) {
      fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + symbol + key)
      .then(res => res.json())
      .then(items => {
        this.items = items
      })
    },
    handleClick() {
      eventBus.$emit('selected-item', this.selectedItem[this['Symbol']]);
    }
  },
  mounted() {

  }
}
</script>

<style lang="css" scoped>
.stocksList {
  position: relative;
  display: inline-block;
  background-color: #eee;
  width: 300px;
  height: 30px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}
</style>
