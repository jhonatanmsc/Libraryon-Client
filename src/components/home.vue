<template>
  <div class="home">
  	<div class="m-content row valign-wrapper">
  		<button v-if="!active" class="m-btn waves-effect waves-light btn-large col m2" @click="getBooks(pagination.previous)"
                :disabled="!pagination.previous">
            <i class="material-icons left">chevron_left</i>
        </button>

        <div class="row col m8">
	        <div v-for="book in books" class="col m4 s12 center" v-if="!active">
	            <h4><b class="red-text text-darken-4">{{ book.title }}</b></h4>

	            <img :src="book.thumb" class="book-img"/>
	            <div>
	                <button data-target="modal1" class="excluir red waves-effect waves-light btn modal-trigger" :disabled="disabled" @click="deleteModalActivate(book)">
	                    <i class="material-icons left">close</i>Excluir
	                </button>
	                <button class="editar waves-effect waves-light btn" :disabled="disabled" @click="editBook(book)">
	                    <i class="material-icons left">cloud</i>Editar
	                </button>
	            </div>

	        </div>
	        <div v-else>
	            
	        </div>
    		<!-- Modal Structure -->
    		<div v-if="active" style="height: 100vh; padding-top: 100px;">
			 <h3 > Você tem certeza que quer deletar o item?</h3>
			 <div class="center">
				<a @click="active = false" class="waves-effect blue-grey lighten-5 black-text btn-large">CANCELAR</a>
				<a @click="active = false;deleteBook()" class="waves-effect red darken-4 btn-large" style="margin-left: 20px;">DELETAR</a>
			 </div>
			</div>
		</div>

		<button v-if="!active" class="m-btn waves-effect waves-light btn-large col m2" @click="getBooks(pagination.next)" :disabled="!pagination.next">
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
			this.active = true;
		},

		editModalActivate: function(book) {
			this.bookUrl = book;
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
