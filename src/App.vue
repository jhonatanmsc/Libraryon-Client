<template>
  <div id="app">
    <nav>
        <div class="nav-wrapper green">
            <div class="container">
                <a href="/" class="brand-logo">Libraryon</a>
                <ul  class="right hide-on-med-and-down">
                    <li v-if="authenticated"><a @click="logout()" href="/">
                        <i class="material-icons left">sentiment_very_satisfied</i> Logout</a></li>
                    <li v-else><a href="/login" >
                      <i class="material-icons left">sentiment_very_satisfied</i> Login</a></li>
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
  	if(this.$store.dispatch('inspectToken')){
  		this.authenticated = true
  	}
  },
  methods:{
  	logout: function(){
  		this.$store.dispatch('removeToken');
  	}
  }
}
</script>

<style>

</style>
