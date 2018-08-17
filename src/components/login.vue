<template>
  <div class="login">
    <div class="container row">
        <form v-on:submit.prevent="logar" id="form" class="col s12">
            <h4 class="green-text darken-2 center">Login</h4>

            <div class="row">
                <div class="input-field col s6 pull-s3 push-s3">
                    <input id="email" type="text" class="validate" v-model="user.username">
                    <label for="email">Email</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6 pull-s3 push-s3">
                    <input id="senha" type="password" class="validate" v-model="user.password">
                    <label for="senha">Senha</label>
                </div>
            </div>
            <button class="green darken-3 waves-effect waves-light btn btn-large col s6 pull-s3 push-s3"
                    type="submit"
                    name="action">
                Entrar
            </button>
        </form>
    </div>
  </div>  
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      user: {
        'username': '',
        'password': '',
      }
    }
  },
  methods: {
  	logar: function() {
  		axios.post('http://localhost/api/token/jwt/', this.user)
		.then(response => {
			let acessToken = response.data.access
			let refreshToken = response.data.refresh
			localStorage.setItem('token_access', acessToken)
			localStorage.setItem('token_refresh', refreshToken)
			this.$emit("authenticated", true);
			this.$router.push('/');
  		})
  		.catch(response => {
  			console.log('ERROR');
  			console.log(response);
  		})
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
