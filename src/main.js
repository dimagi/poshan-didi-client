import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import moment from 'moment'


import App from './App.vue'
import Buefy from 'buefy'
import './assets/scss/app.scss'

Vue.use(Buefy)
Vue.use(AsyncComputed)

Vue.config.productionTip = false

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).add(330, 'minutes').format('YYYY-MM-DD HH:mm')
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')

