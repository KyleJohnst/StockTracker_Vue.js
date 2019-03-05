<template lang="html">
  <div v-if='company'>
    <h2>{{ company['Name'] }} ({{ company['Symbol'] }})</h2>
    <p>Sector: {{ company['Sector'] }}</p>
    <p>Current share price: ${{ company['Price'] }}</p>
    <p>Purchase price: ${{company['Price'] * this.quantity}}</p>
    <button v-on:click="purchaseStockItem" type="button" name="button">Buy</button>
    <input v-model="quantity" type="number" name="" min="1">
  </div>
</template>

<script>
import { eventBus } from '../main.js';

export default {
  name: 'company-detail',
  props: ['company'],
  data() {
    return {
      // stockName: null,
      // closingPrice: null,
      quantity: 1
    }
  },
  methods: {
    purchaseStockItem(){
      const shareToSave = {
        stockName: this.company['Symbol'],
        closingPrice: this.company['Price'],
        quantity: this.quantity
      }

      fetch("http://localhost:3000/api/stocks", {
        method: "POST",
        body: JSON.stringify(shareToSave),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(purchaseStockItem => {
        eventBus.$emit('new-purchase', purchaseStockItem)
      });
    }}
  }
</script>

<style lang="css" scoped>
</style>
