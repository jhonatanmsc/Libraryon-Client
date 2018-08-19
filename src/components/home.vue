<template>
  <div class="home">
    <div class="container row">
        <div v-for="book in books" class="col m4 s12" v-if="!book.editing">
            <h4><b>Título:</b> {{ book.title }}</h4>

            <p class="body"><b>Descrição:</b> {{ book.description }}</p>
            <div>
                <button class="excluir red waves-effect waves-light btn" :disabled="disabled" @click="modalActivate(book)">
                    <i class="material-icons left">close</i>Excluir
                </button>
                <button class="editar waves-effect waves-light btn" :disabled="disabled" @click="editBook(book)">
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
    <div>
    <div>
    <md-dialog-confirm id="gg"
      :md-active.sync="active"
      md-title='Você deseja realmente deletar o livro?'
      :md-content="bookName"
      md-confirm-text="Deletar"
      md-cancel-text="Cancelar"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
    </div>
</div>
</div>
	<div class="pagination center">
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
      disabled: true,
      bookName: '',
      active: false,
      books: [],
        pagination: {
            count: 0,
            next: '',
            previous: ''
        }
    }
  },
  mounted(){
  	this.getBooks('http://localhost/books');
    $('.modal').modal();
  },
  updated() {
	    this.$store.dispatch('inspectToken');
	  	if(localStorage.getItem('token_access')){
	  		this.disabled = false;
	  	}
	},
	methods: {

		onConfirm () {
        this.value = 'Agreed'
      },
      onCancel () {
        this.value = 'Disagreed'
      },

		modalActivate: function(book) {
			this.bookUrl = book;
			this.bookName = '<h2 class="red-text text-darken-4 center">'+book.title+'</h2>';
			this.active = true;
		},

	    deleteBook: function () {
	    	let book = this.bookUrl;
	    	if(book){
		        var index = this.books.indexOf(book)
		        console.log(book.url)

		        this.$http.delete(book.url)
		            .then(response => {
		            	console.log('BOOK DELETADO')
		                this.books.splice(index, 1)
		            })
		            .catch(e => {
		                console.log(e)
		            })
		    }
	    },
	    editBook: function (book) {
	        book.editing = true
	    },

	    cancelEditing: function (book) {
	        book.editing = false
	    },

	    confirmUpdate: function (book) {
	        this.$http.put(book.url, book)
	            .then(response => {
	            	console.log('BOOK EDITADO')
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
	                    pageSize: 6,
	                    total: Math.round(response.data.count / 6)
	                }
	                this.pagination = pagination
	            })
	    },

	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pagination{
	margin-top: 200px;
}
.md-dialog {
    max-width: 768px;
  }
  #gg{
  	background-color: white;
  }
</style>
