import React from 'react'
import * as BooksAPI from './BooksAPI'

class ListBooks extends React.Component {
  updateBookShelf(book, shelf) {
    BooksAPI.update(book, shelf)
      .then((data) => {
        if(typeof this.props.refresh === 'function') {
          book.shelf = shelf 
          this.props.refresh(book)
        }
      })
  }
  render() {
    return (
          <ol className="books-grid">
          {
            this.props.books.map((book, idx) => ( 
              <li key={idx}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
                    <div className="book-shelf-changer">
                      <select
                        defaultValue={book.shelf}
                        onChange={(e) => {this.updateBookShelf(book, e.target.value, this.props)}}>
                        <option value="menu" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}</div>
                </div>
              </li>
            ))
          }
          </ol>
    )
  }
}

export default ListBooks
