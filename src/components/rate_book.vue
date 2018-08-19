<template>
  <div class="home container">
    <div class="container row" v-for="book in books">
        <div class="col s12" v-if="!book.editing">
            <h4><b>Título:</b> {{ book.title }}</h4>

            <p class="body"><b>Descrição:</b> {{ book.description }}</p>

			<button class="editar waves-effect waves-light btn col s4" :disabled="disabled" @click="editBook(book)">
				<i class="material-icons left">cloud</i>Editar
			</button>
			<button class="excluir red waves-effect waves-light btn col s4" :disabled="disabled" @click="deleteBook(book)">
				<i class="material-icons left">close</i>Excluir
			</button>
        </div>

		<div v-else>
            <h2>Avaliar Livro</h2>
            <h4><b>Título:</b> {{ book.title }}</h4>
			<div class="row">
				<div class="col s12">
					Nota:
					<div class="input-field inline">
						<input id="qtd_inline" v-model="score.score" type="number" class="validate">
						<label for="qtd_inline">nota do livro</label>
					</div>
				</div>
			</div>
            <div>
                <button class="editar waves-effect waves-light btn col s4" @click="rateBook(book)">
					<i class="material-icons left">cloud</i>Confirmar Voto</button>
                <button class="excluir red waves-effect waves-light btn col s4" @click="cancelEditing(book)">
					<i class="material-icons left">close</i>Cancelar</button>
            </div>
        </div>
        <!--div v-else>
            <h2>Avaliar Livro</h2>
            <input width="100%" v-model="book.title"><br>
            <textarea v-model="book.description" rows="5" cols=100></textarea><br>
            <p class="user">{{ book.title }}</p>
            <div>
                <button @click="confirmUpdate(book)">Atualizar</button>
                <button @click="cancelEditing(book)">Cancelar</button>
            </div>
        </div-->

    </div>

    <div class="pagination">
        <button class="waves-effect waves-light btn" @click="getBooks(pagination.previous)"
                :disabled="!pagination.previous">
            <i class="material-icons left">chevron_left</i>Previous
        </button>
        <button class="waves-effect waves-light btn" @click="getBooks(pagination.next)" :disabled="!pagination.next">
            <i class="material-icons left">chevron_right</i>Next
        </button>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'rate',
  data () {
    return {
      disabled: true,
      books: [],
        pagination: {
            count: 0,
            next: '',
            previous: ''
		},
		score: {
			'score': 0,
		}
    }
  },
  mounted() {
	    this.getBooks('http://localhost/books');
	    this.$store.dispatch('inspectToken');
        console.log('mounted')
	  	if(localStorage.getItem('token_access')){
	  		this.disabled = false;
	  	}
	},
	methods: {
	    deleteBook: function (book) {
	        var index = this.books.indexOf(book)
	        this.books.splice(index)
	    },

	    deleteBook: function (book) {
	        var index = this.books.indexOf(book)

	        this.$http.delete('http://localhost/books/' + book.id + '/')
	            .then(response => {
	                this.books.splice(index, 1)
	            })
	            .catch(e => {
	                console.log(e)
	            })
	    },
		
		rateBook: function(book) {
			var score = {};
			score.book = this.book;
			score.lector = 1;
			score.score = 8.0;
			score.comment = "Algo";

        	this.$http.post('http://localhost/scores/create/', score)
            .then(response => {
                this.response = response
                this.errors = ''
            })
            .catch(response => {
  			console.log(response);
		  })
		},

		editBook: function (book) {
	        book.editing = true
		},

	    cancelEditing: function (book) {
	        book.editing = false
	    },

	    confirmUpdate: function (book) {
	        this.$http.put('http://localhost/books/' + book.id, book)
	            .then(response => {

	            })
	            .catch(e => {
	                console.log(e)
	            })
	        book.editing = false
	    },

	    getBooks: function (url) {
	        this.$http.get(url)
	            .then(response => {

	                response.data.results.map(function (book) {
	                    book.editing = false;
	                })
	                this.books = response.data.results

	                var pagination = {
	                    count: response.data.count,
	                    next: response.data.next,
	                    previous: response.data.previous,
	                    pageSize: 5,
	                    total: Math.round(response.data.count / 5)
	                }
	                this.pagination = pagination
	            })
	    },

	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
