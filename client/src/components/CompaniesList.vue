<template lang="html">
  <div class="stocksList">
    <select v-on:change="handleClick" v-model="selectedCompany">
      <option v-for="company in companies">{{ company['Name'] + ':' + ' ' + company['Symbol'] }}</option>
    </select>
  </div>
</template>

<script>
import CompanyDetail from './CompanyDetail';
import {eventBus} from '../main.js';

export default {
  name: 'companies-list',
  props: ['companies'],
  date () {
    return {
      selectedCompany: ''
    }
  },
  methods: {
    getCompanyDetail() {
      fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + symbol + key)
      .then(res => res.json())
      .then(companies => {
        this.companies = companies
      })
    },
    handleClick() {
      eventBus.$emit('selected-company', this.companies[this['Symbol']]);
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
