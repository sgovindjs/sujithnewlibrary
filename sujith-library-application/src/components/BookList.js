import React from 'react';

function BookList({ books, markAsBorrowed, deleteBook }) {
  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          {book.name} by {book.author}{' '}
          <button onClick={() => markAsBorrowed(book.id)}>
            {book.borrowed ? 'Return' : 'Borrow'}
          </button>{' '}
          <button onClick={() => deleteBook(book.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default BookList;
