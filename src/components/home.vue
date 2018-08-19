<template>
  <div class="home">
  	<div class="m-content row valign-wrapper">
  		<button class="m-btn waves-effect waves-light btn-large col m2" @click="getBooks(pagination.previous)"
                :disabled="!pagination.previous">
            <i class="material-icons left">chevron_left</i>
        </button>

        <div class="row col m8">
	        <div v-for="book in books" class="col m4 s12 center" v-if="!book.editing">
	            <h4><b class="red-text text-darken-4">{{ book.title }}</b></h4>

	            <img :src="book.thumb" class="book-img"/>
	            <div>
	                <button class="excluir red waves-effect waves-light btn" :disabled="disabled" @click="deleteModalActivate(book)">
	                    <i class="material-icons left">close</i>Excluir
	                </button>
	                <button class="editar waves-effect waves-light btn" :disabled="disabled" @click="editBook(book)">
	                    <i class="material-icons left">cloud</i>Editar
	                </button>
	            </div>

	        </div>
	        <div v-else>
	            
	        </div>
    		<div>
			    <md-dialog-confirm id="delete-modal"
			      :md-active.sync="active"
			      :md-content="contentDeleteModal"
			      md-confirm-text="Deletar"
			      md-cancel-text="Cancelar"
			      @md-cancel="onCancel"
			      @md-confirm="onConfirm" />
    		</div>
		</div>

		<button class="m-btn waves-effect waves-light btn-large col m2" @click="getBooks(pagination.next)" :disabled="!pagination.next">
            <i class="material-icons left">chevron_right</i>
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
      	contentDeleteModal: '',
      	contentEditModal: '',
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

		deleteModalActivate: function(book) {
			this.bookUrl = book;
			this.contentDeleteModal = `
				<b style="font-size: 1.7em;"> Você tem certeza que quer deletar o item
					<label style="font-size: 1em;" class="red-text text-darken-4 center">`+
						book.title+
					`</label> ?
				</b>`
			this.active = true;
		},

		editModalActivate: function(book) {
			this.bookUrl = book;
			this.contentEditModal = `
				<h2>Editando Livro</h2>
	            <input width="100%" v-model="book.title"><br>
	            <textarea v-model="book.description" rows="5" cols=100></textarea><br>
	            <p class="user">{{ book.title }}</p>
	            <div>
	                <button @click="confirmUpdate(book)">Atualizar</button>
	                <button @click="cancelEditing(book)">Cancelar</button>
	            </div>`
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
#delete-modal{
	background-color: white;
}
.book-img{
	width: 50%;
	height: 50%;
}
.m-content{
	margin-left: 40px;
	margin-right: 40px;
}
.m-btn{
	width: 60px !important;
}
</style>
