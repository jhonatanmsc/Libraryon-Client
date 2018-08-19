<template>
  <div class="home">
  	<div class="m-content row valign-wrapper">
  		<button v-if="!activeDelete && !activeEdit" class="m-btn waves-effect waves-light btn-large col m2" @click="getBooks(pagination.previous)"
                :disabled="!pagination.previous">
            <i class="material-icons left">chevron_left</i>
        </button>

        <div class="row col m8">
	        <div v-for="book in books" class="col m4 s12 center" v-if="!activeDelete && !activeEdit">
	            <h4><b class="red-text text-darken-4">{{ book.title }}</b></h4>

	            <img :src="book.thumb" class="book-img"/>

				<div v-if="!forAutor">
	                <button data-target="modal1" class="excluir red waves-effect waves-light btn modal-trigger" :disabled="disabled" @click="deleteModalActivate(book)">
	                    <i class="material-icons left">close</i>Votar
	                </button>
	            </div>

	            <div v-if="forAutor">
	                <button data-target="modal1" class="excluir red waves-effect waves-light btn modal-trigger" :disabled="disabled" @click="deleteModalActivate(book)">
	                    <i class="material-icons left">close</i>Excluir
	                </button>
	                <button class="editar waves-effect waves-light btn" :disabled="disabled" @click="editModalActivate(book)">
	                    <i class="material-icons left">cloud</i>Editar
	                </button>
	            </div>

	        </div>
	        <div v-else>
	            
	        </div>
    		<!-- Modal Structure -->
    		<div v-if="activeDelete" style="height: 100vh; padding-top: 100px;">
			 <h3 > Você tem certeza que quer deletar o item?</h3>
			 <div class="center">
				<a @click="activeDelete = false" class="waves-effect blue-grey lighten-5 black-text btn-large">CANCELAR</a>
				<a @click="activeDelete = false;deleteBook()" class="waves-effect red darken-4 btn-large" style="margin-left: 20px;">DELETAR</a>
			 </div>
			</div>

			<div class="" v-if="activeEdit" style="height: 100vh; padding-top: 100px; padding-left: 200px; padding-right: 200px;">
				<h3 class="center">Editar Livro</h3>
			 <div class="m-input input-field inline ">
                <input id="titulo" v-model="book.title" type="text" class="validate inline">
                <label for="titulo">Título do livro</label>

              </div><br>
              <div class="m-input input-field inline ">
                <input id="descr" v-model="book.description" type="text" class="validate inline">
                <label for="descr">Descrição do livro</label>
				
              </div><br>
              <div class="m-input input-field inline ">
                <input id="edicao" v-model="book.edition" type="text" class="validate inline">
                <label for="edicao">Edição</label>
				
              </div><br>
              <div class="m-input input-field inline ">
                <input id="price" v-model="book.price" type="number" class="validate inline">
                <label for="price">preço</label>
				
              </div><br>

			 <div class="center">
				<a @click="activeEdit = false" class="waves-effect blue-grey lighten-5 black-text btn-large">CANCELAR</a>
				<a @click="activeEdit = false;editBook()" class="waves-effect red darken-4 btn-large" style="margin-left: 20px;">ATUALIZAR</a>
			 </div>
			</div>
		</div>

		<button v-if="!activeDelete && !activeEdit" class="m-btn waves-effect waves-light btn-large col m2" @click="getBooks(pagination.next)" :disabled="!pagination.next">
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
      	activeDelete: false,
      	activeEdit: false,
      	forAutor: false,
      	book: '',
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
  		if(localStorage.getItem('type') == 'autor'){
  			this.forAutor = true;
  		}
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
			this.book = book;
			this.activeDelete = true;
		},

		editModalActivate: function(book) {
			this.book = book;
			this.activeEdit = true;
		},

	    deleteBook: function () {
	    	let book = this.book;
	    	if(book){
		        var index = this.books.indexOf(book)

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

	    editBook: function () {
	        this.$http.put(this.book.url, this.book)
	            .then(response => {
	            	console.log('BOOK EDITADO')
	            })
	            .catch(e => {
	                console.log(e)
	            })
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
.m-input{
	width: 450px !important;
}
</style>
