import React from 'react'
import ListBooks from './ListBooks'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class Books extends React.Component {
  static shelfCategories = [
    {category: 'currentlyReading', title: 'Currently Reading'},
    {category: 'wantToRead', title: 'Want To Read'},
    {category: 'read', title: 'Read'}
  ]

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  refresh() {
    var that = this
    return function(book) {
      that.state.books.filter(bk => bk.id === book.id)[0].shelf = book.shelf
      that.setState({books: that.state.books})
    }
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
          {
            this.constructor.shelfCategories.map((shelf, idx) => (
              <div key={idx} className="bookshelf">
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <div className="bookshelf-books">
                <ListBooks
                  refresh={this.refresh()}
                  books={this.state.books.filter(book => book.shelf === shelf.category)} />
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
    )
  }

}

export default Books
