import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Home from '@/components/home'
import Login from '@/components/login'
import Autores from '@/components/autores'
import Registro from '@/components/register'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login},
    { path: '/autores', name: 'autores', component: Autores },
    { path: '/registrar', name: 'registrar', component: Registro }
  ]
})
