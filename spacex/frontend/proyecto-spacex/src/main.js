import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueParticles from 'vue-particles'
import router from './router'
import store  from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'


// Filters
Vue.filter('toDate', (date) => {
  let shortTime = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Intl.DateTimeFormat('en-BG', shortTime).format(date)
})

Vue.filter('toDateOnly', (date) => {
  let shortTime = { year: 'numeric', month: 'short', day: 'numeric'};
  return new Intl.DateTimeFormat('en-BG', shortTime).format(date)
})


Vue.use(Buefy)

Vue.use(VueParticles)

Vue.config.productionTip = false

axios.defaults.baseURL = "https://spacexeoi.herokuapp.com/"

Vue.use(VueAxios, axios)



new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
