<template lang="html">
  <!-- <div class="item">
  <select v-on:change="handleClick" v-model="selectedCompany">
  <option v-for="company in companies" :value="company">{{ company['Name'] + ':' + ' ' + company['Symbol'] }}</option>
</select>
</div> -->
<div id="search-box" >
  <Dropdown v-if="companies!=[]"
  id="searchBox"
  :options="stockKeys"
  :disabled="false"
  :v-on:selected="selectStock"
  :v-model="selectedCompany"
  placeholder="Search for company here">
</Dropdown>
</div>


</template>

<script>
import CompanyDetail from './CompanyDetail';
import {eventBus} from '../main.js';
import Dropdown from 'vue-simple-search-dropdown';

export default {
  name: 'companies-list',
  data () {
    return {

      companies: [],
      stockKeys: [],
      currentCompany: ""

    }
  },
  methods: {
    getCompaniesList() {
      fetch('https://pkgstore.datahub.io/core/s-and-p-500-companies/constituents_json/data/64dd3e9582b936b0352fdd826ecd3c95/constituents_json.json')
      .then(res => res.json())
      // .then(companies => this.companies = companies)
      .then(res => {
        this.companies=res
        this.stockKeys=this.companies=this.formatSymbols(res)
      })
    },
    
    buildStockKeys() {
      if (this.allSymbols) {
        this.stockKeys=this.companies.filter((d) => ((d["Name"].toLowerCase().includes(this.search_box.toLowerCase())) || (d["Symbol"].toLowerCase().includes(this.search_box.toLowerCase()))));
      } else {
        this.stockKeys=[];
      }
    },

    formatSymbols(companies){
      return companies.map(company => {return {"id": company["Symbol"], "name": (company["Symbol"]+" : "+company["Name"])}})
    },
  },

  mounted(){
    this.getCompaniesList();
  },
  components: {
  "Dropdown": Dropdown
},
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
