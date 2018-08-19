<template>
  <div class="login">
    <div class="container row">
        <form v-on:submit.prevent="logar" id="form" class="col s12">
            <h4 class="green-text darken-2 center">Login</h4>
            <form style="margin-left: 240px;" class="valign-wrapper" action="#">
              Tipo de usuario: 
              <p class="">
                <label>
                  <input name="group1" type="radio" v-model="type" value="autor" checked />
                  <span>Autor</span>
                </label>
              </p>
              <p class="">
                <label>
                  <input name="group1" type="radio" v-model="type" value="leitor"  />
                  <span>Leitor</span>
                </label>
              </p>
              </form>
            <div class="row">
                <div class="input-field col s6 pull-s3 push-s3">
                    <input id="email" type="text" class="validate" v-model="username">
                    <label for="email">Email</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6 pull-s3 push-s3">
                    <input id="senha" type="password" class="validate" v-model="password">
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
export default {
  name: 'login',
  data () {
    return {
        username: '',
        password: '',
        type: '',
    }
  },
  methods: {
  	logar: function() {
        this.$store.dispatch('setUser', {type: this.type});
		    this.$store.dispatch('obtainToken', {username: this.username, password: this.password});
		    this.$router.push('/');
  		}
  	}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
