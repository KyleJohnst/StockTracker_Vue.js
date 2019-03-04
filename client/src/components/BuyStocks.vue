<template lang="html">
  <select class="stocksList" name="item['Symbol']">
    <option v-for="item in items" :key="item['Symbol']">{{ item['Name'] + ':' + ' ' + item['Symbol'] }}</option>
  </select>
</template>

<script>
export default {
  name: 'buyStocks',
  props: ['items'],
  date () {
    return {
      item: [],
      selectedItem: null
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="css" scoped>
.stocksList {
  position: relative;
  display: inline-block;
  width: 300px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}
</style>
