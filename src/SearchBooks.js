import React from 'react'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    this.searchInput.focus()
  }
  searchBooks(term) {
    BooksAPI.search(term, 10)
    .then(books => {
      if(Array.isArray(books)) {
        this.setState({books})
        console.log(books)
      } else {
        this.setState({books: []})
      }
    })
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
          <ListBooks books={this.state.books}/>
        </div>
      </div>
    )
  }
}

export default SearchBooks
