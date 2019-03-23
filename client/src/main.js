// import Vue from 'vue';
// import App from './App.vue';

// Vue.config.productionTip = false;

// new Vue({
//   render: h => h(App),
// }).$mount('#app');

/* eslint-disable */

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import BootstrapVue from 'bootstrap-vue';
import VueTheMask from 'vue-the-mask';

Vue.use(VueTheMask)
Vue.use(VueRouter, VueAxios, axios);

Vue.component('kpi-diapers', require('./components/KPI/Diapers.vue'));



const routes = [
];

const router = new VueRouter({ mode: 'history', routes: routes});

const app = new Vue({
    el: '#app',
    router
});