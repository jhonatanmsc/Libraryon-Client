<template>
  <div class="home">
  	<div class="m-content row valign-wrapper">
  		<button v-if="!activeDelete && !activeEdit" class="m-btn waves-effect waves-light btn-large col m2" @click="getAutores(pagination.previous)"
                :disabled="!pagination.previous">
            <i class="material-icons left">chevron_left</i>
        </button>

        <div class="row col m8">
	        <div v-for="autor in autores" v-if="!activeDelete && !activeEdit" class="col m4 s12 center">

			    <div class="card horizontal">
			      <div class="card-stacked">
			        <div class="card-content">
			          <h3 class="header">{{ autor.name }}</h3><br>
			          <p>Livros lançados: {{ autor.books.length }}</p>
			          <div v-if="isAdmin" class="row center">
		                <button data-target="modal1" class="excluir col m6 red waves-effect waves-light btn modal-trigger" @click="deleteModalActivate(autor)">
		                    <i class="material-icons left">close</i>Del
		                </button>
		                <button class="editar col m6 waves-effect waves-light btn" @click="editModalActivate(autor)">
		                    <i class="material-icons left">cloud</i>Edit
		                </button>
		            </div>
			        </div>
			      </div>
			  	</div>

	        </div>

    		<!-- Modal Structure -->
    		<div v-if="activeDelete" style="height: 100vh; padding-top: 100px;">
			 <h3 > Você tem certeza que quer deletar o item?</h3>
			 <div class="center">
				<a @click="activeDelete = false" class="waves-effect blue-grey lighten-5 black-text btn-large">CANCELAR</a>
				<a @click="activeDelete = false;deleteAutor()" class="waves-effect red darken-4 btn-large" style="margin-left: 20px;">DELETAR</a>
			 </div>
			</div>

			<div class="" v-if="activeEdit" style="height: 100vh; padding-top: 100px; padding-left: 200px; padding-right: 200px;">
				<h3 class="center">Editar Autor</h3>
			 <div class="m-input input-field inline ">
                <input id="titulo" v-model="autor.name" type="text" class="validate inline">
                <label for="titulo">Nome do autor</label>

              </div><br>
              <div class="m-input input-field inline ">
                <input id="price" v-model="autor.email" type="text" class="validate inline">
                <label for="price">Email</label>
				
              </div><br>

			 <div class="center">
				<a @click="activeEdit = false" class="waves-effect blue-grey lighten-5 black-text btn-large">CANCELAR</a>
				<a @click="activeEdit = false;editAutor()" class="waves-effect red darken-4 btn-large" style="margin-left: 20px;">ATUALIZAR</a>
			 </div>
			</div>
			
		</div>

		<button v-if="!activeDelete && !activeEdit" class="m-btn waves-effect waves-light btn-large col m2" @click="getAutores(pagination.next)" :disabled="!pagination.next">
            <i class="material-icons left">chevron_right</i>
        </button>

  	</div>
    
</div>
</template>

<script>
export default {
  	name: 'autores',
  	data () {
    	return {
      	contentDeleteModal: '',
      	contentEditModal: '',
      	activeDelete: false,
      	activeEdit: false,
      	activeAval: false,
      	isAdmin: false,
      	autor: '',
      	autores: [],
        	pagination: {
            	count: 0,
            	next: '',
            	previous: ''
        	},
    	}
  	},
 	 mounted(){
  		this.getAutores('http://localhost:8000/authors/');
  		if(localStorage.getItem('tipo') == 'admin'){
  			console.log('tru da tru')
  			this.isAdmin = true;
  		}
  	},
  	update(){
  		
  	},
	methods: {

		deleteModalActivate: function(author) {
			this.autor = author;
			this.activeDelete = true;
		},

		editModalActivate: function(author) {
			this.autor = author;
			this.activeEdit = true;
		},

	    deleteAutor: function () {
	    	let autor = this.autor;
	    	if(autor){
		        var index = this.autores.indexOf(autor)

		        this.$http.delete(autor.url)
		            .then(response => {
		            	console.log('AUTOR DELETADO')
		                this.autores.splice(index, 1)
		            })
		            .catch(e => {
		                console.log(e)
		            })
		    }
	    },

	    editAutor: function () {
	        this.$http.put(this.autor.url, this.autor)
	            .then(response => {
	            	console.log('AUTOR EDITADO')
	            })
	            .catch(e => {
	                console.log(e)
	            })
	        activeEdit = false
	    },

	    getAutores: function (url) {
	        this.$http.get(url)
	            .then(response => {
	                this.autores = response.data.results

	                var pagination = {
	                    count: response.data.count,
	                    next: response.data.next,
	                    previous: response.data.previous,
	                    pageSize: 6,
	                    total: Math.round(response.data.count / 6)
	                }
	                this.pagination = pagination
	            })
	            this.activeAval = false;
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
