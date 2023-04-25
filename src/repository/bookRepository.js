import axios from "../axios/axios";

const BookService = {
    fetchBooks: () => {
        return axios.get("/books")
    },
    fetchCategories: () => {
        return axios.get("/categories")
    },
    addBook: (name,category,author,availableCopies) => {
        return axios.post("/books" , {
            "name" :name,
            "category" :category,
            "authorId" :author,
            "availableCopies" :availableCopies
        })
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`)
    },
    editBook: (id,name,category,author,availableCopies) => {
        return axios.put(`/books/edit/${id}`, {
            "name" :name,
            "category" :category,
            "authorId" :author,
            "availableCopies" :availableCopies
        })
    },
    getBook: (id) => {
        return axios.get(`/books/${id}`)
    },
    markBook: (id) => {
        return axios.put(`/books/mark/${id}`)
    },
    fetchAuthors: () => {
        return axios.get("/author")
    }
}
export default BookService