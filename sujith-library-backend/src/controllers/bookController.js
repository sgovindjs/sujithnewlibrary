const Book = require('../models/Book');

let books = [
  new Book(1, 'Book1', 'Author1', false),
  new Book(2, 'Book2', 'Author2', true),
  // Add more initial books if needed
];

const getAllBooks = (req, res) => {
  res.json(books);
};

const addBook = (req, res) => {
  const { name, author, borrowed } = req.body;
  const newBook = new Book(books.length + 1, name, author, borrowed);
  books.push(newBook);
  res.json(newBook);
};

const markAsBorrowed = (req, res) => {
  const { id } = req.params;
  const book = books.find((b) => b.id === parseInt(id));
  if (book) {
    book.borrowed = true;
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
};

const deleteBook = (req, res) => {
  const { id } = req.params;
  books = books.filter((book) => book.id !== parseInt(id));
  res.json({ message: 'Book deleted successfully' });
};

module.exports = {
  getAllBooks,
  addBook,
  markAsBorrowed,
  deleteBook,
};
