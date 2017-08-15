import React from 'react'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component {
  state = {
    books: [],
    mybooks: []
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then(mybooks => {
        this.setState({mybooks})
       })
    this.searchInput.focus()
  }
  refresh() {
    var that = this
    return function(book) {
      that.state.books.filter(bk => bk.id === book.id)[0].shelf = book.shelf
      that.setState({books: that.state.books})
    }
  }
  searchBooks(term) {
    if(term === '') {
      this.setState({books: []})
    } else {
      BooksAPI.search(term, 10)
      .then(books => {
        if(Array.isArray(books)) {
          books.forEach(book => {
            let founds = this.state.mybooks.filter(mybook => mybook.id === book.id) 
            if(founds.length > 0) {
              book.shelf = founds[0].shelf 
            } else {
              book.shelf = 'none' 
            }
          })
          this.setState({books})
        } else {
          this.setState({books: []})
        }
      })
    }
  }
  render () {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              ref={(input) => { this.searchInput = input }}
              type="text"
              onChange={(e)=>this.searchBooks(e.target.value)}
              placeholder="Search by title or author"/> 
          </div>
        </div>
        <div className="search-books-results">
          <ListBooks
            refresh={this.refresh()}
            books={this.state.books}/>
        </div>
      </div>
    )
  }
}

export default SearchBooks
