import React,{ Component } from 'react'; 
import Books from '../Books/BookList/Books';
import BookService from '../../repository/bookRepository';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from '../Header/Header';
import Categories from '../Categories/Categories';
import BookAdd from '../Books/bookAdd'
import BookEdit from '../Books/bookEdit';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      books : [],
      categories: [],
      authors : [],
      selectedBook: {}
    }
  }

  render(){
    return (
      <Router>
          <Header/>
        <main>
           <div className='container'>
            <Routes>
              <Route path={'/categories'} element= {
              <Categories categories={this.state.categories}/>}/>
              <Route path={'/books'} element= {
              <Books books={this.state.books}
                    onDelete={this.deleteBook}
                    onEdit={this.getBook}
                    onMark={this.markBook}
                    />}/>
              <Route path={'/'} element= {
              <Books books={this.state.books}
                onDelete={this.deleteBook}
                onEdit={this.getBook}
                onMark={this.markBook}
              />}/>
              <Route path={"/books/add"} element ={
                  <BookAdd categories={this.state.categories}
                              authors={this.state.authors}
                              onAddBook={this.addBook}/>}/>
              <Route path={"/books/edit/:id"} element ={
                <BookEdit categories={this.state.categories}
                           authors={this.state.authors}
                           onEditBook ={this.editBook}
                           book={this.state.selectedBook}/>
              } />

            </Routes>
              
           </div>
        </main>
      </Router>
    )

  }
  loadBooks = () =>{
    BookService.fetchBooks()
      .then((data) => {
        this.setState({
          books : data.data
        })
      })
  }
  loadAuthors = () => {
    BookService.fetchAuthors()
      .then((data) => {
        this.setState({
          authors : data.data
        })
      })
  }
  loadCategories = () => {
    BookService.fetchCategories()
      .then((data) => {
        this.setState({
          categories : data.data
        })
      })
  }
  addBook = (name,category,author,availableCopies) => {
    BookService.addBook(name,category,author,availableCopies)
      .then( () => {
        this.loadBooks()
      })
  }
  editBook = (id,name,category,author,availableCopies) => {
    BookService.editBook(id,name,category,author,availableCopies)
      .then( () => {
        this.loadBooks()
      })
  }
  deleteBook = (id) => {
    BookService.deleteBook(id)
      .then( () => {
        this.loadBooks()
      })
  }
  getBook = (id) => {
    BookService.getBook(id)
      .then ((data) => {
        this.setState({
          selectedBook : data.data
        })
      })
  }
  markBook = (id) => {
    BookService.markBook(id)
      .then (() => {
        this.loadBooks()
      })
  }

  componentDidMount(){
    this.loadBooks()
    this.loadCategories()
    this.loadAuthors()
  }
}

export default App;
