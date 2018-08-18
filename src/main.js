// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
//import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import App from './App'
import router from './router'


import VueResource from "vue-resource"
Vue.use(VueResource);


Vue.config.productionTip = false

Vue.use(Vuex);
//Vue.use(VueAxios, axios);
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
      localStorage.setItem('token_access', newToken);
      state.jwt = newToken;
    },
    removeToken(state) {
      localStorage.removeItem('token_access');
      localStorage.removeItem('token_refresh');
      state.jwt = null;
      state.jwt_refresh = null;
    }
  },
  actions: {
    obtainToken(context, payload) {
      axios.post(this.state.endpoints.obtainJWT, payload)
        .then(response => {
          let accessToken = response.data.access
          let refreshToken = response.data.refresh
          this.state.jwt = accessToken
          localStorage.setItem('token_access', accessToken)
          localStorage.setItem('token_refresh', refreshToken)
          this.commit('updateToken', accessToken);
        })
        .catch(error => {
          console.log(error);
        })
    },
    refreshToken(context) {
      const payload = {
        refresh: this.state.jwt_refresh
      }

      axios.post(this.state.endpoints.refreshJWT, payload)
        .then((response) => {
          this.commit('updateToken', response.data.access)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    inspectToken(context) {
      const token = this.state.jwt;
      let isAuthenticated = false
      if (token) {
        const decoded = jwt_decode(token);
        const exp = decoded.exp;
        // SE está expirando em 30 min (1800 segs) E não está atingindo sua vida útil (24hrs - 30 min)
        // => REFRESH
        // SE está expirando em 30 min E está atingindo sua vida útil 
        // => NÃO ATUALIZAR 
        console.log(exp - (Date.now() / 1000))
        if (exp - (Date.now() / 1000) > 0) {
          this.dispatch('refreshToken')
        }
      } else {
        console.log('TOKEN NOT OK');
        this.commit('removeToken');
      }
    }
  }
});



new Vue({
  el: '#app',
  router,
  store: store,
  axios: axios,
  render: h => h(App)
});
