<template>
  <div class="rate">
  	<div class="m-content row valign-wrapper">
  		<button v-if="!active" class="m-btn waves-effect waves-light btn-large col m2" @click="getBooks(pagination.previous)"
                :disabled="!pagination.previous">
            <i class="material-icons left">chevron_left</i>
        </button>
        <div class="row col m8">
	        <div v-for="book in books" class="col m4 s12 center" v-if="!book.editing">
	            <h4><b class="red-text text-darken-4">{{ book.title }}</b></h4>

	            <img :src="book.thumb" class="book-img"/>
	            <div>
					<button class="editar waves-effect waves-light btn" :disabled="disabled" @click="editBook(book)">
						<i class="material-icons left">cloud</i>Avaliar
					</button>
	            </div>

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
					<div class="col s12">
						<div class="input-field col s12">
							<textarea id="textarea1" v-model="score.comment" class="materialize-textarea"></textarea>
							<label for="textarea1">Comentários</label>
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
		</div>

		<button class="m-btn waves-effect waves-light btn-large col m2" @click="getBooks(pagination.next)" :disabled="!pagination.next">
            <i class="material-icons left">chevron_right</i>
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
      	contentDeleteModal: '',
      	contentEditModal: '',
      	active: false,
      	books: [],
        	pagination: {
            	count: 0,
            	next: '',
            	previous: ''
			},
			score: {
			'score': 0,
			'book': '',
			'lector': 1,
			'comment': ""
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

		rateBook: function(book) {
			console.log("Foooooooooi ", book.url);
			this.score.book = book.url;

        	this.$http.post('http://localhost/scores/create/', this.score)
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