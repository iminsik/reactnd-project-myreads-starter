import React from 'react'
import { Route } from 'react-router-dom'
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
        <Route exact path='/' render={() => (
            <SearchBooks />
        )} />

        <Route exact path='/list' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {
                    shelfCategories.map((shelf, idx) => (
                      <ListBooks
                        key={idx}
                        shelf={shelf}
                        books={this.state.books.filter(book => book.shelf === shelf)} />
                    ))
                  }
                </div>
              </div>
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
            </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
