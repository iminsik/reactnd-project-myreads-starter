import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import Books from './Books'
import './App.css'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
            <SearchBooks />
        )} />

        <Route exact path='/' render={() => (
            <Books />
        )} />
      </div>
    )
  }
}

export default BooksApp
