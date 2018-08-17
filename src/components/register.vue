<template>
  <div class="register">
    <div class="container row">
        <form method="POST" class="col s12">
            <h4 class="green-text darken-2 center">Registro</h4>

            <div class="row">
                <div class="input-field col s7 pull-s3 push-s3">
                    <input id="name" type="text" class="validate" required v-model="user.username">
                    <label for="name">name</label>
                </div>
                <div class="input-field col s7 pull-s3 push-s3">
                    <input id="age" type="number" class="validate" required v-model="user.username">
                    <label for="age">age</label>
                </div>
                <div class="input-field col s7 pull-s3 push-s3">
                    <input id="email" type="text" class="validate" required v-model="user.username">
                    <label for="email">Email</label>
                </div>
                <div class="input-field col s7 pull-s3 push-s3">
                    <input id="senha" type="password" class="validate" required v-model="user.password">
                    <label for="senha">Senha</label>
                </div>
            </div>
            <button @click="registrar(user)"
                    class="green darken-3 waves-effect waves-light btn btn-large col s6 pull-s3 push-s3"
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
  name: 'register',
  data () {
    return {
      user: {
        'username': '',
        'password': '',
        'url': 'localhost/api-token-auth/'}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>