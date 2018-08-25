// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import Vuex from 'vuex'
import M from 'materialize-css'
import App from './App'
import router from './router'


import VueResource from "vue-resource"
Vue.use(VueResource);
Vue.use(M);
Vue.config.productionTip = false

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    customToken: localStorage.getItem('token'),
    user: '',
    tipo: '',
    endpoints: {
      obtainCustomToken: 'http://localhost:8000/api/token/custom',
    }
  },
  mutations: {
    updateToken(state, newToken) {
      localStorage.setItem('token', newToken);
      state.customToken = newToken;
    },
    removeToken(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('tipo');
      localStorage.removeItem('nome');
      state.customToken = null;
    }
  },
  actions: {
    obtainToken(context, payload) {
      axios.post(this.state.endpoints.obtainCustomToken, payload)
        .then(response => {
          let mCustomToken = response.data.token;
          let mUser = response.data.user_id;
          let mType = response.data.user_type;
          let name = response.data.user_name;
          this.state.customToken = mCustomToken;
          this.state.user = mUser;
          this.state.tipo = mType;
          localStorage.setItem('token', mCustomToken);
          localStorage.setItem('user', mUser);
          localStorage.setItem('tipo', mType);
          localStorage.setItem('nome', name);
        })
        .catch(error => {
          console.log(error);
        })
    },
  }
});



new Vue({
  el: '#app',
  router,
  store: store,
  axios: axios,
  render: h => h(App)
});
