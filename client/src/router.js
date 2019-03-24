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
    path: '/about',
    name: 'about',
    component: () => import('./views/About.vue')
  },
  {
    path: '/diapers',
    name: 'Diapers',
    component: () => import('./views/diaper/Home.vue')
  },
  {
    path: '/diapers/new',
    name: 'NewDiaper',
    component: () => import('./views/diaper/New.vue')
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})
