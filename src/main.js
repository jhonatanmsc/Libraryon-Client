// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import jwt_decode from 'jwt-decode'
import Vuex from 'vuex'
import App from './App'
import router from './router'


import VueResource from "vue-resource"
Vue.use(VueResource);


Vue.config.productionTip = false

Vue.use(Vuex);
//		Setando regras do login com token JWT
const store = new Vuex.Store({
    state: {
        jwt: localStorage.getItem('token_access'),
        jwt_refresh: localStorage.getItem('token_refresh'),
        endpoints: {
            obtainJWT: 'http://localhost/api/token/jwt/',
            refreshJWT: 'http://localhost/api/token/jwt/refresh/',
        }
    },
    mutations: {
        updateToken(state, newToken) {
            localStorage.setItem('token', newToken);
            state.jwt = newToken;
        },
        removeToken(state) {
            localStorage.removeItem('token');
            state.jwt = null;
            state.jwt_refresh = null;
        }
    },
    actions: {
        obtainToken(user) {
            const payload = user;

            http.post(this.state.endpoints.obtainJWT, payload)
                .then(response => {
                    let acessToken = response.data.access
                    let refreshToken = response.data.refresh
                    localStorage.setItem('token_access', acessToken)
                    localStorage.setItem('token_refresh', refreshToken)
                    this.commit('updateToken', response.data.token);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        refreshToken() {
            const payload = {
                token: this.state.jwt
            }

            http.post(this.state.endpoints.refreshJWT, payload)
                .then((response) => {
                    this.commit('updateToken', response.data.token)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        inspectToken() {
            const token = this.state.jwt;
            if (token) {
                const decoded = jwt_decode(token);
                const exp = decoded.exp
                    // SE está expirando em 30 min (1800 segs) E não está atingindo sua vida útil (24hrs - 30 min)
                    // => REFRESH
                    // SE está expirando em 30 min E está atingindo sua vida útil 
                    // => NÃO ATUALIZAR 
                if (exp - (Date.now() / 1000) < 1800) {
                    this.dispatch('refreshToken')
                    return true;
                } else if (!(exp - (Date.now() / 1000) < 1800)) {
                    return false;
                }
            } else {
                console.log('TOKEN NOT OK');
            }
        }
    }
});



new Vue({
    el: '#app',
    router,
    store: store,
    render: h => h(App)
});