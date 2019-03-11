<template lang="html">
  <div class="item">
    <select v-on:change="handleClick" v-model="selectedCompany">
      <option v-for="company in companies" :value="company">{{ company['Name'] + ':' + ' ' + company['Symbol'] }}</option>
    </select>
  </div>

</template>

<script>
import CompanyDetail from './CompanyDetail';
import {eventBus} from '../main.js';
import Dropdown from 'vue-simple-search-dropdown';

export default {
  name: 'companies-list',
  props: ['companies'],
  data () {
    return {
      selectedCompany: null,
      companies: [],
    }
  },
  methods: {
    getCompaniesList() {
      fetch('https://pkgstore.datahub.io/core/s-and-p-500-companies/constituents_json/data/64dd3e9582b936b0352fdd826ecd3c95/constituents_json.json')
      .then(res => res.json())
      .then(companies => this.companies = companies)
    },

    handleClick() {
      eventBus.$emit('selected-company', this.selectedCompany);
    }
  },
  mounted(){
    this.getCompaniesList();
  }
}

</script>

<style lang="css" scoped>
/* .stocksList {
  position: relative;
  display: inline-block;
  background-color: #eee;
  width: 250px;
  height: 20px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
} */

#stocksList {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #454B66;
  width: 250px;
  height: 23px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
}

div.item select{
  background-color: lightgrey;
}

</style>
