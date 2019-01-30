import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App.vue'
import money from 'v-money'

import './firebase'

Vue.use(money, { precision: 4 })
Vue.use(VueFire)

new Vue({
  el: '#app',
  render: h => h(App)
})
