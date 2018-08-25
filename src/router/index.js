import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Home from '@/components/home'
import Login from '@/components/login'
import Autores from '@/components/autores'
import Register from '@/components/register'
import Rate from '@/components/rate_book'
import Genre from '@/components/list_genres'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
    mode: 'history',
    base: __dirname,
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/login', name: 'login', component: Login },
        { path: '/autores', name: 'autores', component: Autores },
        { path: '/novo-leitor', name: 'novo-leitor', component: Register },
        { path: '/avaliar-livros', name: 'avaliar', component: Rate },
        { path: '/generos', name: 'generos', component: Genre },
        { path: '/register', name: 'register', component: Register },
    ]
})