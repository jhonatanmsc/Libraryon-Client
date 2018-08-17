<template>
  <div class="home">
    <div class="container row" v-for="book in books">
        <div class="col s4" v-if="!book.editing">
            <h4><b>Título:</b> {{ book.title }}</h4>

            <p class="body"><b>Descrição:</b> {{ book.description }}</p>
            <div>
                <button class="excluir red waves-effect waves-light btn" @click="deleteBook(book)">
                    <i class="material-icons left">close</i>Excluir
                </button>
                <button class="editar waves-effect waves-light btn" @click="editBook(book)">
                    <i class="material-icons left">cloud</i>Editar
                </button>
            </div>

        </div>
        <div v-else>
            <h2>Editando Livro</h2>
            <input width="100%" v-model="book.title"><br>
            <textarea v-model="book.description" rows="5" cols=100></textarea><br>
            <p class="user">{{ book.title }}</p>
            <div>
                <button @click="confirmUpdate(book)">Atualizar</button>
                <button @click="cancelEditing(book)">Cancelar</button>
            </div>
        </div>

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
  name: 'home',
  data () {
    return {
      books: [],
        pagination: {
            count: 0,
            next: '',
            previous: ''
        }
    }
  },
  mounted() {
	    this.getBooks('http://localhost/books')

	  	if(!this.authenticated){
	  		$('excluir').prop('disabled', true);
	  		$('editar').prop('disabled', true);
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
