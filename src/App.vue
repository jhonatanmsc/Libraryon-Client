<template>
  <div id="app">
    <nav>
        <div class="nav-wrapper green">
            <div class="container">
                <router-link :to="{name: 'home'}"><i class="material-icons left">book</i>Libraryon</router-link>
                <ul  class="right hide-on-med-and-down">
                    <li>
                    <li v-if="!isAdmin()">
                      <router-link :to="{name: 'generos'}" >
                          <i class="material-icons left">book</i> Gêneros
                      </router-link>
                    </li>
                    <li v-if="isAdmin()">
                      <router-link :to="{name: 'autores'}" >
                          <i class="material-icons left">people</i> Autores
                      </router-link>
                    </li>
                    <li v-if="authenticated">
                      <a @click="logout()" href="/">
                        <i class="material-icons left">exit_to_app</i> Logout
                      </a>
                    </li>
                    <li v-else>
                      <router-link :to="{name: 'login'}" >
                        <i class="material-icons left">vpn_key</i> Login
                      </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

	<router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
  	return{
  		authenticated: false
  	}
  },
  mounted(){
  	if(localStorage.getItem('token')){
  		this.authenticated = true
  	}
  },
  methods:{
    isAdmin: function(){
        if(localStorage.getItem('tipo') == 'admin'){
          return true;
        }
        return false;
    },
  	logout: function(){
  		console.log('ITS WORK')
  		this.$store.commit('removeToken');
  	}
  }
}
</script>

<style>

</style>
