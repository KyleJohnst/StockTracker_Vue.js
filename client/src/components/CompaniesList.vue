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
  v-on:selected="selectStock"
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
      currentCompany: null,
      searchResult: []

    }
  },
  methods: {
    getCompaniesList() {
      fetch('https://pkgstore.datahub.io/core/s-and-p-500-companies/constituents_json/data/64dd3e9582b936b0352fdd826ecd3c95/constituents_json.json')
      .then(res => res.json())
      .then(res => {
        this.companies=res
        this.stockKeys=this.companies=this.formatSymbols(res)
      })
    },

    searchKeys() {
      if (this.companies) {
        this.searchResult=this.companies.filter((key) => ((key["Name"].toLowerCase().includes(this.search_box.toLowerCase())) || (d["Symbol"].toLowerCase().includes(this.search_box.toLowerCase()))));
      } else {
        this.searchResult=[];
      }
    },

    selectStock(selected) {
  if (selected["id"]){
    if (this.currentCompany!=selected){
      const companyIndex = this.companies.findIndex(s => s["Symbol"]==selected["id"])
      const stock= selected
      eventBus.$emit('selected-company', stock)
      this.currentCompany=selected;
    }
  }
},

    formatSymbols(companies){
      return companies.map(company => {return {"id": company["Symbol"], "name": (company["Name"]+" : "+ company["Symbol"]) }})
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
