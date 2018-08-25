<template>
<div id='register' class="container">
        <form class="col s12">
            <h4>Novo Usuário</h4>
            <div class="row">
                <div class="col s12">
                    Nome do leitor:
                    <div class="input-field inline">
                        <input id="nome_inline" v-model="new_user.name" type="text" class="validate">
                        <label for="nome_inline">Nome do Leitor</label>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col s12">
                    Idade:
                    <div class="input-field inline">
                        <input id="preco_inline" v-model="new_user.age" type="text" class="validate">
                        <label for="preco_inline">Idade do Leitor</label>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col s12">
                    Email:
                    <div class="input-field inline">
                        <input id="qtd_inline" v-model="new_user.email" type="text" class="validate">
                        <label for="qtd_inline">Email do Leitor</label>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col s12">
                    Senha:
                    <div class="input-field inline">
                        <input id="qtd_inline" v-model="new_user.password" type="text" class="validate">
                        <label for="qtd_inline">Senha</label>
                    </div>
                </div>
            </div>
            <button @click.prevent="newLector" class="waves-effect waves-light btn">
                <i class="material-icons right">account_circle</i>Criar Conta
            </button>
        </form>
        <p v-if="response">
            {{ response.status }} / {{ response.statusText }}
        </p>
        <p v-if="errors" class="errors">
            {{ errors.response.data }}
        </p>
    </div>

</template>

<script>
export default {
    name: 'register',
    data () {
        return {
        new_user: {
            'name': '',
            'age': '',
            'email': '',
            'password': '',
            },
        response: '',
        errors: '',
        }
    },
methods: {
    newLector: function() {
        this.$http.post('http://localhost:8000/authors/create/', this.new_user)
            .then(response => {
                this.response = response
                this.errors = ''
            })
            .catch(response => {
  			console.log(response);
  		})
}
}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>