import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import axios from 'axios'
import axios from '@/axios/axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueCookies from 'vue-cookies'
import {store} from './store/vuex'

Vue.use(BootstrapVue)
Vue.use(VueCookies)
Vue.config.productionTip = false
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
