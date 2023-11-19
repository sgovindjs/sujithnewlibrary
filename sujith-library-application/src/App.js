import React, { useState, useEffect } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import api from './services/api';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from the backend on component mount
    api.getBooks().then((data) => setBooks(data));
  }, []);

  const addBook = (book) => {
    api.addBook(book).then((newBook) => setBooks([...books, newBook]));
  };

  const markAsBorrowed = (id) => {
    api.markAsBorrowed(id).then(() => {
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === id ? { ...book, borrowed: true } : book
        )
      );
    });
  };

  const deleteBook = (id) => {
    api.deleteBook(id).then(() =>
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id))
    );
  };

  return (
    <div>
      <h1>Sujith Library</h1>
      <BookForm addBook={addBook} />
      <BookList
        books={books}
        markAsBorrowed={markAsBorrowed}
        deleteBook={deleteBook}
      />
    </div>
  );
}

export default App;
