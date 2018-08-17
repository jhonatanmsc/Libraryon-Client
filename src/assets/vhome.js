var app = new Vue({
        el: '#app',
        data: {
            books: [],
            pagination: {
                count: 0,
                next: '',
                previous: ''
            }
        },
        mounted() {
            this.getBooks('http://localhost/books')
        },
        methods: {
            deleteBook: function (book) {
                var index = app.books.indexOf(book)
                app.books.splice(index)
            },

            deleteBook: function (book) {
                var index = app.books.indexOf(book)

                axios.delete('http://localhost/books/' + book.id + '/')
                    .then(function (response) {
                        app.books.splice(index, 1)
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
                axios.put('http://localhost/books/' + book.id, book)
                    .then(function (response) {

                    })
                    .catch(e => {
                        console.log(e)
                    })
                book.editing = false
            },

            getBooks: function (url) {
                axios.get(url)
                    .then(function (response) {

                        response.data.results.map(function (book) {
                            book.editing = false;
                        })
                        app.books = response.data.results

                        var pagination = {
                            count: response.data.count,
                            next: response.data.next,
                            previous: response.data.previous,
                            pageSize: 5,
                            total: Math.round(response.data.count / 5)
                        }
                        app.pagination = pagination
                    })
            },

        }

    })