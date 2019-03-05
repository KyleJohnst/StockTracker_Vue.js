<template lang="html">
  <div v-if='company'>
    <h2>Name: {{ company['Name'] }}</h2>
    <p>Symbol: {{ company['Symbol'] }}</p>
    <p>Sector: {{ company['Sector'] }}</p>
  </div>
</template>

<script>
import { eventBus } from '../main.js';
export default {
  name: 'company-detail',
  props: ['company'],
}
</script>

<style lang="css" scoped>
</style>
