import React from 'react'
import { Route, Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  render() {
    const shelfCategories = ['read', 'currentlyReading', 'wantToRead']

    return (
      <div className="app">
        <Route exact path='/search' render={() => (
            <SearchBooks />
        )} />

        <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                {
                    shelfCategories.map((shelf, idx) => (
                      <div className="bookshelf">
                        <h2 className="bookshelf-title">{shelf}</h2>
                        <div className="bookshelf-books">
                        <ListBooks
                          key={idx}
                          books={this.state.books.filter(book => book.shelf === shelf)} />
                        </div>
                      </div>
                    ))
                }
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
