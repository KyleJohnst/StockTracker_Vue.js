<template lang="html">
  <div class="item"v-if='company'>
    <h2>{{ company['name'] }} ({{ company['id'] }})</h2>
    <!-- <p>Sector: {{ company['Sector'] }}</p> -->
    <p>Current share price: ${{ company['Price'] }}</p>
    <p>Purchase price: ${{company['Price'] * this.quantity}}</p>
    <button class="btn" v-on:click="purchaseStockItem" type="button" name="button">Buy</button>
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
      quantity: 1
    }
  },
  methods: {
    purchaseStockItem(){
      const shareToSave = {
        stockName: this.company['id'],
        closingPrice: this.company['Price'],
        quantity: parseInt(this.quantity)
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
.btn {
  width: 45px;
  padding: 2px;
  color: #eee;
  font-size: 16px;
  border-radius: 3px;
  background-color: #333;
}
</style>
