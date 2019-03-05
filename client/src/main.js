import Vue from 'vue'
import App from './App.vue'

<<<<<<< HEAD
=======
import VueGoogleCharts from 'vue-google-charts'
Vue.use(VueGoogleCharts)

>>>>>>> ebde95275fac03908365f3750cfe5d7e69cc691d
export const eventBus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
})
