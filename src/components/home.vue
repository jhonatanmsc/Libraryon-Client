<template>
  <div class="home">
    <div v-if="forAutor">
        <h4 class="green-text center text-darken-4"><b>Livros de sua publicação</b></h4>
    </div>
    <div v-else>
        <h4 class="green-text center text-darken-4"><b>Livros favoritos</b></h4>
    </div>

  	<div class="m-content row valign-wrapper">
  		<button v-if="!activeDelete && !activeEdit && !activeAvalue" class="m-btn waves-effect waves-light btn-large col m2" @click="getBooks(pagination.previous)"
                :disabled="!pagination.previous">
            <i class="material-icons left">chevron_left</i>
        </button>

        <div class="row col m8">
	        <div v-for="book in books" class="col m4 s12 center" v-if="!activeDelete && !activeEdit && !activeAvalue">

	            <h4><b class="red-text text-darken-4">{{ book.title }}</b></h4>

	            <!--<img :src="book.thumb" class="book-img"/>-->
	            <p>{{ book.description }}</p>
				
				<div v-if="!isAdmin()">
	                <button data-target="modal1" :disabled='disabled'  class="excluir purple waves-effect waves-light btn modal-trigger" @click="avalModalActivate(book)">
	                    <i class="material-icons left">star_border</i>Fazer review
	                </button>
	            </div>

	            <div v-if="isAdmin()">
	                <button data-target="modal1"  class="excluir red waves-effect waves-light btn modal-trigger" @click="deleteModalActivate(book)">
	                    <i class="material-icons left">close</i>Excluir
	                </button>
	                <button class="editar waves-effect waves-light btn" @click="editModalActivate(book)">
	                    <i class="material-icons left">cloud</i>Editar
	                </button>
	            </div>

	        </div>
	        <div v-if="activeAvalue">
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
					<div class="col s12">
						<div class="input-field col s12">
							<textarea id="textarea1" v-model="score.comment" class="materialize-textarea"></textarea>
							<label for="textarea1">Comentários</label>
						</div>
					</div>
				</div>
				<div>
					<button class="editar waves-effect waves-light btn col s4" @click="activeAvalue=false;rateBook()">
						<i class="material-icons left">cloud</i>Confirmar Voto</button>
					<button class="excluir red waves-effect waves-light btn col s4" @click="activeAvalue=false;cancelEditing(book)">
						<i class="material-icons left">close</i>Cancelar</button>
				</div>
	        </div>
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

		<button v-if="!activeDelete && !activeEdit && !activeAvalue" class="m-btn waves-effect waves-light btn-large col m2" @click="getBooks(pagination.next)" :disabled="!pagination.next">
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
      	activeAvalue: false,
      	forAutor: false,
      	avalueble: false,
      	book: '',
      	score: {
			'score': 0,
			'book': '',
			'lector': '',
			'comment': ''
			},
      	books: [],
        	pagination: {
            	count: 0,
            	next: '',
            	previous: ''
        	}
    	}
  	},
 	 mounted(){
  		this.getBooks('http://localhost:8000/books');
  	},
  	updated() {
  		if(localStorage.getItem('token')){
  			this.disabled = false;
  		}
   	},
	methods: {

		isAdmin: function(){
   			if(localStorage.getItem('tipo') == 'admin'){
   				return true;
   			}
   			return false;
   		},

   		avalModalActivate: function(book){
   			this.book = book;
   			this.activeAvalue = true;
   		},

		deleteModalActivate: function(book) {
			this.book = book;
			this.activeDelete = true;
		},

		editModalActivate: function(book) {
			this.book = book;
			this.activeEdit = true;
		},

   		rateBook: function() {
			this.score.book = this.book.url;
			this.score.lector = localStorage.getItem('user');
			this.$router.push('/');
			this.$http.post('http://localhost:8000/scores/create/', this.score)
            .then(response => {
                this.response = response;
                this.errors = '';
            })
            .catch(response => {
  			console.log(response);
		  })
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