import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/diapers',
    name: 'Diapers',
    component: () => import('./views/diaper/Home.vue')
  },
  {
    path: '/diapers/create',
    name: 'NewDiaper',
    component: () => import('./views/diaper/New.vue')
  },
  {
    path: '/diaper/buy/:id',
    name: 'BuyDiaper',
    component: () => import('./views/diaper/Buy.vue')
  },
  {
    path: '/diaper/:id',
    name: 'ViewDiaper',
    component: () => import('./views/diaper/View.vue')
  },
  {
    path: '/models',
    name: 'Models',
    component: () => import('./views/model/Home.vue')
  },
  {
    path: '/models/create',
    name: 'NewModel',
    component: () => import('./views/model/New.vue')
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})
