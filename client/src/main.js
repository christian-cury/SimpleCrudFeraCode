import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue';
import SweetAlert from 'vue-sweetalert2';

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(SweetAlert);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
