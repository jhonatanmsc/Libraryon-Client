<template>
  <div class="home">
    <div v-if="forAutor">
        <h4 class="green-text center text-darken-4"><b>Livros de sua publicação</b></h4>
    </div>
    <div v-else>
        <h4 class="green-text center text-darken-4"><b>Livros favoritos</b></h4>
    </div>

  	<div class="m-content row valign-wrapper">
  		<button v-if="!activeDelete && !activeEdit" class="m-btn waves-effect waves-light btn-large col m2" @click="getBooks(pagination.previous)"
                :disabled="!pagination.previous">
            <i class="material-icons left">chevron_left</i>
        </button>

        <div class="row col m8">
	        <div v-for="book in books" class="col m4 s12 center" v-if="!activeDelete && !activeEdit">

	            <h4><b class="red-text text-darken-4">{{ book.name }}</b></h4>

				<div v-if="!forAutor">
	                <button data-target="modal1" class="excluir red waves-effect waves-light btn modal-trigger" :disabled="disabled" @click="deleteModalActivate(book)">
	                    <i class="material-icons left">close</i>Excluir
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
                <input id="titulo" v-model="book.name" type="text" class="validate inline">
                <label for="titulo">Título do livro</label>

              </div><br>
              <br>
              <div class="m-input input-field inline ">
                <input id="edicao" v-model="book.edition" type="text" class="validate inline">
                <label for="edicao">Edição</label>
				
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
  	name: 'books_list',
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
  		this.getBooks('http://localhost:8000/genres/');
  		if(localStorage.getItem('type') == 'autor'){
  			this.forAutor = true;
  		}
  	},
  	updated() {
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
	        this.$http.get(url, {
            headers: { "content-type": "application/json" , "Authorization" : "Bearer " + localStorage.getItem('token_access')}
          })
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

